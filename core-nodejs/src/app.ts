import express, { Express, Request, Response, Router } from "express";
import dotenvx from "@dotenvx/dotenvx";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connect } from "./repositories/connectMongo";

import { peopleRouter } from "./routes/peopleRouter";
import { appointmentsRouter } from "./routes/appointmentsRouter";
import { accountsRouter } from "./routes/accountsRouter";
import { checkAuthorization } from "./middlewares/auth";
import { limiter } from "./middlewares/limiter";
import { COOKIE_SECRET } from "./shared/constants";

dotenvx.config();

connect()
  .then(() => console.info("Connect to DB successful"))
  .catch(console.error);

export const app: Express = express();

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:5173", "https://agenda-8e0fa.firebaseapp.com"]
  })
);
// @ts-ignore
app.use(cookieParser(COOKIE_SECRET));
app.use(express.json());
app.use(limiter);
app.use(express.urlencoded({ extended: true }));
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);

const API_V1 = "v1";
interface Route {
  path: string;
  router: Router;
  requireAuth?: boolean;
}

const routes: Route[] = [
  {
    path: "people",
    router: peopleRouter,
    requireAuth: true
  },
  {
    path: "appointments",
    router: appointmentsRouter,
    requireAuth: true
  },
  {
    path: "accounts",
    router: accountsRouter
  }
];

routes.forEach((r) => {
  const route = `/api/${API_V1}/${r.path}/`;

  if (r.requireAuth) {
    app.use(route, checkAuthorization, r.router);
  } else {
    app.use(route, r.router);
  }

  console.info("Route registered:", route, r.requireAuth ? "protected" : "");
});

app.use((_, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err: Error, req: Request, res: Response) => {
  console.error(err.stack);
  res.status(500).send("Something wrong, try again");
});

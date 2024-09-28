import express, { Express, Request, Response, Router } from "express";
import dotenvx from "@dotenvx/dotenvx";
import morgan from "morgan";
import cors from "cors";

import { connect } from "./repositories/connectMongo";

import { peopleRouter } from "./routes/peopleRouter";
import { appointmentsRouter } from "./routes/appointmentsRouter";

dotenvx.config();

connect()
  .then(() => console.info("Connect to DB successful"))
  .catch(console.error);

export const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);

const API_V1 = "v1";
interface Route {
  path: string;
  router: Router;
}

const routes: Route[] = [
  {
    path: "people",
    router: peopleRouter
  },
  {
    path: "appointments",
    router: appointmentsRouter
  }
];

routes.forEach((r) => {
  const route = `/api/${API_V1}/${r.path}/`;
  app.use(route, r.router);
  console.info("Route registered:", route);
});

app.use((_, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err: Error, req: Request, res: Response) => {
  console.error(err.stack);
  res.status(500).send("Something wrong, try again");
});

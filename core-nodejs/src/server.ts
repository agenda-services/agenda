import { app } from "./app";

const PORT: number = parseInt(process.env.PORT || "3000");

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
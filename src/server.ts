import express from "express";
import { Response } from "express";

const app = express();
const port = 3000;

app.get("/", (_, res: Response) => {
  res.send("Server up!");
});

app.get("/hello", (_, res) => {
  res.json({ serverMessage: "Hello World!" });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

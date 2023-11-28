import express from "express";
import { chdir } from "node:process";

// Import controllers
import { helloController } from "./controllers/root-controller.js";

if (process.env.NODE_ENV === "dev") {
  chdir("build");
}

// Setup express
const app = express();
const port = 3000;

// Configure middleware
app.use(express.static("frontend")); // Bring in the built client

app.get("/hello", helloController);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}/`);
});

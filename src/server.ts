import express from "express";
import { chdir } from "node:process";

// Import controllers
import { helloController } from "./controllers/root-controller.js";

// Setup express
const app = express();
const port = 3000;

// Dev specific configuration
if (process.env.NODE_ENV === "dev") {
  app.use("/coverage", express.static("coverage/lcov-report"));
  chdir("build");
}

// Configure middleware
app.use(express.static("frontend")); // Bring in the built client

app.get("/hello", helloController);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}/`);
});

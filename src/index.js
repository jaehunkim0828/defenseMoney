import express from "express";
import morgan from "morgan";
import cors from "cors";
import db from "../models/index.js";
import rootRouter from "./routes/index.js";

const app = express();
const port = 5000;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));

app.use("/", rootRouter);

app.get("/", (request, response) => {
  response.send("Hello World");
});

db.sync().then(() => {
  app.listen(port, () => console.log(`running ${port} port.`));
});

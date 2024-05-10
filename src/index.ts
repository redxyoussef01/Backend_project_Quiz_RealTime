import { AppDataSource } from "./data-source";

import * as express from "express";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const routes = require("./routes.ts");

const cors = require("cors");
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    headers: ["Content-Type"],
  })
);

routes(app, AppDataSource);

app.listen(4000, () => {
  console.log("server running on 4000");
});

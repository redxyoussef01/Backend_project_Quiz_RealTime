import { AppDataSource } from "./data-source";

import * as express from "express";

const routes = require("./routes.ts");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

routes(app, AppDataSource);

app.listen(4000, () => {
  console.log("server running on 4000");
});

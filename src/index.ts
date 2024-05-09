import { AppDataSource } from "./data-source";
import { Quiz } from "./entity/Quiz";
import { Account } from "./entity/Account";
import * as express from "express";

const routes = require("./routes.ts");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

routes(app, AppDataSource);

app.listen(4000, () => {
  console.log("server running on 4000");
});

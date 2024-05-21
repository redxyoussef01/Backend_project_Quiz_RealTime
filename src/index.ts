import { AppDataSource } from "./data-source";

import * as express from "express";
const app = express();
const { Server } = require("socket.io");
const http = require("http");
const { createServer } = require("http");
const server = createServer(app);
const io = new Server(server);
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

routes(app, AppDataSource, io);

app.listen(4000, () => {
  console.log("server running on 4000");
});

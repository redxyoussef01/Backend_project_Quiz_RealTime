"use strict";
exports.__esModule = true;
var data_source_1 = require("./data-source");
var express = require("express");
var app = express();
var Server = require("socket.io").Server;
var http = require("http");
var createServer = require("http").createServer;
var server = createServer(app);
var io = new Server(server);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
var routes = require("./routes.ts");
var cors = require("cors");
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    headers: ["Content-Type"]
}));
routes(app, data_source_1.AppDataSource, io);
app.listen(4000, function () {
    console.log("server running on 4000");
});

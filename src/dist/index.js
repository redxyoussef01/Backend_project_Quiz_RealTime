"use strict";
exports.__esModule = true;
var data_source_1 = require("./data-source");
var express = require("express");
var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
var routes = require("./routes.ts");
var cors = require("cors");
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    headers: ["Content-Type"]
}));
routes(app, data_source_1.AppDataSource);
app.listen(4000, function () {
    console.log("server running on 4000");
});

"use strict";
exports.__esModule = true;
var data_source_1 = require("./data-source");
var express = require("express");
var routes = require("./routes.ts");
var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
routes(app, data_source_1.AppDataSource);
app.listen(4000, function () {
    console.log("server running on 4000");
});

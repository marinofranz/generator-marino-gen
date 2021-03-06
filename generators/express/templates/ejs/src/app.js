require("dotenv").config();
const express = require("express");
const logger = require("../utils/logger");
const path = require("path");
const errorHandler = require("../utils/error");
const chalk = require("chalk");
const cors = require("cors");

const app = express();

const APIRoute = require("../routers/api");
const DefaultRoute = require("../routers/default");

app.use(errorHandler);
app.use(logger);
app.use(cors({ credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use("/", DefaultRoute);
app.use("/api", APIRoute);

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${chalk.redBright(process.env.PORT.toString())}`);
});
const chalk = require("chalk");

module.exports = (req, res, next) => {
    console.log(`${chalk.blue(req.method)} - ${chalk.red(req.protocol)} - ${chalk.green(req.path)} - ${chalk.magenta(res.statusCode)}`);
    next();
}
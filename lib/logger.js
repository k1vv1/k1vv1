"use strict";
const chalk = require("chalk");
const { KV_CLI } = require("./constant");

class Logger {
  constructor(cli) {
    this.cli = cli;
    this.chalk = chalk;
  }

  static getLogger(cli) {
    cli = cli || global.KV_CLI || KV_CLI;
    return new Logger(cli);
  }

  hint(...info) {
    console.log(chalk.blue(info));
  }

  error(...info) {
    console.log(chalk.red(info));
  }

  clear() {
    console.clear();
  }
}

module.exports = Logger;

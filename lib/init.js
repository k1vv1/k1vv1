"use strict";
const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const inquirer = require("inquirer");
const Download = require("./download");

module.exports = class Boilerplate {
  constructor(config = {}, cli = {}) {
    this.config = config;
    this.cli = cli;
    this.ask = this.initAsk();
    this.boilerplateChoice = this.ask.boilerplateChoice;
  }

  getBoilerplateInfo(name) {
    return this.boilerplateChoice.find((item) => {
      return name === item.value;
    });
  }

  initAsk() {
    const asksync = path.resolve(__dirname, "ask-sync.js");
    if (fs.existsSync(asksync)) {
      try {
        return require(asksync);
      } catch (err) {
        console.log(chalk.red(`[${this.cli.name}] init sync error`), err);
      }
    }
    return require("./ask");
  }

  init(project) {
    inquirer
      .prompt([
        {
          type: "list",
          name: "boilerplateName",
          message: "please choose the boilerplate mode?",
          choices: this.boilerplateChoice,
        },
      ])
      .then(async (boilerplateAnswer) => {
        const boilerplateName = boilerplateAnswer.boilerplateName;
        const boilerplateInfo = this.getBoilerplateInfo(boilerplateName);
        const repo = boilerplateInfo.repo;
        const download = new Download(project, this.cli);
        download.init(repo, project);
      });
  }
};

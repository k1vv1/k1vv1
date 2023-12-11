"use strict";
const chalk = require("chalk");

const boilerplateChoice = [
  {
    name: `Create ${chalk.green("Vue2")} Application`,
    value: "boilerplate-vue2",
    repo: "github:kxxvy/vue2-basic#main",
  },
  {
    name: `Create ${chalk.green("Vue3")} Application`,
    value: "boilerplate-vue3",
    repo: "github:kxxvy/vue3-basic#main",
  },
  {
    name: `Create ${chalk.green("React")} Application`,
    value: "boilerplate-react",
    repo: "github:kxxvy/react-basic#main",
  },
  {
    name: `Create ${chalk.green("uniapp")} Application`,
    value: "boilerplate-uniapp",
    repo: "github:kxxvy/uniapp-basic#main",
  },
];
module.exports = {
  boilerplateChoice,
};

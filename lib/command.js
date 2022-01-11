'use strict';
const path = require('path');
const program = require('commander');
const chalk = require('chalk');
const inquirer = require('inquirer');
const Logger = require('./logger');
const Action = require('./action');
const utils = require('./utils');
const {
  KV_CLI,
  VUE2_TYPE,
  VUE3_TYPE
} = require('./constant');
global.KV_CLI = KV_CLI;

module.exports = class Command extends Logger {
  constructor() {
    super()
    this.program = program;
    this.inquirer = inquirer;
    this.chalk = chalk;
    this.utils = utils;
    this.boilerplate = {};
    this.context = path.resolve(__dirname, '..');
    this.commands = [
      'create', 'vue2cpn', 'vue2page',
      'vue2router', 'vue2store', 'vue3cpn',
      'vue3page', 'vue3router', 'vue3store'
    ]
    this.action = new Action(this);
    this.cli = new Proxy(KV_CLI, {
      get: function (target, key, receiver) {
        return Reflect.get(target, key, receiver);
      },
      set: function (target, key, value, receiver) {
        global.KV_CLI[key] = value;
        return Reflect.set(target, key, value, receiver);
      }
    });
  }

  version() {
    const pkg = require(path.resolve(this.context, 'package.json'));
    this.program.version(pkg.version, '-v, --version');
  }

  option() {
    this.program
      .option('-k --kv', 'a kv cli')
      .option('-d --dest <dest>', 'a destination folder, 例如: -d /src/components')
      .option('-f --framework <framework>', 'your framework')
  }

  create() {
    this.program
      .command('create <project> [otherArgs...]')
      .description('clone repository into a newly created directory')
      .action(project => {
        this.action.init(this.boilerplate, project);
      })
  }

  vue2cpn() {
    this.program
      .command('vue2-cpn <name>')
      .description('add vue2 component, eg: kv vue2-cpn HelloWord [-d src/components/common]')
      .action((name) => {
        this.action.addComponent(name, program.dest || 'src/components/common', VUE2_TYPE)
      })
  }

  vue2page() {
    this.program
      .command('vue2-page <name>')
      .description('add vue2 page, eg: kv vue2-page Home [-d src/pages]')
      .action((name) => {
        this.action.addPage(name, program.dest || `src/pages`, VUE2_TYPE)
      })
  }

  vue2router() {
    this.program
      .command('vue2-router <name>')
      .description('add vue2 router config, eg: kv vue2-router Home [-d src/pages]')
      .action((name) => {
        this.action.addRouter(name, program.dest || `src/router/map`, VUE2_TYPE)
      })
  }

  vue2store() {
    this.program
      .command('vue2-store <name>')
      .description('add vue2 store, eg: kv vue2-store Home [-d src/store/modules]')
      .action((name) => {
        this.action.addStore(name, program.dest || `src/store/modules`, VUE2_TYPE)
      })
  }

  vue3cpn() {
    this.program
      .command('vue3-cpn <name>')
      .description('add vue3 component, eg: kv vue3-cpn HelloWord [-d src/components/common]')
      .action((name) => {
        this.action.addComponent(name, program.dest || 'src/components/common', VUE3_TYPE)
      })
  }

  vue3page() {
    this.program
      .command('vue3-page <name>')
      .description('add vue3 page, eg: kv vue3-page Home [-d src/views]')
      .action((name) => {
        this.action.addPage(name, program.dest || `src/views`, VUE3_TYPE)
      })
  }

  vue3router() {
    this.program
      .command('vue3-router <name>')
      .description('add vue3 router config, eg: kv vue3-router Home [-d src/views]')
      .action((name) => {
        this.action.addRouter(name, program.dest || `src/router/map`, VUE3_TYPE)
      })
  }

  vue3store() {
    this.program
      .command('vue3-store <name>')
      .description('add vue3 store, eg: kv vue3-store Home [-d src/store/modules]')
      .action((name) => {
        this.action.addStore(name, program.dest || `src/store/modules`, VUE3_TYPE)
      })
  }

  register(cmd) {
    if (this.commands.some(key => {
        key === cmd
      })) {
      this.red(`The command ${cmd} already exists. Please overwrite the command action method implement directly.`);
    } else {
      this.commands.push(cmd);
    }
  }

  command(commands = []) {
    commands.forEach(cmd => {
      this.register(cmd);
    });
    this.commands.forEach(cmd => {
      if (this[cmd]) {
        this[cmd].apply(this);
      } else {
        this.red(`The command [${cmd}] is not implemented!`);
      }
    });
  }

  parse() {
    this.program.parse(process.argv);
  }

  run() {
    this.version();
    this.option();
    this.command();
    this.parse();
  }
}
'use strict';
const path = require('path');
const Logger = require('./logger');
const Boilerplate = require('./init');
const {
  VUE2_TYPE,
} = require('./constant')

const {
  compile,
  writeToFile,
  createDirSync,
} = require('./utils')

module.exports = class Action extends Logger {
  constructor(command) {
    super();
    this.command = command;
    this.cli = command.cli;
    this.program = command.program;
  }

  async handleEjsToFile(targetDest, ejsFile, data, filename) {
    // 1.获取模块引擎的路径
    const result = await compile(ejsFile, data);

    // 2.写入文件
    createDirSync(targetDest);
    const targetPath = path.resolve(targetDest, filename);
    writeToFile(targetPath, result);
  }

  init(boilerplate, project) {
    new Boilerplate(boilerplate, this.cli).init(project);
  }

  // 添加组件的action
  async addComponent(name, dest, type) {
    const ejsFile = type === VUE2_TYPE ? "vue2-component.ejs" : "vue3-component.ejs"
    const cpnFileName = `${name}.vue`
    const data = {
      name,
      lowerName: name.toLowerCase()
    }
    const targetDest = path.resolve(dest, name)
    this.handleEjsToFile(targetDest, ejsFile, data, cpnFileName)
  }

  // 添加页面的action
  async addPage(name, dest, type) {
    const ejsFile = type === VUE2_TYPE ? "vue2-component.ejs" : "vue3-component.ejs"
    const pageFileName = `index.vue`
    const data = {
      name,
      lowerName: name.toLowerCase()
    }
    const targetDest = path.resolve(dest, name)
    this.handleEjsToFile(targetDest, ejsFile, data, pageFileName)
  }

  // 添加路由的action
  async addRouter(name, dest, type) {
    const fileExt = type === VUE2_TYPE ? "js" : "ts"
    const ejsFile = type === VUE2_TYPE ? "vue2-router.ejs" : "vue3-router.ejs"
    const routerFileName = `${name}.${fileExt}`
    const data = {
      name,
      lowerName: name.toLowerCase()
    }
    const targetDest = path.resolve(dest)
    this.handleEjsToFile(targetDest, ejsFile, data, routerFileName)
  }

  // 添加store的action
  async addStore(name, dest, type) {
    const vue2Flag = type === VUE2_TYPE
    const ejsFile = vue2Flag ? "vue2-store.ejs" : "vue3-store.ejs"
    const fileExt = vue2Flag ? "js" : "ts"
    const storeFileName = vue2Flag ? `${name}.${fileExt}` : `index.${fileExt}`
    const typesFileName = `types.${fileExt}`
    const targetDest = vue2Flag ? path.resolve(dest) : path.resolve(dest, name)

    this.handleEjsToFile(targetDest, ejsFile, {}, storeFileName)
    if (!vue2Flag) this.handleEjsToFile(targetDest, "vue3-types.ejs", {}, typesFileName)
  }
}
const {
  promisify
} = require('util')

const path = require('path')

const download = promisify(require('download-git-repo'))
const open = require('open');

const log = require('../utils/log');

const {
  VUE2_ACTION,
} = require('./constants')

const {
  commandSpawn
} = require('../utils/terminals')

const {
  compile,
  writeToFile,
  createDirSync
} = require('../utils/file')

const inquirer = require('inquirer');

const {
  boilerplateChoice
} = require('./ask')

const _getBoilerplateInfo = (name) => {
  return boilerplateChoice.find(item => {
    return name === item.value;
  });
}

const _handleEjsToFile = async (targetDest, ejsFile, data, filename) => {
  // 1.获取模块引擎的路径
  const result = await compile(ejsFile, data);

  // 2.写入文件
  createDirSync(targetDest);
  const targetPath = path.resolve(targetDest, filename);
  writeToFile(targetPath, result);
}

// 创建项目的action
const createProjectAction = async (project) => {
  // 模板选择
  const boilerplateAnswer = await inquirer.prompt([{
    type: 'list',
    name: 'boilerplateName',
    message: 'please choose the boilerplate mode?',
    choices: boilerplateChoice
  }])
  const boilerplateName = boilerplateAnswer.boilerplateName;
  const boilerplateInfo = _getBoilerplateInfo(boilerplateName);
  const repo = boilerplateInfo.repo;
  // tip
  log.hint('kv helps you create your project, please wait a moment~');
  // clone项目
  await download(repo, project)
  // 执行npm install
  const command = process.platform === 'win32' ? 'npm.cmd' : 'npm'
  await commandSpawn(command, ['install'], {
    cwd: `./${ project }`
  })
  // 运行npm run serve
  await commandSpawn(command, ['run', 'dev'], {
    cwd: `./${ project }`
  })
  // 打开浏览器
  // open("http://localhost:8083/")
}

// 添加组件的action
const addComponentAction = async (name, dest, type) => {
  const ejsFile = type === VUE2_ACTION ? "vue2-component.ejs" : "vue3-component.ejs"
  const cpnFileName = `${name}.vue`
  const data = {
    name,
    lowerName: name.toLowerCase()
  }
  const targetDest = path.resolve(dest, name)
  _handleEjsToFile(targetDest, ejsFile, data, cpnFileName)
}

// 添加页面的action
const addPageAction = async (name, dest, type) => {
  const ejsFile = type === VUE2_ACTION ? "vue2-component.ejs" : "vue3-component.ejs"
  const pageFileName = `index.vue`
  const data = {
    name,
    lowerName: name.toLowerCase()
  }
  const targetDest = path.resolve(dest, name)
  _handleEjsToFile(targetDest, ejsFile, data, pageFileName)
}

// 添加路由的action
const addRouterAction = async (name, dest, type) => {
  const fileExt = type === VUE2_ACTION ? "js" : "ts"
  const ejsFile = type === VUE2_ACTION ? "vue2-router.ejs" : "vue3-router.ejs"
  const routerFileName = `${name}.${fileExt}`
  const data = {
    name,
    lowerName: name.toLowerCase()
  }
  const targetDest = path.resolve(dest)
  _handleEjsToFile(targetDest, ejsFile, data, routerFileName)
}

// 添加store的action
const addStoreAction = async (name, dest, type) => {
  const vue2Flag = type === VUE2_ACTION
  const ejsFile = vue2Flag ? "vue2-store.ejs" : "vue3-store.ejs"
  const fileExt = vue2Flag ? "js" : "ts"
  const storeFileName = vue2Flag ? `${name}.${fileExt}` : `index.${fileExt}`
  const typesFileName = `types.${fileExt}`
  const targetDest = vue2Flag ? path.resolve(dest) : path.resolve(dest, name)

  _handleEjsToFile(targetDest, ejsFile, {}, storeFileName)
  if (!vue2Flag) _handleEjsToFile(targetDest, "vue3-types.ejs", {}, typesFileName)
}

module.exports = {
  createProjectAction,
  addComponentAction,
  addPageAction,
  addRouterAction,
  addStoreAction
}
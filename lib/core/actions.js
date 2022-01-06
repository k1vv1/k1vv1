const {
  promisify
} = require('util')

const path = require('path')

const download = promisify(require('download-git-repo'))
const open = require('open');

const log = require('../utils/log');

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

const getBoilerplateInfo = (name) => {
  return boilerplateChoice.find(item => {
    return name === item.value;
  });
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
  const boilerplateInfo = getBoilerplateInfo(boilerplateName);
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
  commandSpawn(command, ['run', 'dev'], {
    cwd: `./${ project }`
  })
  // 打开浏览器
  open("http://localhost:8083/")
}

// 添加组件的action
const addComponentAction = async (name, dest) => {
  // 1. 编译ejs模块 result
  const result = await compile("vue-component.ejs", {
    name,
    lowerName: name.toLowerCase()
  })

  // 2. 写入文件的操作
  const targetPath = path.resolve(dest, `${name}.vue`)
  writeToFile(targetPath, result)
}

// 添加页面和路由的action
const addPageAndRouteAction = async (name, dest) => {
  // 1. 编译ejs模块 result
  const data = {
    name,
    lowerName: name.toLowerCase()
  }
  const pageResult = await compile("vue-component.ejs", data)
  const routeResult = await compile("vue-router.ejs", data)

  // 2. 写入文件的操作
  const targetDest = path.resolve(dest, name.toLowerCase())
  if (createDirSync(targetDest)) {
    const targetPagePath = path.resolve(targetDest, `${name}.vue`)
    const targetRoutePath = path.resolve(targetDest, `router.js`)
    writeToFile(targetPagePath, pageResult)
    writeToFile(targetRoutePath, routeResult)
  }
}

// 添加store的action
const addStoreAction = async (name, dest) => {
  // 1. 编译ejs模块 result
  const storeResult = await compile("vue-store.ejs", {})
  const typesResult = await compile("vue-types.ejs", {})

  // 2. 写入文件的操作
  const targetDest = path.resolve(dest, name.toLowerCase())
  if (createDirSync(targetDest)) {
    const targetStorePath = path.resolve(targetDest, `${name}.js`)
    const targetTypesPath = path.resolve(targetDest, `types.js`)
    writeToFile(targetStorePath, storeResult)
    writeToFile(targetTypesPath, typesResult)
  }
}



module.exports = {
  createProjectAction,
  addComponentAction,
  addPageAndRouteAction,
  addStoreAction
}
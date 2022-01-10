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
  open("http://localhost:8083/")
}

// 添加组件的action
const addComponentAction = async (name, dest, type) => {
  const ejsFile = type === VUE2_ACTION ? "vue2-component.ejs" : "vue3-component.ejs"
  // 1. 编译ejs模块 result
  const result = await compile(ejsFile, {
    name,
    lowerName: name.toLowerCase()
  })

  // 2. 写入文件
  const targetDest = path.resolve(dest, name)
  if (createDirSync(targetDest)) {
    const targetPath = path.resolve(targetDest, `${name}.vue`)
    writeToFile(targetPath, result)
  }
}

// 添加页面的action
const addPageAction = async (name, dest, type) => {
  const ejsFile = type === VUE2_ACTION ? "vue2-component.ejs" : "vue3-component.ejs"
  // 1. 编译ejs模块 result
  const data = {
    name,
    lowerName: name.toLowerCase()
  }
  const pageResult = await compile(ejsFile, data)

  // 2. 写入文件
  if (createDirSync(dest)) {
    const targetPagePath = path.resolve(dest, `index.vue`)
    writeToFile(targetPagePath, pageResult)
  }
}

// 添加路由的action
const addRouterAction = async (name, dest, type) => {
  const fileExt = type === VUE2_ACTION ? "js" : "ts"
  const ejsFile = type === VUE2_ACTION ? "vue2-router.ejs" : "vue3-router.ejs"
  // 1. 编译ejs模块 result
  const data = {
    name,
    lowerName: name.toLowerCase()
  }
  const routerResult = await compile(ejsFile, data)

  // 2. 写入文件
  if (createDirSync(dest)) {
    const targetRouterPath = path.resolve(dest, `${name}.${fileExt}`)
    writeToFile(targetRouterPath, routerResult)
  }
}

// 添加store的action
const addStoreAction = async (name, dest, type) => {
  const vue2Flag = type === VUE2_ACTION
  const ejsFile = vue2Flag ? "vue2-store.ejs" : "vue3-store.ejs"
  const fileExt = vue2Flag ? "js" : "ts"
  const storeFileName = vue2Flag ? `${name}.${fileExt}` : `index.${fileExt}`
  const typesFileName = `types.${fileExt}`
  // 1. 编译ejs模块 result
  const storeResult = await compile(ejsFile, {})

  // 2. 写入文件
  const targetDest = vue2Flag ? path.resolve(dest) : path.resolve(dest, name)
  if (createDirSync(targetDest)) {
    const targetStorePath = path.resolve(targetDest, storeFileName)
    writeToFile(targetStorePath, storeResult)
  }
  if (!vue2Flag) {
    const typesResult = await compile("vue3-types.ejs", {})
    if (createDirSync(targetDest)) {
      const targetTypesPath = path.resolve(targetDest, typesFileName)
      writeToFile(targetTypesPath, typesResult)
    }
  }
}



module.exports = {
  createProjectAction,
  addComponentAction,
  addPageAction,
  addRouterAction,
  addStoreAction
}
#!/usr/bin/env node

const program = require('commander')

const {
  helpOptions
} = require('./lib/core/help')

const {
  createCommands
} = require('./lib/core/create')

const log = require('./lib/utils/log')

// 查看版本号
program.version(require('./package.json').version)


// 帮助和可选信息
helpOptions()

// 创建其他指令
createCommands()

// 解析终端指令
program.parse(process.argv)
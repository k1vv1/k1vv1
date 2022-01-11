'use strict';
const {
  promisify
} = require('util')

const open = require('open');
const Logger = require('./logger');
const download = promisify(require('download-git-repo'))

const {
  commandSpawn
} = require('./terminals')

module.exports = class Download extends Logger {
  constructor(config = {}, cli = {}) {
    super(cli);
    this.config = config;
    this.cli = cli;
  }

  async init(repo, project) {
    // tip
    this.hint('kv helps you create your project, please wait a moment~');
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
}
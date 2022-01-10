const path = require('path')
const fs = require('fs')
const ejs = require('ejs')

const log = require('../utils/log');


const compile = (templateName, data) => {
  const templatePosition = `../templates/${ templateName }`
  const templatePath = path.resolve(__dirname, templatePosition)

  return new Promise((resolve, reject) => {
    ejs.renderFile(templatePath, {
      data
    }, {}, (err, result) => {
      if (err) {
        console.log(err)
        reject(err)
        return
      }
      resolve(result)
    })
  })
}

const createDirSync = (dirname) => {
  if (fs.existsSync(dirname)) {
    return true
  } else {
    if (createDirSync(path.dirname(dirname))) {
      fs.mkdirSync(dirname)
      return true
    }
  }
}

const writeToFile = (path, content) => {
  // 判断path是否存在，如果不存在，则创建对应的文件夹
  if (fs.existsSync(path)) {
    return log.error("the file already exists~")
  }
  fs.promises.writeFile(path, content)
}

module.exports = {
  compile,
  writeToFile,
  createDirSync
}
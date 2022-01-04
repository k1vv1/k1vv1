const program = require('commander')

const helpOptions = () => {
  // 增加自己的options
  program.option('-k --kv', 'a kv cli')

  program.option('-d --dest <dest>', 'a destination folder, 例如: -d /src/components')
  program.option('-f --framework <framework>', 'your framework')

  program.on('--help', function () {
    console.log('')
    console.log('--------------')
    console.log('kv -v')
  })
}

module.exports = {
  helpOptions
}
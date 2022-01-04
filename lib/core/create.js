const program = require('commander')

const {
  createProjectAction,
  addComponentAction,
  addPageAndRouteAction,
  addStoreAction
} = require('./actions')

const createCommands = () => {
  program
    .command('create <project> [others...]')
    .description('clone repository')
    .action(createProjectAction)

  program
    .command('addcpn <name>')
    .description('add vue component, 例如: kv addcpn HelloWord [-d src/components]')
    .action((name) => {
      addComponentAction(name, program.dest || 'src/components')
    })

  program
    .command('addpage <page>')
    .description('add vue page and router config, 例如: kv addpage Home [-d src/pages]')
    .action((page) => {
      addPageAndRouteAction(page, program.dest || 'src/pages')
    })

  program
    .command('addstore <store>')
    .description('add vue store, 例如: kv addstore Home [-d src/pages]')
    .action((store) => {
      addStoreAction(store, program.dest || 'src/store')
    })
}

module.exports = {
  createCommands
}
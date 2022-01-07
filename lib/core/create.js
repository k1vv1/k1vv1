const program = require('commander')

const {
  createProjectAction,
  addComponentAction,
  addPageAndRouteAction,
  addStoreAction
} = require('./actions')

const createCommands = () => {
  program
    .command('create <project> [otherArgs...]')
    .description('clone repository into a newly created directory')
    .action(createProjectAction)

  program
    .command('add vue2-cpn <name>')
    .description('add vue2 component, 例如: kv vue2-cpn HelloWord [-d src/components]')
    .action((name) => {
      addComponentAction(name, program.dest || 'src/components')
    })

  program
    .command('add vue2-page <name>')
    .description('add vue2 page and router config, 例如: kv vue2-page Home [-d src/pages]')
    .action((name) => {
      addPageAndRouteAction(name, program.dest || `src/pages/${name.toLowerCase()}`)
    })

  program
    .command('add vue2-store <name>')
    .description('add vue2 store, 例如: kv vue2-store Home [-d src/store/modules]')
    .action((name) => {
      addStoreAction(store, program.dest || `src/store/modules/${name.toLowerCase()}`)
    })
}

module.exports = {
  createCommands
}
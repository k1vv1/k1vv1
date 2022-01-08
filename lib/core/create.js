const program = require('commander')

const {
  createProjectAction,
  addComponentAction,
  addPageAction,
  addRouterAction,
  addStoreAction
} = require('./actions')

const createCommands = () => {
  program
    .command('create <project> [otherArgs...]')
    .description('clone repository into a newly created directory')
    .action(createProjectAction)

  program
    .command('vue2-cpn <name>')
    .description('add vue2 component, eg: kv vue2-cpn HelloWord [-d src/components/common]')
    .action((name) => {
      addComponentAction(name, program.dest || 'src/components/common')
    })

  program
    .command('vue2-page <name>')
    .description('add vue2 page, eg: kv vue2-page Home [-d src/pages]')
    .action((name) => {
      addPageAction(name, program.dest || `src/pages/${name}`)
    })

  program
    .command('vue2-router <name>')
    .description('add vue2 router config, eg: kv vue2-router Home [-d src/pages]')
    .action((name) => {
      addRouterAction(name, program.dest || `src/router/map`)
    })

  program
    .command('vue2-store <name>')
    .description('add vue2 store, eg: kv vue2-store Home [-d src/store/modules]')
    .action((name) => {
      addStoreAction(name, program.dest || `src/store/modules`)
    })
}

module.exports = {
  createCommands
}
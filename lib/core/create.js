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
    .command('vue2-cpn <name>')
    .description('add vue2 component, eg: kv vue2-cpn HelloWord [-d src/components/common]')
    .action((name) => {
      addComponentAction(name, program.dest || 'src/components/common')
    })

  program
    .command('vue2-page <name>')
    .description('add vue2 page and router config, eg: kv vue2-page Home [-d src/pages]')
    .action((name) => {
      addPageAndRouteAction(name, program.dest || `src/pages/${name.toLowerCase()}`)
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
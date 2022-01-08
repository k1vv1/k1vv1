const program = require('commander')

const {
  createProjectAction,
  addComponentAction,
  addPageAction,
  addRouterAction,
  addStoreAction
} = require('./actions')

const {
  VUE2_ACTION,
  VUE3_ACTION
} = require('./constants')

const createCommands = () => {
  program
    .command('create <project> [otherArgs...]')
    .description('clone repository into a newly created directory')
    .action(createProjectAction)

  // --------------------------------------------------------------------------------

  program
    .command('vue2-cpn <name>')
    .description('add vue2 component, eg: kv vue2-cpn HelloWord [-d src/components/common]')
    .action((name) => {
      addComponentAction(name, program.dest || 'src/components/common', VUE2_ACTION)
    })

  program
    .command('vue2-page <name>')
    .description('add vue2 page, eg: kv vue2-page Home [-d src/pages]')
    .action((name) => {
      addPageAction(name, program.dest || `src/pages/${name}`, VUE2_ACTION)
    })

  program
    .command('vue2-router <name>')
    .description('add vue2 router config, eg: kv vue2-router Home [-d src/pages]')
    .action((name) => {
      addRouterAction(name, program.dest || `src/router/map`, VUE2_ACTION)
    })

  program
    .command('vue2-store <name>')
    .description('add vue2 store, eg: kv vue2-store Home [-d src/store/modules]')
    .action((name) => {
      addStoreAction(name, program.dest || `src/store/modules`, VUE2_ACTION)
    })

  // --------------------------------------------------------------------------------

  program
    .command('vue3-cpn <name>')
    .description('add vue3 component, eg: kv vue3-cpn HelloWord [-d src/components/common]')
    .action((name) => {
      addComponentAction(name, program.dest || 'src/components/common', VUE3_ACTION)
    })

  program
    .command('vue3-page <name>')
    .description('add vue3 page, eg: kv vue3-page Home [-d src/views]')
    .action((name) => {
      addPageAction(name, program.dest || `src/pages/${name}`, VUE3_ACTION)
    })

  program
    .command('vue3-router <name>')
    .description('add vue3 router config, eg: kv vue3-router Home [-d src/views]')
    .action((name) => {
      addRouterAction(name, program.dest || `src/router/map`, VUE3_ACTION)
    })

  program
    .command('vue3-store <name>')
    .description('add vue3 store, eg: kv vue3-store Home [-d src/store/modules]')
    .action((name) => {
      addStoreAction(name, program.dest || `src/store/modules`, VUE3_ACTION)
    })
}

module.exports = {
  createCommands
}
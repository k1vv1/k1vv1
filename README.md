# Documentation

`kxxvy`: A CLI to help you quickly build and develop front-end projects

The project aims to make front-end development engineering and improve development efficiency.

## 一、Installation

```bash
npm install kxxvy -g
```

## 二、Features

Currently Vue is supported, including the project of vue2 and vue3, (React will be supported later)

The vue project module has been configured, including：

- Common directory structure (you can modify on this basis)

- vue.config.js （something has configured，you can modify and configure more by yourself）

- axios (network request axios installation and secondary packaging)

- vue-router (router installation and configuration, in addition to dynamic loading of routing)

- vuex (installation and configuration of vuex, there are also dynamic loading sub-modules)

- etc...

Create project

```bash
kv create your_project_name
```

Automatically pull project templates, install project dependencies, open browsers, `http:#localhost:8080/`and automatically start projects

ps: If there are problems such as directory structure and port, they can be modified according to the needs of your project:)

## 三、Command

> 1、Create page

```bash
kv vue2-page yourPageName # eg: kv vue2-page HelloWord, the default will be stored in src / pages folder
kv vue2-page yourPageName -d src/pages/home # You can also specify a folder

kv vue3-page yourPageName # eg: kv vue3-page HelloWord, the default will be stored in src / views folder
kv vue3-page yourPageName -d src/views/home # You can also specify a folder
```

> 2、Create component

```bash
kv vue2-cpn yourCpnName # eg: kv vue2-cpn HelloWord, the default will be stored in src/components/common folder
kv vue2-cpn yourCpnName -d src/components/modules # You can also specify a folder

kv vue3-cpn yourCpnName # eg: kv vue3-cpn HelloWord, the default will be stored in src/components/common folder
kv vue3-cpn yourCpnName -d src/components/modules # You can also specify a folder
```

> 3、Create router

```bash
kv vue2-router yourRouterName # eg: kv vue2-router Home, the default will be stored in src/router/map folder
kv vue2-router yourRouterName -d src/router # You can also specify a folder

kv vue3-router yourRouterName # eg: kv vue3-router Home, the default will be stored in src/router/map folder
kv vue3-router yourRouterName -d src/router # You can also specify a folder
```

After the creation is completed, no manual configuration is required, and all routes have been dynamically integrated:

```js
const routes = [];
const files = require.context("./map", false, /.js$/);
files.keys().forEach((key) => {
  const route = files(key).default;
  if (Array.isArray(route)) {
    for (let item of route) {
      routes.push(item);
    }
  } else {
    routes.push(route);
  }
});
```

> 4、Create Vuex submodule

```bash
kv vue2-store yourModuleName # eg: kv vue2-store Home, the default will be stored in src/store/modules folder
kv vue2-store yourModuleName -d src/store # You can also specify a folder

# When a vue3 project creates a vuex sub module, the types file will be created by default
kv vue3-store yourModuleName # eg: kv vue3-store Home, the default will be stored in src/store/modules folder
kv vue3-store yourModuleName -d src/store # You can also specify a folder
```

After the creation is completed, no manual configuration is required, and all sub-modules have been dynamically integrated:

```js
const modules = {};
const files = require.context("./modules", false, /.js$/);
files.keys().forEach((key) => {
  const name = path.basename(key, ".js");
  modules[name] = files(key).default || files(key);
});
```

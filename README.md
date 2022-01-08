# 说明文档

`kv-cli`: 一个帮助你快速搭建和开发前端项目的 CLI

该项目旨在使前端开发工程化，提高开发效率。

## 一、安装

```bash
npm install kv/cli -g
```

## 二、特性

目前只支持 `vue` 项目，包括 `vue2`、`vue3`（后期考虑支持 `react` 项目）

项目基础模板已经配置，主要包括：

- 常用的目录结构 （你可以在此基础上修改）

- vue.config.js （已经有了一些配置，可以自行修改和配置更多）

- axios （网络请求 axios 的安装以及二次封装）

- vue-router （router 的安装和配置，另有路由的动态加载）

- vuex （vuex 的安装和配置，另有动态加载子模块）

- etc...

创建项目

```bash
kv create your_project_name
```

自动拉取项目模板、安装项目依赖、打开浏览器 http://localhost:8083/、自动启动项目

ps: 若目录结构、端口号等问题可自行根据项目需求进行调整:)

## 三、常用命令介绍

> 1、创建页面

```bash
kv vue2-page yourPageName // eg: kv vue2-page HelloWord 默认会放到src/pages目录下
kv vue2-page yourPageName -d src/pages/home // 也可指定文件夹

kv vue3-page yourPageName // eg: kv vue3-page HelloWord 默认会放到src/views目录下
kv vue3-page yourPageName -d src/views/home // 也可指定文件夹
```

> 2、创建组件

```bash
kv vue2-cpn yourCpnName // eg: kv vue2-cpn HelloWord 默认会放到src/components/common目录下
kv vue2-cpn yourCpnName -d src/components/modules // 也可指定文件夹

kv vue3-cpn yourCpnName // eg: kv vue3-cpn HelloWord 默认会放到src/views目录下
kv vue3-cpn yourCpnName -d src/components/modules // 也可指定文件夹
```

> 3、创建路由

```bash
kv vue2-router yourRouterName // eg: kv vue2-router Home 默认会放到src/router/map目录下
kv vue2-router yourRouterName -d src/router // 也可指定文件夹

kv vue3-router yourRouterName // eg: kv vue3-router Home 默认会放到src/router/map目录下
kv vue3-router yourRouterName -d src/router // 也可指定文件夹
```

创建完成后，无需手动配置，已经动态将所有路由集成进去了：

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

> 4、创建 vuex 子模块

```bash
kv vue2-store yourModuleName // eg: kv vue2-router Home 默认会放到src/store/modules目录下
kv vue2-store yourModuleName -d src/store // 也可指定文件夹

kv vue3-store yourModuleName // eg: kv vue3-router Home 默认会放到src/store/modules目录下
kv vue3-store yourModuleName -d src/store // 也可指定文件夹
```

创建完成后，无需手动配置，已经动态将所有子模块集成进去了：

```js
const modules = {};
const files = require.context("./modules", false, /.js$/);
files.keys().forEach((key) => {
  const name = path.basename(key, ".js");
  modules[name] = files(key).default || files(key);
});
```

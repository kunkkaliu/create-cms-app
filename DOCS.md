# 文档

## 文件结构说明

```
my-app
|-- dist/              打包输出目录
|-- __mocks__/         测试静态资源mock目录
|-- build/             打包脚本目录
    |-- gen-proto-js.js         生成proto service脚本
    |-- webpack.config.js       webpack基础配置
    |-- webpack.dev.config.js   webpack开发环境配置
    |-- webpack.prod.config.js  webpack生成环境配置
|-- tests/             测试脚本目录
|-- src/
    |-- actions/       引起数据流动的action
    |-- api/           网络请求,mock数据 //已不再使用
    |-- assets/        静态资源
    |-- components/    公用组件
    |-- containers/    最外层容器
    |-- middlewares/   中间件(异步action)
    |-- network/       网络请求,mock数据
    |-- reducers/      根据不同action改变数据state
    |-- route/         前端路由
    |-- selectors/     mapStateToProps优化器
    |-- store/         数据仓库初始化
    |-- utils/         公用的工具
    |-- views/         页面
    |-- index.jsx      入口
    |-- index.less     样式入口
|-- .babelrc           babel 配置
|-- .eslintrc          eslint 代码规范配置
|-- .eslintignore      eslint 忽略配置
|-- .gitignore
|-- index.html         html 入口，打包后自动替换 index.html 入口 js src 地址
|-- package.json
|-- postcss.config.js  样式处理配置(px变rem, 增加浏览器兼容前缀)
|-- README.md
|-- devServer.js       开发环境node服务
|-- yarn.lock          包管理工具yarn配置文件
```

## 可用的脚本

### `npm run dev`

进入开发者模式，默认端口 3003

### `npm run build`

构建线上模式代码，包括 dist 目录和 index.html 文件

### `npm run lint`

代码规范检查，未测试通过禁止上线。

### `npm test`

运行tests文件夹下测试代码

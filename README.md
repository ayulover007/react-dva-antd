

## 开发及构建

### 目录结构

```bash
├── /mock/           # 数据mock的接口文件
├── /dist/           # 项目输出目录
├── /src/            # 项目源码目录
│ ├── /components/   # 项目组件
│ │ ├── /common/     # 项目公共组件
│ ├── /routes/       # 路由组件
│ ├── /models/       # 数据模型
│ ├── /services/     # 数据接口
│ ├── /utils/        # 工具函数
│ ├── route.js       # 路由配置
│ ├── index.js       # 入口文件
│ └── index.html     
├── package.json     # 项目信息
└── proxy.config.js  # 数据mock配置

```

### 快速开始

克隆项目文件:

```
git clone git@github.com:pmg1989/dva-admin.git
```

进入目录安装依赖:

```
npm install 或者 yarn 或者 yarn install
```

开发：

```bash
npm run dev    # 使用mock拦截请求，数据存储在localStroge里

打开 http://localhost:8000
```


构建：

```bash

npm run build-dev local环境发布
npm run build-staging staging 环境发布
npm run build-release release 环境发布

build后的文件将会生成dist目录
```

### 注意事项

- 生产环境中，如已有数据接口，请将`conf/webpack.config.js`中的 `webpackConfig.plugins 'newband.admin.isMock': true`改为false，以及 `src/utils/index.js`中的`export request from './request-mock'`改为`export request from './request'`
- 切换`conf/webpack.config.js`中的`'newband.app.admin.IS_DYNAMIC_LOAD': true`,可以调整JavaScript是否动态按需加载
- 开发环境中，如再mock目录新增文件，请在`src/utils/mock.js`第二行的`mockData`数组中添加
- 如需重写antd样式配置，请修改`src/theme.js`
- 项目配置文件在`src/utils/config.js`
- 如需重写异步请求函数，请修改`src/utils/request.js`
  （关于为什么使用axios而不是fetch：在一个无服务器的环境中模拟数据请求，[Mock](https://github.com/nuysoft/Mock)不能拦截Fetch，只能拦截XHR，所以我选了一个纯Ajax的库[axios](https://github.com/mzabriskie/axios)）

### 从 0 搭建 React 项目工程

#### package.json

- name：项目的名称，通常是一个唯一的字符串，可以用于发布到 npm 或者其他包管理器中。
- version：项目的版本号，遵循 Semantic Versioning 规范。
- description：项目的简介和描述。
- main：项目的主入口文件，通常是一个 JavaScript 文件。
- scripts：包含一组命令行脚本，用于自动化构建、测试、部署等任务。例如："start": "node index.- - js" 表示通过运行 npm start 命令启动项目。
- dependencies：列出项目所依赖的包和版本信息，这些包会在安装时自动下载到本地环境中。
- devDependencies：列出项目开发过程中所依赖的包和版本信息，这些包只在开发时使用，不会在生产环境中使用。
- peerDependencies：列出项目运行时所依赖的包和版本信息，这些包需要在项目的上级依赖中进行声明和安装。
- engines：指定项目所需的 Node.js 和 npm 版本范围。
- repository：指定项目的代码仓库地址。
- keywords：关键字数组，用于描述项目的主题和类型。
- author：作者信息。
- license：项目的许可证类型。

#### .npmrc

.npmrc 文件是 npm 的配置文件之一，用于配置 npm 在执行安装和发布等操作时的行为和参数。

- registry：指定 npm 的镜像源地址，例如 registry=registry.npm.taobao.org。
- cache：指定 npm 的缓存目录，例如 cache=/path/to/cache。
- proxy：指定 npm 的网络代理设置，例如 proxy=my.proxy.com:8080。
- https-proxy：指定 npm 的 HTTPS 网络代理设置，例如 https-proxy=my.proxy.com:8080。
- strict-ssl：指定是否开启 npm 的 SSL 证书校验，例如 strict-ssl=false。
- loglevel：指定 npm 的日志输出级别，例如 loglevel=warn。
- save-exact：指定是否在安装依赖时自动保存精确的版本号，例如 save-exact=true。
- progress：指定 npm 的进度条输出设置，例如 progress=false。
- access：指定包的访问权限，例如 access=public 或 access=restricted。

#### 构建流程

1. 初始化项目

```bash
mkdir react-template
cd react-template
npm init -y
git init

```

2. 安装配置 react & TypeScript

```bash
pnpm add react react-dom
pnpm add -D @types/react @types/react-dom
pnpm add typescript -D
# 有了 TypeScript，就可以直接通过 tsc 命令生成一个 tsconfig.json 的配置文件。
npx tsc --init
# 按照所需手动修改 ts 的配置文件
```

3. src 下创建 index.tsx、App.tsx
4. Webpack 相关

- webpack 、webpack-cli :打包必备。
- webpack-dev-server: 一个提供热更新的开发服务器，对开发阶段友好。
- webpack-merge: 用来合并配置文件。

```bash
pnpm add webpack webpack-cli webpack-dev-server webpack-merge -D
```

5. 配置 Webpack 文件
   Webpack 默认读取的是 webpack.config.js 文件，但在实际开发中我们需要将生产环境和开发环境分开。在 scripts 目录下创建三个配置文件。修改 package.json 的 scripts

```json
 "scripts": {
    "dev": "cross-env NODE_ENV=development webpack serve -c scripts/webpack.dev.js",
    "build": "cross-env NODE_ENV=production webpack -c scripts/webpack.prod.js"
  }
```

```bash
pnpm add cross-env -D
```

6. 配置 babel

```bash
pnpm add -D babel-loader @babel/core @babel/preset-env @babel/preset-react @babel/preset-typescript @babel/plugin-transform-runtime react-refresh @pmmmwh/react-refresh-webpack-plugin
```

7. 安装 html-webpack-plugin
   根目录创建一个模板 index.html 文件

```bash
pnpm add -D html-webpack-plugin

```

8. css 配置

```bash
# less-loader 默认是11版本过高会报错。
# 两种方法：1、要么指定低版本的 less-loader@^6.2.0  2、同时安装 less 和 postcss
pnpm add -D style-loader css-loader  postcss-loader  less-loader@^6.2.0 postcss-preset-env

# 或者
pnpm add -D style-loader css-loader postcss postcss-loader less less-loader postcss-preset-env

# 打包压缩
pnpm add -D  css-minimizer-webpack-plugin mini-css-extract-plugin
```

配置 webpack.dev.js  
配置 webpack.prod.js

9. 图片&字体
   Webpack 5 中的 asset module 其实已经帮我们处理了，可以直接使用

- file-loader ：不仅仅可以处理图片资源，本质是处理文件导入地址并替换成其访问地址，并把文件输出到相应位置，音视频等资源也可以使用它。
- url-loader：file-loader 的升级版，包含 file-loader 的全部功能，并且能够根据配置将符合配置的文件转换成 Base64 方式引入，将小体积的图片 Base64 引入项目可以减少 http 请求，也是一个前端常用的优化方式。

10. prettier

```shell
pnpm i -D prettier
```

.prettierrc

```json

```

11. .editorconfig

```ini
root = true
[*]
indent_style = space
indent_size = 2
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true
end_of_line = lf
[*.md]
trim_trailing_whitespace = false

```

11. ESLint

```shell
pnpm add eslint -D
npx eslint --init
```

12. 代码提交规范

```bash
pnpm add husky -D
pnpm add lint-staged -D
```

根目录 package.json 中增加以下内容：

```json
"husky": {
    "hooks": {
        "pre-commit": "lint-staged",
        "commit-msg": "commitlint --config .commitlintrc.js -E HUSKY_GIT_PARAMS"
    }
},
"lint-staged": {
    "*.{ts,tsx,js}": [
        "eslint --config .eslintrc.js"
    ],
    // "*.{css,less,scss}": [
    //     "stylelint --config .stylelintrc.js"
    // ],
    "*.{ts,tsx,js,json,html,yml,css,less,scss,md}": [
        "prettier --write"
    ]
},

```

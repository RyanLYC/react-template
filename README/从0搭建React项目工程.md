### 从 0 搭建 React 项目工程

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

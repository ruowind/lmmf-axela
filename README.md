#lmmf-axela

> 一个基于 [Gulp](https://github.com/gulpjs/gulp)、高效、跨平台、可定制的前端开发与构建工作流。  

## 功能特性
- Less/Sass自动编译成CSS并生成SourceMap方便调试定位
- CSS Sprite 雪碧图自动生成并且自动定位
- CSS 细小图片且不能做雪碧图的转Base64字符串
- CSS 引用的资源文件去缓存（MD5）方案
- CSS 引用资源相对路径自动转全路径
- 监听文件变动，自动刷新浏览器（css样式自动注入，不刷新浏览器）
- HTML中JS和CSS路径自动生成http-concat路径
- 支持JS和CSS的压缩
- 输出文件自动过滤功能（删除没有用到的资源文件）
- 全项目和单页面编译生成功能
- 自动复制文件到SVN对应目录
- Gulp Task自动生成功能

## 安装
```console
$ npm install --save lmmf-axela
```

## 快速开始
- 请确保已安装 [Node.js](https://nodejs.org/) (版本>= 4.0.0，推荐6.5.0或以上) 环境
- 请确保全局安装或者当前项目安装[Gulp](https://github.com/gulpjs/gulp)
- 在项目根目录新建 `gulpfile.js` 或者在已有的 `gulpfile.js` 文件里加入 `require('lmmf-axela').run();`
- 推荐配合 [WebStorm](https://www.jetbrains.com/webstorm/) 等编辑器的 [Gulp 任务管理器](https://www.jetbrains.com/help/webstorm/2017.1/gulp-tool-window.html) 使用，带你装逼带你飞。

## 目录结构
````bash
project-name/
│
├── src             // 源文件目录
│   ├── html        // html页面目录
│   ├── img         // 图片等资源目录
│   ├── js          // js脚本目录
│   └── styles      // 样式文件目录(less、scss、css)
│ 
├─- dist            // 源代码编译构建后生成的文件用于上传SVN
│
├── axela.json      // 工作流配置文件
│ 
├── package.json
│ 
├── ......
````
### 配置文件`axela.json`
`axela.json`配置文件为json文件，位于项目根目录，可存放配置信息或开启关闭相关功能。
以下列出的都是默认值，有需要的自行修改

```bash
{
  // 本地svn目录配置
  "svn": {
    "html": "D:/svn/html",              // 页面svn对应目录
    "pic": "D:/svn/pic"                 // 静态资源svn对应目录
  },

  // 本地服务配置
  "server": {
     "port": 8080                       // 服务端口
  },

  // cdn配置
  "plugins": {
    "domain": ["//pic.lvmama.com"],     // cdn域名数组，多个域名时随机分配
    "path": "/min/index.php?f="         // http-concat路径头
  },

  // 压缩配置
  "compress": {
    "js": false,                        // 是否压缩js
    "css": false                        // 是否压缩css
  },
  
  // 默认页面和编译生成单页面模块地址
  "pages":[]
}
```
关于`axela.json`中的`pages`配置说明
```bash
{
  "pages": [
    {
      "name": "order-abroad-group",                         // 页面的别名用于显示在Gulp列表里
      "html": "order/abroad/order-abroad-group.html"        // 页面相对于html目录的路径
    },
    {
      "name": "wuyi-zt",
      "html": "zt/wuyi.html"
    }
  ]
}
```

## 任务说明
### 注意点：
- 注1：**`/src`** 为源文件(开发目录)，`/dist` 目录为流程**自动**生成的**临时目录**,请不要直接修改 `/dist`目录下的任何文件。
- 注2：打开webstrom里的Gulp Task窗口，里面将列出所有的可执行任务，前三个为默认任务，后面的为根据配置文件`pages`里的数组生成的任务。
- 注3：`axela:dev`任务为编译所有源代码并启动本地服务，自动打开浏览器定位到html跟目录，自行选择需要访问的页面；`axela.dist`任务为编译所有源代码并构建项目，生成可提交到svn的文件。`axela:dist2svn`任务为将`dist`下的文件按目录结构复制到本地svn目录，便于提交。

## Bug反馈
如果有 `Bug反馈` 或 `功能建议`，请创建 [Issue](https://github.com/ruowind/lmmf-axela/issues)，借助大家的力量完善这个项目，来提高前端的开发效率，抽出更多的时间去把妹，去陪家人。

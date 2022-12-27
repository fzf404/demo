# Docute

> 基于 `Docute` 的文档生成器

## 使用

1. 在 `docs` 目录中新建任意文件 & 文件夹。
2. 在文件夹中新建任意 `markdown` 文件，并写入文本。
3. 确保安装 `nodejs`，运行命令 `node build/generate.js` ，接下来就可以在浏览器中访问了。

<Note type="tip">

网站标题以及更多设置，请修改 `static/custom.js` 文件。

</Note>

## 部署

> 嫌麻烦可尝试 [Webfiy](https://webify.cloudbase.net/)

1. fork 本项目，clone 至本地计算机，添加 markdown 文件，并推送到 git 仓库。
2. 服务器 clone 本项目，并执行 `node build/generate.js`
3. 在 github 及服务器中配置 webhook，这样就可以同步更新了。

### Webfiy

1. fork 本项目，clone 至本地计算机，添加 markdown 文件，并推送到 git 仓库。
2. 在 `webify` 中点击新建应用，输入 git 仓库地址。
3. 框架预设选自定义，构建命令填 `node build/generate.js` ，输出目录填 `.` ，安装命令为空。
4. 接着等待部署完成，每次在本地更新并推送至远程端后，将会自动更新网站内容。

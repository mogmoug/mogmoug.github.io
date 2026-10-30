# Mogmoug Blog

手写静态博客：HTML / CSS / JavaScript，无框架、无构建步骤、无第三方运行时依赖。
支持深色 / 浅色主题、客户端搜索、自动目录、阅读进度，部署在 GitHub Pages。

线上地址：<https://mogmoug.github.io>

## 目录结构

```
.
├── index.html              # 首页：简介 + 最新文章
├── archive.html            # 按年份归档
├── tags.html               # 标签索引
├── about.html              # 关于页
├── 404.html                # 自定义 404
├── posts/
│   ├── rustlings-01.html   # 文章页
│   └── civtext-retro.html
├── assets/
│   ├── css/style.css       # 全站样式与主题变量
│   ├── js/main.js          # 主题、搜索、目录、进度、复制代码
│   └── favicon.svg
├── search.json             # 客户端搜索索引
├── feed.xml                # Atom 订阅
├── sitemap.xml
├── robots.txt
├── .nojekyll               # 让 GitHub Pages 原样发布，不跑 Jekyll
└── assets/                 # 静态资源
```

## 本地预览

站点使用根相对路径（`/assets/...`），需要起一个静态服务器：

```bash
python3 -m http.server 8000
# 打开 http://localhost:8000
```

## 新增一篇文章

1. 复制 `posts/rustlings-01.html` 为新文件，改标题、描述、日期、正文和 JSON-LD。
2. 在 `index.html` 的最新文章卡片里加一条。
3. 在 `archive.html` 对应年份下加一条。
4. 在 `tags.html` 的标签云和对应标签列表里加一条（如有新标签）。
5. 在 `search.json` 里加一条（title / url / description / tags / text）。
6. 在 `feed.xml` 和 `sitemap.xml` 里加一条。

旧站 URL（`/2026/09/24/...`、`/about/`）已保留跳转页。

## 部署

GitHub Pages 从 `main` 分支根目录发布。`.nojekyll` 会跳过 Jekyll 处理，直接发布静态文件。
推送即可：

```bash
git add .
git commit -m "redesign: hand-written static blog"
git push
```

# 小 Demo 游乐场

博客 `/demos/` 目录下的纯前端 Demo 合集，共 56 个独立 HTML 文件。每个文件自包含（内联 CSS/JS），点开即玩，无需构建、无需服务器、无需安装依赖。

## 快速开始

```bash
# 方式一：直接用浏览器打开
open index.html          # macOS
xdg-open index.html      # Linux

# 方式二：起一个本地静态服务器（可选）
python3 -m http.server 8000
# 然后访问 http://localhost:8000
```

打开 [`index.html`](index.html) 可浏览全部 Demo 的可视化目录。

## 分类目录

### 物理与科学模拟

| 文件 | 说明 |
| --- | --- |
| `弹簧振子模拟.html` | 高中物理弹簧振子 / 简谐运动，可拖拽 |
| `自由落体.html` | 重力做功与功率的可视化 |
| `机械波.html` | 横波与质点振动模拟 |
| `抛物线焦点弦圆切准线.html` | Plotly.js：焦点弦为直径的圆与准线相切 |
| `conicsections.html` | 圆锥曲线主要结论图形演示 |
| `ball-gravity-sim.html` | 引力小球模拟系统 |
| `electric-wave-sim.html` | 电磁波的产生与接收交互仿真 |
| `nuclear-bomb-sim.html` | 核弹爆炸模拟器（增强版） |
| `weather-sim.html` | 数值气象模型，200×300 网格 |
| `flood-sim.html` | 洪水模拟器 |
| `3d-flood-sim.html` | 3D 地形洪水仿真 |
| `2dsolarsys.html` | 2D 太阳系真实比例展示 |

### 3D 与游戏

| 文件 | 说明 |
| --- | --- |
| `3d-racer-car.html` | 3D 极速狂飙赛车游戏 |
| `3d-rocket-explore.html` | 3D 地球 + 火箭背包探索 |
| `3d-sandbox-game.html` | 方块世界 3D 沙盒游戏 |
| `3d-showoff.html` | POLY·LAB 纯 JS 3D 演示 |
| `simple-voxel.html` | 简陋 3D 方块游戏 |
| `voxel-world.html` | Voxel World 体素世界 |
| `terrain-generator.html` | 程序化真实地形生成器 |
| `terrain-voxel.html` | 体素地形：高度场 + 着色 |
| `wuziqi.html` | 五子棋经典对战 |
| `miniwar.html` | 迷你领地战（双人对战） |
| `grow-vegetables-game.html` | 阳光菜园休闲种菜游戏 |
| `pixel-growing-game.html` | 像素农场物语（开罗风格） |
| `spendonebillion.html` | 花光 10 亿小游戏 |
| `throwbottle.html` | 晚风里的信 · 扔瓶子 |
| `wulinghongguangmodel.html` | 五菱宏光 3D 模型 |

### 系统与终端模拟

| 文件 | 说明 |
| --- | --- |
| `windows-sim.html` | Windows 桌面模拟 |
| `mac-os-sim.html` | macOS 桌面模拟 |
| `ubuntudesk.html` | Ubuntu 桌面 |
| `web80-tiny-computer.html` | Web-80 幻想电脑 |
| `terminal-style-library-sys.html` | 终端风格图书馆管理系统 |
| `turingmachine.html` | 图灵机模拟器 |

### AI 与聊天

| 文件 | 说明 |
| --- | --- |
| `fake-chatgpt.html` | ChatGPT 多会话版复刻 |
| `simple-ai-chat.html` | DeepSeek 极简对话 |
| `deepseekchatcopy.html` | DeepSeek 网页版复刻 |
| `ds-apple-style.html` | DeepSeek 苹果风格界面 |
| `ds-blog.html` | DeepSeek · 思考的痕迹 |
| `simpleagent.html` | DeepSeek Agent：记忆与计费 |
| `information-better.html` | AI 信息增益助手 |
| `handwriterecognization.html` | 手写数字识别（浏览器内推理） |
| `quizdeskdemo.html` | AI 刷题学习桌 |

### 工具与教学

| 文件 | 说明 |
| --- | --- |
| `calculator.html` | 简易计算器 |
| `virtual-chemlab.html` | 启元虚拟化学实验室（130K，功能最全） |
| `chemlab.html` | 化学实验室模拟器 · 虚拟实验平台 |
| `chemlab1.html` | 高锰酸钾制氧气实验 |
| `logic-sim.html` | 逻辑电路模拟器 |
| `musicplayer.html` | 音乐播放器 |
| `bianchenglang.html` | 自然语言编程（图灵完备解释器） |
| `cordis_ppt_easy.html` | Cordis 通俗导览 · 组合式编程范式 |
| `rust-intro.html` | Rust 语言简介 |
| `gaozhongsim.html` | 高中模拟器 |
| `plan-task-review.html` | 计划 · 任务 · 笔记 |

### 数据与资讯

| 文件 | 说明 |
| --- | --- |
| `2025gov-report.html` | 2025 年国民经济和社会发展统计公报数据看板 |
| `41flashreport.html` | DeepSeek-V4.1-Flash 问题引导式精读 |
| `twittercopy.html` | Twitter 主页复刻 |

## 技术说明

- **零依赖优先**：多数文件只用原生 HTML/CSS/JS
- **按需引入 CDN**：少数 Demo 使用 Three.js、Plotly.js 等（需联网）
- **无构建步骤**：文件即成品，可直接分发
- **单文件结构**：HTML + CSS + JS 全部内联，便于阅读和修改

## 目录结构

```
demos/
├── index.html          # 可视化目录页（接入博客主题）
├── README.md           # 本文件
└── *.html              # 56 个独立 Demo
```

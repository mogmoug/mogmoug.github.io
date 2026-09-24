---
title: 学习记录1（Rustlings）
date: 2026-09-24
categories: [学习, 项目]
tags: [rustlings, rust]
---


# 学习记录

**日期**：2026-09-24  
**项目**：Rustlings  
**进度**：完成 `00_intro` ~ `04_primitive_types` 全部练习 + `quiz1`

## 什么是 Rustlings
Rustlings 是由 Rust 官方维护的交互式 Rust 学习项目。  
通过“修改代码让编译通过 / 让测试通过”的方式，逐步熟悉 Rust 语法、类型系统和所有权机制。

## Rustlings 安装
1. 更新 Rust 工具链，避免版本问题：
   ```bash
   rustup update
   ```
2. 安装 rustlings：
   ```bash
   cargo install rustlings
   ```
3. 在代码目录中初始化练习：
   ```bash
   rustlings init
   ```
   会生成一个 `rustlings/` 文件夹。
4. 进入练习目录并启动：
   ```bash
   cd rustlings
   rustlings
   ```
   修改练习文件后，Rustlings 会自动检测并提示结果。

## 常用命令
```bash
rustlings list              # 查看所有练习和进度
rustlings run variables1    # 单独运行某个练习
rustlings hint variables1   # 查看提示
rustlings reset variables1  # 重置某个练习
```

## 已完成内容
- `00_intro`：了解 Rustlings 使用方式
- `01_variables`：变量绑定、`mut`、类型推断、未使用变量
- `02_functions`：函数定义、参数、返回值、表达式与语句
- `03_if`：`if` / `else`、条件表达式
- `04_primitive_types`：整数、浮点数、`bool`、`char`、元组、数组
- `quiz1`：综合运用前面章节内容

## 今日易错点
- Rust 变量默认不可变，需要修改时要加 `mut`
- 函数返回值不能随意加分号，加了分号会变成返回 `()`
- `if` 条件必须是 `bool`，不能像 Python 那样依赖 truthy/falsy
- 数组类型是 `[T; N]`，长度固定；切片 `&[T]` 是对数组或 `Vec` 的借用视图
- `char` 使用单引号，是 Unicode 标量；字符串字面量 `&str` 使用双引号

## 下一步
- `05_vecs`：动态数组 `Vec<T>`
- `06_move_semantics`：所有权、移动、借用、可变借用
- 重点理解：
  - `String` 与 `&str`
  - `Vec<T>` 与 `&[T]`
  - `move`、`borrow`、`mutable borrow`

整体进度不错，前 5 章 + quiz1 基本是在打语法和类型基础，接下来 `move_semantics` 会开始进入 Rust 的核心难点。需要的话，我可以继续帮你整理后面章节的学习记录。
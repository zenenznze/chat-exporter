# AI Chat Exporter

一个浏览器扩展，用于从 tu-zi.com 导出聊天记录。支持 Firefox 和 Chrome 浏览器。

## 功能特点

- 支持导出聊天记录为 Markdown 和 JSON 格式
- 保留原始格式，包括表格、列表等
- 同时导出用户输入和 AI 回复
- 简单易用的界面

## 安装说明

### Firefox 版本

1. 下载 `chat-exporter` 目录下的文件
2. 在 Firefox 地址栏输入：`about:debugging#/runtime/this-firefox`
3. 点击"临时载入附加组件"
4. 选择 `chat-exporter/manifest.json` 文件

### Chrome 版本

1. 下载 `chrome-chat-exporter` 目录下的文件
2. 在 Chrome 地址栏输入：`chrome://extensions/`
3. 开启"开发者模式"（右上角开关）
4. 点击"加载已解压的扩展程序"
5. 选择 `chrome-chat-exporter` 文件夹

## 使用方法

1. 访问 tu-zi.com 网站
2. 点击浏览器工具栏中的扩展图标
3. 选择导出格式（Markdown 或 JSON）
4. 点击"导出聊天记录"按钮
5. 文件将自动下载到你的下载文件夹

## 注意事项

- 请确保在 tu-zi.com 网站上使用此扩展
- 导出前请等待页面完全加载
- 如遇到问题，请刷新页面后重试

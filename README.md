# AI Chat Exporter

一个简单的 Firefox 浏览器扩展，用于导出 tu-zi.com 网站的 AI 聊天记录。

## 功能

- 支持导出为 JSON 或 Markdown 格式
- 保留原始格式（表格、代码块、列表等）
- 自动添加时间戳到文件名

## 安装和使用

1. 下载此仓库
2. 在 Firefox 地址栏输入：`about:debugging#/runtime/this-firefox`
3. 点击"临时载入附加组件"
4. 选择仓库中的 `manifest.json` 文件
5. 在 tu-zi.com 网站上点击插件图标即可导出聊天记录

# AI Chat History Exporter - Firefox Extension

这是一个Firefox浏览器扩展，用于导出特定AI镜像站的聊天记录。

## 项目架构

### 1. 核心组件

#### 1.1 manifest.json
- 扩展的配置文件
- 定义权限、版本、描述等基本信息
- 指定background scripts、content scripts和popup页面

#### 1.2 Background Script (background.js)
- 扩展的后台运行脚本
- 管理扩展的生命周期
- 处理跨域请求
- 管理数据存储

#### 1.3 Content Script (content.js)
- 注入到目标网页的脚本
- 负责读取和解析页面中的聊天记录
- 与background script通信

#### 1.4 Popup页面 (popup.html/js/css)
- 用户界面组件
- 提供导出选项和配置
- 显示导出状态和进度

### 2. 数据流

```
[网页] -> [Content Script] -> [Background Script] -> [本地存储/下载]
```

1. Content Script监听页面并提取聊天记录
2. 数据传送给Background Script处理
3. Background Script将数据保存或触发下载

### 3. 主要功能

#### 3.1 聊天记录提取
- 使用DOM操作或API拦截获取聊天内容
- 支持增量更新
- 处理不同格式的消息（文本、代码块等）

#### 3.2 数据处理
- 格式化聊天记录
- 支持多种导出格式（JSON、Markdown、TXT等）
- 数据清理和验证

#### 3.3 存储管理
- 使用browser.storage API存储配置
- 临时数据缓存
- 导出文件管理

### 4. 技术栈

- JavaScript (ES6+)
- Firefox WebExtensions API
- HTML5/CSS3
- 可能用到的库：
  - date-fns (时间处理)
  - marked (Markdown解析)
  - file-saver (文件下载)

### 5. 开发环境设置

1. 安装必要的开发工具
```bash
npm install --save-dev web-ext
```

2. 项目结构
```
project/
├── manifest.json
├── background/
│   └── background.js
├── content/
│   └── content.js
├── popup/
│   ├── popup.html
│   ├── popup.js
│   └── popup.css
└── utils/
    └── helpers.js
```

### 6. 安装和使用

1. 在Firefox中打开 about:debugging
2. 点击"This Firefox"
3. 点击"Load Temporary Add-on"
4. 选择manifest.json文件

### 7. 注意事项

- 需要合理处理跨域请求
- 遵守浏览器扩展的安全策略
- 注意性能优化，避免影响浏览体验
- 确保用户数据的安全性
- 遵守目标网站的使用条款和政策

### 8. 后续开发计划

- [ ] 支持更多AI镜像站
- [ ] 添加导出格式选项
- [ ] 优化用户界面
- [ ] 添加数据备份功能
- [ ] 支持导出历史记录

## 详细开发步骤

### 第一阶段：网站分析与准备工作

#### 1. 开发环境准备
1. 安装 Firefox 浏览器
2. 安装 VS Code 编辑器
3. 安装必要的 VS Code 插件：
   - JavaScript Debugger
   - Firefox Debugger
   - Live Server (可选)

#### 2. 网站分析
1. 打开目标AI镜像站
2. 按F12打开开发者工具
3. 分析网站结构：
   ```
   a. 切换到"Elements"标签页
   b. 找到聊天记录所在的DOM元素
   c. 记录重要的class名称或id
   d. 注意消息的HTML结构
   ```
4. 分析网络请求：
   ```
   a. 切换到"Network"标签页
   b. 筛选XHR/Fetch请求
   c. 观察是否有API请求
   d. 记录重要的API端点
   ```
5. 记录关键信息：
   - 消息容器的选择器
   - 用户消息和AI回复的区分方式
   - 时间戳的位置和格式
   - 代码块的特殊标记

### 第二阶段：基础框架搭建

#### 1. 创建项目结构
1. 创建项目文件夹：
   ```bash
   mkdir chat-exporter
   cd chat-exporter
   ```

2. 创建必要的文件和目录：
   ```bash
   mkdir background content popup utils
   touch manifest.json
   touch background/background.js
   touch content/content.js
   touch popup/popup.html
   touch popup/popup.js
   touch popup/popup.css
   touch utils/helpers.js
   ```

#### 2. 配置manifest.json
1. 创建基本配置：
   ```json
   {
     "manifest_version": 2,
     "name": "AI Chat Exporter",
     "version": "1.0",
     "description": "Export chat history from AI mirror site",
     "permissions": [
       "activeTab",
       "downloads",
       "storage"
     ]
   }
   ```

2. 添加组件配置：
   ```json
   {
     ...
     "background": {
       "scripts": ["background/background.js"]
     },
     "content_scripts": [{
       "matches": ["*://your-target-site.com/*"],
       "js": ["content/content.js"]
     }],
     "browser_action": {
       "default_popup": "popup/popup.html"
     }
   }
   ```

### 第三阶段：核心功能实现

#### 1. Content Script开发
1. 实现消息选择器：
   ```javascript
   // 根据第一阶段分析的选择器
   const messages = document.querySelectorAll('.message-selector');
   ```

2. 实现消息解析：
   ```javascript
   // 区分用户消息和AI回复
   // 提取时间戳
   // 处理特殊格式（代码块等）
   ```

3. 实现数据传输：
   ```javascript
   // 与background script通信
   ```

#### 2. Background Script开发
1. 实现消息监听
2. 实现数据存储
3. 实现文件下载

#### 3. Popup界面开发
1. 创建基本HTML结构
2. 实现导出按钮和选项
3. 添加进度显示

### 第四阶段：测试与调试

#### 1. 本地测试
1. 在Firefox中加载扩展：
   ```
   a. 打开 about:debugging
   b. 点击"This Firefox"
   c. 点击"Load Temporary Add-on"
   d. 选择manifest.json
   ```

2. 测试各项功能：
   - 消息提取
   - 格式转换
   - 文件下载

#### 2. 调试技巧
1. 使用console.log()输出调试信息
2. 使用开发者工具的Debugger
3. 检查网络请求
4. 验证数据格式

### 第五阶段：优化与完善

#### 1. 性能优化
1. 减少DOM操作
2. 优化数据处理
3. 添加错误处理

#### 2. 用户体验改进
1. 添加加载动画
2. 优化错误提示
3. 完善导出选项

#### 3. 发布准备
1. 代码审查
2. 文档完善
3. 打包发布

### 常见问题解决

1. 跨域问题：
   ```javascript
   // 在manifest.json中添加域名权限
   // 使用background script处理请求
   ```

2. 数据解析错误：
   ```javascript
   // 添加错误处理
   // 数据验证
   ```

3. 下载失败：
   ```javascript
   // 检查文件大小
   // 验证文件格式
   ```

### 开发技巧

1. 使用Chrome Storage Sync进行数据同步
2. 使用防抖处理频繁操作
3. 模块化组织代码
4. 使用ES6+特性提高代码质量

### 调试方法

1. 使用Firefox远程调试
2. 查看浏览器控制台
3. 使用网络面板分析请求
4. 断点调试JavaScript代码

## 贡献指南

欢迎提交Issue和Pull Request来改进这个项目。

## 许可证

MIT License

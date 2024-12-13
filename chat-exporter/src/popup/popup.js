document.addEventListener('DOMContentLoaded', () => {
  const exportBtn = document.getElementById('exportBtn');
  const formatSelect = document.getElementById('formatSelect');
  const statusDiv = document.getElementById('status');
  
  // 导出聊天记录
  exportBtn.addEventListener('click', async () => {
    try {
      console.log('开始导出操作...');
      statusDiv.textContent = '正在导出...';
      exportBtn.disabled = true;
      
      // 获取当前标签页
      console.log('开始获取标签页...');
      const tabs = await browser.tabs.query({active: true, currentWindow: true});
      if (!tabs || tabs.length === 0) {
        throw new Error('无法获取当前标签页');
      }
      console.log('当前标签页:', tabs[0]);
      
      // 检查URL是否匹配
      const tab = tabs[0];
      if (!tab.url || !tab.url.includes('tu-zi.com')) {
        throw new Error('请在tu-zi.com网站上使用此插件');
      }
      
      // 获取聊天记录
      console.log('准备发送消息到content script...');
      const chatHistory = await browser.tabs.sendMessage(tab.id, {type: 'GET_CHAT_HISTORY'});
      console.log('获取到的聊天记录:', chatHistory);
      
      if (!chatHistory || chatHistory.length === 0) {
        throw new Error('未找到聊天记录，请确保页面已加载完成');
      }

      let content;
      let fileExtension;
      const format = formatSelect.value;

      if (format === 'json') {
        // JSON格式
        content = JSON.stringify(chatHistory, null, 2);
        fileExtension = 'json';
      } else {
        // Markdown格式
        content = chatHistory.map(msg => {
          if (msg.type === 'user') {
            return `### 用户\n${msg.content}\n`;
          } else {
            return `### AI\n${msg.content}`;
          }
        }).join('\n\n');
        fileExtension = 'md';
      }
      
      // 创建下载链接
      console.log('准备下载文件...');
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const filename = `chat-history-${timestamp}.${fileExtension}`;
      
      // 使用传统下载方式
      const blob = new Blob([content], { 
        type: format === 'json' ? 'application/json' : 'text/markdown;charset=utf-8'
      });
      
      console.log('创建下载链接...');
      const a = document.createElement('a');
      const url = URL.createObjectURL(blob);
      a.href = url;
      a.download = filename;
      
      // 添加到文档并触发点击
      console.log('触发下载...');
      document.body.appendChild(a);
      a.click();
      
      // 清理
      console.log('清理临时元素...');
      setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }, 100);
      
      console.log('导出完成');
      statusDiv.textContent = '导出成功！';
      setTimeout(() => {
        statusDiv.textContent = '';
        exportBtn.disabled = false;
      }, 2000);
      
    } catch (error) {
      console.error('导出失败:', error);
      statusDiv.textContent = '导出失败: ' + error.message;
      exportBtn.disabled = false;
    }
  });
});

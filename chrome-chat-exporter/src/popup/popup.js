document.addEventListener('DOMContentLoaded', () => {
  const exportBtn = document.getElementById('exportBtn');
  const formatSelect = document.getElementById('formatSelect');
  const statusDiv = document.getElementById('status');
  
  // 导出聊天记录
  exportBtn.addEventListener('click', async () => {
    try {
      statusDiv.textContent = '正在导出...';
      exportBtn.disabled = true;
      
      // 获取当前标签页
      const [tab] = await chrome.tabs.query({active: true, currentWindow: true});
      
      // 检查URL是否匹配
      if (!tab.url || !tab.url.includes('tu-zi.com')) {
        throw new Error('请在tu-zi.com网站上使用此插件');
      }
      
      // 获取聊天记录
      const response = await chrome.tabs.sendMessage(tab.id, {type: 'GET_CHAT_HISTORY'});
      console.log('获取到的聊天记录:', response);
      
      if (!response || !response.length) {
        throw new Error('未找到聊天记录，请确保页面已加载完成');
      }

      let content;
      let fileExtension;
      const format = formatSelect.value;

      if (format === 'json') {
        // JSON格式
        content = JSON.stringify(response, null, 2);
        fileExtension = 'json';
      } else {
        // Markdown格式
        content = response.map(msg => {
          if (msg.type === 'user') {
            return `### 用户\n${msg.content}\n`;
          } else {
            return `### AI\n${msg.content}`;
          }
        }).join('\n\n');
        fileExtension = 'md';
      }
      
      // 创建下载链接
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const filename = `chat-history-${timestamp}.${fileExtension}`;
      
      // 创建下载链接
      const blob = new Blob([content], { 
        type: format === 'json' ? 'application/json' : 'text/markdown;charset=utf-8'
      });
      
      // 使用Chrome下载API
      const url = URL.createObjectURL(blob);
      chrome.downloads.download({
        url: url,
        filename: filename,
        saveAs: false
      });
      
      // 清理URL对象
      setTimeout(() => {
        URL.revokeObjectURL(url);
      }, 100);
      
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

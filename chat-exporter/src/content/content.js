// 内容脚本加载时的调试信息
console.log('Content script 已加载');

// 提取聊天记录
function extractChatHistory() {
  console.log('开始提取聊天记录...');
  const messages = [];
  
  try {
    // 查找所有消息元素
    const allMessages = document.querySelectorAll('.flex.w-full.flex-col.gap-1');
    
    allMessages.forEach(messageEl => {
      // 用户消息
      if (messageEl.classList.contains('items-end')) {
        const contentEl = messageEl.querySelector('.whitespace-pre-wrap');
        if (contentEl) {
          messages.push({
            content: contentEl.textContent.trim(),
            type: 'user'
          });
        }
      }
      // AI消息
      else {
        const contentEl = messageEl.querySelector('.markdown.prose');
        if (contentEl) {
          let markdown = '';
          
          // 如果包含表格，特殊处理
          const tables = contentEl.querySelectorAll('table');
          if (tables.length > 0) {
            // 先处理表格之前的内容
            const preTableText = contentEl.innerHTML.split('<table')[0]
              .replace(/<p>/g, '')
              .replace(/<\/p>/g, '\n\n')
              .replace(/<[^>]*>/g, '')
              .trim();
            
            markdown += preTableText + '\n\n';
            
            // 处理每个表格
            tables.forEach(table => {
              const rows = table.querySelectorAll('tr');
              const headers = Array.from(rows[0].querySelectorAll('th')).map(th => th.textContent.trim());
              
              // 添加表头
              markdown += '| ' + headers.join(' | ') + ' |\n';
              
              // 添加分隔行
              markdown += '|' + headers.map(() => '--------').join('|') + '|\n';
              
              // 添加数据行
              Array.from(rows).slice(1).forEach(row => {
                const cells = Array.from(row.querySelectorAll('td')).map(td => td.textContent.trim());
                markdown += '| ' + cells.join(' | ') + ' |\n';
              });
              
              markdown += '\n';
            });
            
            // 处理表格之后的内容
            const postTableText = contentEl.innerHTML.split('</table>').pop()
              .replace(/<p>/g, '')
              .replace(/<\/p>/g, '\n\n')
              .replace(/<[^>]*>/g, '')
              .trim();
            
            if (postTableText) {
              markdown += postTableText;
            }
          } else {
            // 如果没有表格，使用普通的处理方式
            markdown = contentEl.innerHTML
              .replace(/<p>/g, '')
              .replace(/<\/p>/g, '\n\n')
              .replace(/<h3>/g, '### ')
              .replace(/<\/h3>/g, '\n\n')
              .replace(/<strong>/g, '**')
              .replace(/<\/strong>/g, '**')
              .replace(/<code>/g, '`')
              .replace(/<\/code>/g, '`')
              .replace(/<ul>/g, '')
              .replace(/<\/ul>/g, '\n')
              .replace(/<li>/g, '- ')
              .replace(/<\/li>/g, '\n')
              .replace(/<[^>]*>/g, '')
              .replace(/\n\s*\n\s*\n/g, '\n\n')
              .trim();
          }

          messages.push({
            content: markdown,
            type: 'assistant'
          });
        }
      }
    });

    console.log('成功提取消息数:', messages.length);
    return messages;
    
  } catch (error) {
    console.error('提取聊天记录时出错:', error);
    return messages;
  }
}

// 监听来自popup的消息
browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('收到消息:', message);
  if (message.type === 'GET_CHAT_HISTORY') {
    console.log('开始处理GET_CHAT_HISTORY请求');
    const chatHistory = extractChatHistory();
    console.log('提取到的聊天记录:', chatHistory);
    sendResponse(chatHistory);
    return true; // 保持消息通道开放
  }
});

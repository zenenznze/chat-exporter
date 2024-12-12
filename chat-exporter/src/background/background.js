// 处理消息导出
browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('Background script received message:', message);
  
  switch (message.type) {
    case 'EXPORT_CHAT':
      handleExport(message.data);
      break;
    case 'SAVE_SETTINGS':
      saveSettings(message.data);
      break;
    case 'LOG':
      console.log('[Chat Exporter]', message.data);
      break;
    case 'ERROR':
      console.error('[Chat Exporter]', message.data);
      break;
  }
  return true;
});

// 监听web请求
browser.webRequest.onBeforeRequest.addListener(
  function(details) {
    // 这里可以添加请求拦截逻辑
    return { cancel: false };
  },
  { urls: ["<all_urls>"] },
  ["blocking"]
);

// 处理导出功能
async function handleExport(data) {
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: 'application/json'
  });
  
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const filename = `chat-export-${timestamp}.json`;
  
  browser.downloads.download({
    url: URL.createObjectURL(blob),
    filename: filename,
    saveAs: true
  });
}

// 保存设置
async function saveSettings(settings) {
  await browser.storage.local.set({ settings });
}

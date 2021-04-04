chrome.runtime.onInstalled.addListener(() => {
    console.log('Installed Application')

    chrome.alarms.create('refresh', {periodInMinutes: 1})
});

chrome.alarms.onAlarm.addListener((alarm) => {
  var cpuUsage = 0;
  var totalTime = 0;
  var occupiedTime = 0;
  chrome.system.cpu.getInfo(function(info){
    chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) { 
      if (changeInfo.status == 'complete') {
        for(i=0; i<info.processors.length; i++){
          var processor = info.processors[i];
          occupiedTime += (processor.usage.kernel + processor.usage.user);
          totalTime += processor.usage.total;
        };
        cpuUsage = (occupiedTime/totalTime);
        chrome.tabs.query({active:true, currentWindow:true}, function(tabs) {
          chrome.tabs.sendMessage(tabs[0].id, {info: info, usage: cpuUsage}, function(response) {
              console.log('Message has been sent successfully')
              if (!chrome.runtime.lastError) {
                  console.log(response.message)
              }
          });
        });
      }
    });
  });
});
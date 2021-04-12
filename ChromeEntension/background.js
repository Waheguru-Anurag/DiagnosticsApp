chrome.runtime.onInstalled.addListener(() => {
    console.log('Installed Application')
});

chrome.runtime.onMessageExternal.addListener(
  function(request, sender, sendResponse) {
    chrome.system.cpu.getInfo(function(info){
      var cpuUsage = 0;
      var totalTime = 0;
      var occupiedTime = 0;
      for(i=0; i<info.processors.length; i++){
        var processor = info.processors[i];
        occupiedTime += (processor.usage.kernel + processor.usage.user);
        totalTime += processor.usage.total;
      };
      cpuUsage = (occupiedTime/totalTime);
      sendResponse({numOfProcessors: info.numOfProcessors, modelName: info.modelName, usage: cpuUsage});
  });
});
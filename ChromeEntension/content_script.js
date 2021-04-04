console.log('Content Script is Active')

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log(sender.tab ?
                  "from a content script:" + sender.tab.url :
                  "from the extension");
        let element = document.getElementById('model_name_id');
        element.textContent = 'Model Name: ' + request.info.modelName;
        element = document.getElementById('number_processor_id');
        element.textContent = 'Number Of Processors: ' + request.info.numOfProcessors;
        element = document.getElementById('cpu_usage_id');
        element.textContent = 'CPU Usage: ' + (request.usage)*100 + '%';
        sendResponse({message: "received data"});
    }
);    
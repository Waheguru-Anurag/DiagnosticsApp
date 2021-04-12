var editorExtensionId = "kblachlmfeagplmacljnmiikbcpanbci";

var data = [{
    x: [],
    y: [],
    type: 'scatter'
}];

var layout = {
    title: 'CPU Utilization Chart',
    xaxis: {
      title: 'Time',
      type: 'date',
      tickformat: '%H:%M:%S'
    },
    yaxis: {
      title: 'Percent',
      tickformat: ',.0%',
      range: [0,1]  
    }
};

Plotly.newPlot(document.getElementById('chart'), data, layout);

var interval = setInterval(function(){
    chrome.runtime.sendMessage(editorExtensionId, {message: 'send data'},
    function(response) {
        console.log('received data');
        let element = document.getElementById('model_name_id');
        element.textContent = response.modelName;
        data = {
            x: [[new Date()]],
            y: [[response.usage]]
        };
        Plotly.extendTraces(document.getElementById('chart'), data, [0], 10);
    });
}, 1000);
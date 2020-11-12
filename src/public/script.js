var chart    = document.getElementById('chart').getContext('2d'),
gradient = chart.createLinearGradient(0, 0, 0, 450);
gradient.addColorStop(0, '#8100ccAA');
gradient.addColorStop(0.5, '#8100ccCC');
gradient.addColorStop(1, '#8100ccFF');


function get(callback) {
    let xmlHttp = new XMLHttpRequest();

    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(JSON.parse(xmlHttp.responseText));
    }

    xmlHttp.open( "GET", "http://localhost:8080/connection", true); 
    xmlHttp.send( null );
}

function getGraph(callback) {
    let xmlHttp = new XMLHttpRequest();

    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(JSON.parse(xmlHttp.responseText));
    }

    xmlHttp.open( "GET", "http://localhost:8080/graph", true); 
    xmlHttp.send( null );
}

function updateText(){
    get(function(result) {
        let counter = document.getElementById("num");
        counter.innerText = result.connections;
    });
}

function map_range(num, in_min, in_max, out_min, out_max) {
    return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
  }

// the dataset if from the past 24 hours
// index 0 -> date - 24 hours
// index length -> now
function time_from_dataset(data) {
    const day_in_sec = 24*60*60;
    return data.map((_, index) => {
        let seconds_ago = map_range(index, 0, data.length, day_in_sec, 0);
        let date = new Date(Date.now() - seconds_ago * 1000);
        return date.getHours() + ':' + date.getMinutes();
    })
}

function draw_graph(data) {
    var data  = {
    labels: time_from_dataset(data),
    datasets: [{
            label: 'Time',
            backgroundColor: gradient,
            pointBackgroundColor: 'white',
            borderWidth: 1,
            borderColor: '#781291',
            data: data
    }]
    };


    var options = {
        responsive: true,
        maintainAspectRatio: true,
        animation: {
            easing: 'easeInOutQuad',
            duration: 520
        },
        scales: {
            xAxes: [{
                display: false
            }],
            yAxes: [{
                display: false
            }]
        },
        elements: {
            line: {
                tension: 0.4
            }
        },
        legend: {
            display: false
        },
        point: {
            backgroundColor: 'white'
        },
        tooltips: {
            callbacks: {
            label: function(tooltipItem) {
                    return tooltipItem.yLabel;
            }
            }
        }
    };


    new Chart(chart, {
    type: 'line',
    data: data,
        options: options
    });
}

function updateGraph() {
    getGraph(function(result) {
        console.log(result.data);
        draw_graph(result.data);
    });
}


setInterval(
    () => {
        updateText();
    }, 1000
)

setInterval(
    () => {
        updateGraph();
    }, 1000 * 60 * 10
)

updateText();
updateGraph();

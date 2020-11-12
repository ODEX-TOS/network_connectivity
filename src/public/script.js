function get(callback) {
    let xmlHttp = new XMLHttpRequest();

    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(JSON.parse(xmlHttp.responseText));
    }

    xmlHttp.open( "GET", "http://localhost:8080/connection", true); 
    xmlHttp.send( null );
}


setInterval(
    () => {
        get(function(result) {
            let counter = document.getElementById("num");
            counter.innerText = result.connections;
        });
    }, 1000
)
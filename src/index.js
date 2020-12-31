const rateLimit = require("express-rate-limit");
const geoip = require('geoip-lite');

const helper = require("./helper.js");
let serve = require("./web.js");
let db = require("./data.js");


let app = serve.init();

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message:
    "This api endpoint should only be called from Network Manager"
});


app.use("/connectivity/", apiLimiter);

// check the connection from the browser
app.get('/connection', (_, res) => {
    db.get("connection", function(_, amount){
        db.get("graph", function(_, graph){
            res.send({
                payload: helper.users(amount, graph[graph.length - helper.dailyLength])
            });
        })
    });
});

app.get('/connection/raw', (_, res) => {
    db.get("connection", function(_, amount){
        db.get("graph", function(_, graph){
            res.send({
                payload: amount, 
                // we send the delta as well since we derive the current amount of users from the current requests vs the amount of requests yesterday
                delta: amount - graph[graph.length - helper.dailyLength]
            });
        })
    });
});

function increase_user_count(res) {
    db.inc("connection", function(_, _){
        res.set('content-type', 'text/plain');
        res.send("NetworkManager is online");
    });
}

// the old connectivity check from NetworkManager
app.get('/connectivity/check', (_, res) => {
    increase_user_count(res);
});

// the connectivity check from NetworkManager
app.get('/check_network_status.txt', (_, res) => {
    increase_user_count(res);
});

// the connectivity check from NetworkManager
app.get('/graph', (_, res) => {
    db.get("graph", function(_, graph){
        res.send({
            payload: helper.users_from_arr(graph),
            dailyLength: helper.dailyLength
        });
    })
});

app.get('/graph/raw', (_, res) => {
    db.get("graph", function(_, graph){
        res.send({
            payload: graph,
            dailyLength: helper.dailyLength
        });
    })
});

app.get("/timezone", (req, res) => {
    let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    let geo = geoip.lookup(ip);

    // the line below should only be triggered when no publi ip is supplied eg 127.0.0.1 or 192.168.1.x
    let timezone = "Europe/Brussels";
    if (geo && geo.timezone) {
        timezone = geo.timezone
    }

    console.log("Found timezone for user: " + timezone);
    res.send(timezone);
})

// add the current connection value to the graph array
db.add("graph", "connection", helper.length);

// update the graph every hour
setInterval(() => {
    db.add("graph", "connection", helper.length);
}, helper.updateInMs);

// start listening for webserver events
serve.listen();

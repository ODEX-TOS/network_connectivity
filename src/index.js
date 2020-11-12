const rateLimit = require("express-rate-limit");
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
        res.send({
            payload: helper.users(amount)
        });
    });
});

app.get('/connection/raw', (_, res) => {
    db.get("connection", function(_, amount){
        res.send({
            payload: amount
        });
    });
});

// the connectivity check from NetworkManager
app.get('/connectivity/check', (_, res) => {
    db.inc("connection", function(_, check){
        res.send({
            payload: check
        });
    })
});

// the connectivity check from NetworkManager
app.get('/graph', (_, res) => {
    db.get("graph", function(_, graph){
        res.send({
            payload: helper.users_from_arr(graph)
        });
    })
});

app.get('/graph/raw', (_, res) => {
    db.get("graph", function(_, graph){
        res.send({
            payload: graph
        });
    })
});

// add the current connection value to the graph array
db.add("graph", "connection", 24);

// update the graph every hour
setInterval(() => {
    db.add("graph", "connection", 24);
}, 60 * 60 * 1000);

// start listening for webserver events
serve.listen();
const rateLimit = require("express-rate-limit");

let serve = require("./web.js");
let db = require("./data.js");

let app = serve.init();

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message:
    "This api endpoint should only be called from Network Manager"
});


// Find the amount of user from the NetworkManager requests
// Each day 280 calls get made per host
// Most devices usually run for less than a day (laptops for half a day)
// Looking at the stats we average around 170 calls per day
function users(amount) {
    let result = Math.ceil(amount / 170);
    return result
}

app.use("/connectivity/", apiLimiter);

// check the connection from the browser
app.get('/connection', (_, res) => {
    db.get("connection", function(_, amount){
        res.send({
            connections: users(amount)
        });
    });
});

// the connectivity check from NetworkManager
app.get('/connectivity/check', (_, res) => {
    db.inc("connection", function(_, check){
        res.send({
            result: check
        });
    })
});

// the connectivity check from NetworkManager
app.get('/graph', (_, res) => {
    db.get("graph", function(_, graph){
        res.send({
            data: graph
        });
    })
});

// add the current connection value to the graph array
db.add("graph", "connection", 144);

setInterval(() => {
    db.add("graph", "connection", 144);
}, 10 * 60 * 1000);

// start listening for webserver events
serve.listen();
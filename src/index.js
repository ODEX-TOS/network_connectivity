const rateLimit = require("express-rate-limit");

let serve = require("./web.js");
let db = require("./data.js");

let app = serve.init();

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100000000, // limit each IP to 100 requests per windowMs
    message:
    "This api endpoint should only be called from Network Manager"
  });

app.use("/connectivity/", apiLimiter);

// check the connection from the browser
app.get('/connection', (_, res) => {
    db.get("connection", function(_, amount){
        res.send({
            connections: amount
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

// start listening for webserver events
serve.listen();
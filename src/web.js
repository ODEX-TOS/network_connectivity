const express = require('express');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';
let app;

function init() {
    app = express();

    // serve html,css and js
    app.use(express.static('public'))
    return app;
}

function listen(){
    app.listen(PORT, HOST);
    console.log(`Running on http://${HOST}:${PORT}`);    
}

module.exports = {
    init,
    listen
}
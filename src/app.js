const express = require("express");
const routes = require("./routes");

class App {
    constructor() {
        this.server = express();

        this.middlewares();
        this.routes();
    }

    middlewares() {
        // this.server.use(express.json());
        this.server.use(express.static(__dirname + '/../public'));
    }

    routes() {
        this.server.use(routes);
    }
}

module.exports = new App().server;
const { Router } = require("express");
const routes = new Router();
const path = require("path");

const publicPath = path.resolve(__dirname + '/../public');

routes.get("/", (req, res) => {
    return res.json({ message: "Aqui terá uma landing page" });
});

routes.get('/webinars', (req, res) => {
    res.sendFile(publicPath + '/views/webinar/index.html')
});

routes.get('/admins', (req, res) => {
    res.sendFile(__dirname + '/views/admin/index.html')
});

module.exports = routes;
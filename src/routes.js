const { Router } = require("express");
const routes = new Router();
const path = require("path");
const UserController = require('./database/controllers/UserContoller');

const publicPath = path.resolve(__dirname + '/../public');

routes.get("/", (req, res) => {
    return res.json({ message: "Aqui terá uma landing page" });
});

routes.get('/webinars', (req, res) => {
    res.sendFile(publicPath + '/views/webinar/index.html')
});

routes.get('/admin', (req, res) => {
    res.sendFile(publicPath + '/views/admin/index.html')
});

routes.get('/users', UserController.index)
routes.post('/users', UserController.store)
routes.put('/users/:user_id', UserController.update)
routes.delete('/users/:user_id', UserController.delete)
routes.post('/users/login', UserController.login)

module.exports = routes;
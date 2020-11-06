const { Router } = require("express"),
    router = new Router(), { param, validationResult } = require('express-validator'),
    path = require("path"),
    EventController = require("./controllers/EventController"),
    UserController = require('./controllers/UserContoller'),
    authMiddleware = require('./middlewares/auth');

const
// publicPath = path.resolve(__dirname + '/../public'),
    viewPath = path.resolve(__dirname + '/../src/views');

router.get("/", (req, res) => {
    return res.json({ message: "Aqui terá uma landing page" });
});

router.get('/webinars', (rea, res) => { res.redirect('/') });
router.get('/webinars/:id', [
    param('id')
    .isInt().withMessage('O código do evento deve ser um número válido!')
], (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // return res.status(400).json({ errors: errors.array() });
        return res.sendFile(viewPath + '/admin/index.html')
    }

    res.sendFile(viewPath + '/webinar/index.html')
});

router.get('/admin', (req, res) => {
    res.sendFile(viewPath + '/admin/index.html')
});

// users
// router.get('/users', authMiddleware, UserController.index);
router.get('/users', UserController.index);
router.post('/users', UserController.store);
router.put('/users/:user_id', UserController.update);
router.delete('/users/:user_id', UserController.delete);
router.post('/users/login', UserController.login);

// router.use(authMiddleware);

// events
router.get('/users/:user_id/events', EventController.index);
router.post('/users/:user_id/events', EventController.store);
router.put('/users/:id/event', EventController.update);
router.delete('/users/:id/event', EventController.delete);

// router.param('id', (req, res, next, eventId) => {
//     console.log('o id do evento é ' + eventId);
//     req.eventId = eventId;
//     if (eventId == 1) {
//         next();
//     } else {
//         next('route');
//         // res.json({ "erro": "Identificador do evento inválido!" });
//     }
// });

module.exports = router;
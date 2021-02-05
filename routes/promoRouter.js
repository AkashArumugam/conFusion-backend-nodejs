const express = require('express')
const bodyParser = require('body-parser');

const promoRouter = express.Router();

promoRouter.use(bodyParser.json());

promoRouter.route('/')
.get((req, res, next) => {
    res.end('Getting all promotions.');
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end('Can\'t create all promotions.');
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('Can\'t update all promotions');
})
.delete((req, res, next) => {
    res.end('Deleted all promotions.');
});

promoRouter.route('/:promoId')
.get((req, res, next) => {
    res.end('Getting promotion ' + req.params.promoId + '.');
})
.post((req, res, next) => {
    res.end('Created promotion ' + req.params.promoId + ', ' + req.body.name + ', ' + req.body.description + '.');
})
.put((req, res, next) => {
    res.end('Updated promotion ' + req.params.promoId + ', ' + req.body.name + ', ' + req.body.description + '.');
})
.delete((req, res, next) => {
    res.end('Deleted promotion ' + req.params.promoId + '.');
});

module.exports = promoRouter;
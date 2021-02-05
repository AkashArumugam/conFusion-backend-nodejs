const express = require('express')
const bodyParser = require('body-parser');

const dishRouter = express.Router();

dishRouter.use(bodyParser.json());

dishRouter.route('/')
.get((req, res, next) => {
    res.end('Getting all dishes.');
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end('Can\'t create all dishes.');
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('Can\'t update all dishes');
})
.delete((req, res, next) => {
    res.end('Deleted all dishes.');
});

dishRouter.route('/:dishId')
.get((req, res, next) => {
    res.end('Getting dish ' + req.params.dishId + '.');
})
.post((req, res, next) => {
    res.end('Created dish ' + req.params.dishId + ', ' + req.body.name + ', ' + req.body.description + '.');
})
.put((req, res, next) => {
    res.end('Updated dish ' + req.params.dishId + ', ' + req.body.name + ', ' + req.body.description + '.');
})
.delete((req, res, next) => {
    res.end('Deleted dish ' + req.params.dishId + '.');
});

module.exports = dishRouter;
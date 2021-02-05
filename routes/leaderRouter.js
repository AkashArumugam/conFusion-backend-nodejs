const express = require('express')
const bodyParser = require('body-parser');

const leaderRouter = express.Router();

leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
.get((req, res, next) => {
    res.end('Getting all leaders.');
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end('Can\'t create all leaders.');
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('Can\'t update all leaders');
})
.delete((req, res, next) => {
    res.end('Deleted all leaders.');
});

leaderRouter.route('/:leaderId')
.get((req, res, next) => {
    res.end('Getting leader ' + req.params.leaderId + '.');
})
.post((req, res, next) => {
    res.end('Created leader ' + req.params.leaderId + ', ' + req.body.name + ', ' + req.body.description + '.');
})
.put((req, res, next) => {
    res.end('Updated leader ' + req.params.leaderId + ', ' + req.body.name + ', ' + req.body.description + '.');
})
.delete((req, res, next) => {
    res.end('Deleted leader ' + req.params.leaderId + '.');
});

module.exports = leaderRouter;
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var User = require('./models/user');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var jwt = require('jsonwebtoken');

var config = require('./config');

exports.local = passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

exports.getToken = (user) => {
    return jwt.sign(user, config.secretKey, {expiresIn: 3600});
};

var cookieExtractor = function(req) {
    var token = null;
    if (req && req.cookies) token = req.cookies['session-id'];
    return token;
  };

var opts = {};
//opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.jwtFromRequest = cookieExtractor;
opts.secretOrKey = config.secretKey;

exports.jwtPassport = passport.use(new JwtStrategy(opts,
    (jwt_payload, done) => {
        console.log("JWT payload: ", jwt_payload);
        User.findOne({_id: jwt_payload._id}, (err, user) => {
            if (err) {
                return done(err, false);
            }
            else if (user) {
                console.log(user);
                return done(null, user);
            }
            else {
                return done(null, false);
            }
        });
    }));

exports.verifyUser = passport.authenticate('jwt', {session: false});

exports.verifyAdmin = (req, res, next) => {
    if(req.user) {
        if(req.user.admin === true) {
            next();
        } else {
            var err = new Error("Not an admin");
            err.status = 403;
            next(err);
        }
    } else {
        var err = new Error("User not found");
        err.status = 401;
        next(err);
    }
};

exports.verifyOrdinaryUser = (req, res, next) => {
    if(req.user) {
        if(req.user.admin === false) {
            next();
        } else {
            var err = new Error("Admin not allowed");
            err.status = 403;
            next(err);
        }
    } else {
        var err = new Error("User not found");
        err.status = 401;
        next(err);
    }
};
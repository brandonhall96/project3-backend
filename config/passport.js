require('dotenv').config();
const { Strategy, ExtractJwt } = require('passport-jwt');

//models 
const { User } = require('../models');

// object made of strategy
const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
}
//create strategy
const JWT_STRAT = new Strategy(options, async(jwtPayload, done) => {
    //look for user by id
    try {
        const user = await User.findById(jwtPayload.id);

        if (user) {
            return done(null, user);
        }
        else{
            return done(null, false);
        }
    } catch (error) {
        console.log('error inside of passport config', error)
        console.log(errors)
        
    }

})

//export a function that will use strat
module.exports = async(passport) => {
    passport.use(JWT_STRAT)
}
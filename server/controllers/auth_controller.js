const users = require('../models/users')
let id = 1;

module.exports = {
    login: (req,res,next) => {
        let username = req.body.username;
        let password = req.body.password;

        const user = users.find(user => user.username === username && user.password ===password)

        if(user) {
            session.user.username = username
            res.status(200).send(req.session.user)
        } else {
            res.status(500).send('Unauthorized')
        }
    },

    register: (req,res,next) => {
        let username = req.body.username
        let password = req.body.password

        users.push({id,username,password});
        id++

        req.session.user.username = username;

        res.status(200).send(req.session.user)
    },

    signout: (req,res,next) => {
        req.session.destroy();
        res.status(200).send(req.session)
    },

    getUser: (req,res,next) => {
        res.status(200).send(req.session.user)
    },
}
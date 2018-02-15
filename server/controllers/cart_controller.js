const swag = require('../models/swag')

module.exports = {
    add: (req,res,next) => {
        let id = req.query.id
        let indexOfCartItem = req.session.user.cart.findIndex(item => item.id === id)
        if(indexOfCartItem === -1) {
            let swagToAdd = swag.find(swag => swag.id === id)

            req.session.user.cart.push(swagToAdd)
            req.session.user.total += swagToAdd.price
        }
        res.status(200).send(req.session.user)
    },

    delete: (req,res,next) => {
        let id = req.query.id
        let indexOfCartItem = req.session.user.cart.findIndex(item => item.id === id)
        if(indexOfCartItem !== -1) {
            let swagToRemove = swag.find(swag => swag.id === id)

            req.session.user.cart.splice(indexOfCartItem,1)
            req.session.user.total -= swagToRemove.price
        }
        res.status(200).send(req.session.user)
        
    },

    checkout: (req,res,next) => {
        req.session.user.cart = [];
        req.session.user.total = 0;
        res.status(200).send(req.session.user);
    }
}
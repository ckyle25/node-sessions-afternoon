const swag = require('../models/swag')

module.exports = {
    search: (req,res,next) => {
        let category = req.query.category;

        if(!category) {
            res.status(200).send(swag)
        } else {
            res.status(200).send(swag.filter(item => item.category === category))
        }
    }
}
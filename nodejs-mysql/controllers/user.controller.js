const Validator = require('fastest-validator');
const bcryptjs = require('bcryptjs');
const jsonWebToken = require('jsonwebtoken');
const models = require('../models');

function register(req, res) {

    models.User.findOne({ where: { email: req.body.email } }).then(result => {

        if (result) {
            res.status(409).json({
                message: 'lets try your email or log in'
            })
        } else {
            //salt = random string
            bcryptjs.genSalt(10, function(err, salt) {
                bcryptjs.hash(req.body.password, salt, function(err, hash) {
                    const user = {
                        name: req.body.name,
                        email: req.body.email,
                        password: hash
                    }
                    models.User.create(user).then(result => {
                        res.status(201).json({
                            message: 'welcome'

                        })
                    }).catch(error => {
                        res.status(500).json({
                            message: 'no welcome'
                        })
                    });
                })
            })

        }

    }).catch(error => {

        res.status(500).json({
            message: 'no welcome'
        })

    })
}

function login(req, res) {
    models.User.findOne({
        where: {
            email: req.body.email
        }
    }).then(user => {
        if (user === null) {
            res.status(401).json({
                message: 'we dont know you'
            });
        } else {
            bcryptjs.compate(req.body.password, user.password, function(err, result) {
                if (result) {
                    const token = jsonWebToken.sign({
                        email: user.email,
                        userId: user.id
                    }, 'process.env.jsonWebToken_KEY', function(err, token) {

                        res.status(200).json({
                            message: 'hello bro',
                            token: token
                        })

                    });

                } else {
                    res.status(500).json({
                        message: 'no welcome'
                    })
                }
            });
        }
    }).catch(error => {
        res.status(500).json({
            message: 'no welcome'
        })
    })


}



module.exports = {
    register: register,
    login: login

}
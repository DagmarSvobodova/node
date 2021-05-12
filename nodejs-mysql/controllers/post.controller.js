const Validator = require('fastest-validator');
const models = require('../models');



function index(req, res) {
    models.Post.findAll().then(
        result => {
            res.status(200).json(result);
        }
    ).catch(error => {
        res.status(500).json({
            message: 'Error bro'

        })

    });
}

function show(req, res) {
    const id = req.params.id;

    models.Post.findByPk(id).then(
        result => {
            if (result) {
                res.status(200).json(result);
            } else {
                res.status(404).json({
                    message: 'not found'
                })
            }
        }).catch(error => {
        res.status(500).json({
            message: 'Error bro'

        })

        ;
    })
}



function save(req, res) {
    const post = {
        title: req.body.title,
        content: req.body.content,
        imageUrl: req.body.image_url,
        categoryId: req.body.category_id,
        userId: req.userData.userId
    }

    const schema = {
        title: {
            type: 'string',
            optional: false,
            max: '100'
        },
        content: {
            type: 'string',
            optional: false,
            max: '500'
        },
        categoryId: {
            type: 'number',
            optional: false
        }
    }

    const validation = new Validator();
    const validationResponse = validation.validate(post, schema);


    if (!validationResponse) {
        return res.status(400).json({
            message: 'Error bro',
            error: validationResponse
        })
    }

    models.Category.findByPk(req.body.category_id).then(result => {
        if (result !== null) {
            models.Post.create(post).then(
                result => {
                    res.status(201).json({
                        message: 'Post created succesfully',
                        post: result
                    })
                }
            ).catch(error => {
                res.status(500).json({
                    message: 'Error bro',
                    error: error
                });

            });
        } else {
            res.status(400).json({
                message: 'Error bro',

            });
        }
    })


}

function update(req, res) {

    const id = req.params.id;
    const userId = req.userData.userId;
    const updatedPost = {
        title: req.body.title,
        content: req.body.content,
        imageUrl: req.body.image_url,
        categoryId: req.body.category_id,
    }
    const schema = {
        title: {
            type: 'string',
            optional: false,
            max: '100'
        },
        content: {
            type: 'string',
            optional: false,
            max: '500'
        },
        categoryId: {
            type: 'number',
            optional: false
        }
    }

    const validation = new Validator();
    const validationResponse = validation.validate(updatedPost, schema);


    if (!validationResponse) {
        return res.status(400).json({
            message: 'Error bro',
            error: validationResponse
        })
    }
    models.Category.findByPk(req.body.category_id).then(result => {
        if (result !== null) {
            models.Post.update(updatedPost, { where: { id: id, userId: userId } }).then(
                result => {
                    res.status(200).json({
                        message: 'Post updated succesfully',
                        post: updatedPost
                    })
                }
            ).catch(error => {
                res.status(500).json({
                    message: 'Error bro',
                    error: error
                })

            });
        } else {
            res.status(400).json({
                message: 'Error bro',

            });
        }
    })


}

function destroy(req, res) {
    const id = req.params.id;
    const userId = req.userData.userId;

    models.Post.destroy({ where: { id: id, userId: userId } }).then(
        result => {
            res.status(200).json({
                message: 'This post is not survival.'
            })
        }
    ).catch(error => {
        res.status(500).json({
            message: 'Error bro',
            error: error
        })

    });
}



module.exports = {
    save: save,
    show: show,
    index: index,
    update: update,
    destroy: destroy
}
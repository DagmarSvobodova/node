const fetch = require('node-fetch');
const Validator = require('fastest-validator');


function show(req, res) {

    let response

    return (fetch('https://ralph.motionlab.io/api/interviewInfo?apiKey=8743f41d-98c6-4578-9d7b-611af96a16ba', {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
                'Authorization': 'Bearer 8743f41d-98c6-4578-9d7b-611af96a16ba'
            },
        })
        .then(res => res.json())
        .then(json => {
            response = json
            console.log('*** result ***', response);
            res.status(200).json(response);
        }))

}

function index(req, res) {


    const post = {

        email: req.body.email,
        name: req.body.name,
        token: req.headers.authorization

    }
    console.log(post)

    const schema = {
        email: {
            type: 'string',
            optional: false,
            max: '100'
        },
        name: {
            type: 'string',
            optional: false,
            max: '100'
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


    const body = {
        email: post.email,
        name: post.name
    }
    console.log(body)
    const headerAuth = post.token


    fetch('https://ralph.motionlab.io/api/interviewTest', {
            method: 'post',
            body: JSON.stringify(body),
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
                'Authorization': headerAuth
            },
        })
        .then(res => res.json())
        .then(json => {
            response = json
            console.log('*** result ***', response);
            res.status(200).json(response);
        });

    // console.log(req.headers)
}



module.exports = {
    show: show,
    index: index

}
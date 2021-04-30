const axios = require('axios');

function show(req, res) {
    const id = req.params.id;

    axios.get(`https://ghibliapi.herokuapp.com/films/${id}`).then(response => {
            console.log(response.data.url);
            console.log(response.data);
            res.status(200).json({
                message: 'hello',
                content: response.data,
                response: response
            });
            if (response.data.species) {
                axios.get(response.data.species).then(response => {
                        res.status(200).json(response);
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        })
        .catch(error => {
            console.log(error);
        });


}



function index() {
    axios.get('https://ghibliapi.herokuapp.com/films')
        .then(response => {
            console.log(response.data.url);
            console.log(response.data);
            res.status(200).json({
                message: 'hello',
                response: response
            });
        })
        .catch(error => {
            console.log(error);
        });

}

module.exports = {
    show: show,
    index: index

}
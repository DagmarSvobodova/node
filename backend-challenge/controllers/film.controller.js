const axios = require('axios');

function show(req, res) {
    const id = req.params.id;

    return axios.get(`https://ghibliapi.herokuapp.com/films/${id}`).then(response => {
        console.log(response.data.url);
        console.log(response.data);
        const film = response.data;
        // res.status(200).json({
        //     message: 'hello',
        //     content: response.data,
        //     response: response
        // });
        return Promise.all(film.species.map(specie =>
                axios.get(specie).then(s => s.data)))
            .then(species => ({
                ...film,
                species,
            }))
            .catch(error => {
                console.log(error);
            });

    }).then(result => {
        console.log('*** result ***', result);
        res.status(200).json(result);
    });
}

function index(req, res) {
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
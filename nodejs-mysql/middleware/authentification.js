const jsonWebToken = require('jsonwebtoken');

function checkAuth(req, res, next) {
    try {
        const token = req.headers.authorisation.split(' ')[1]; //split cause: Bearer @#$@#$SAKJRFS!@##@$@
        const decodedToken = jsonWebToken.verify(token, jsonWebToken_KEY);
        req.userData = decodedToken;
        next();
    } catch (error) {
        return res.status(401).json({
            'message': "no!",
            'error': error
        })
    }
}

module.exports = {
    checkAuth: checkAuth
}
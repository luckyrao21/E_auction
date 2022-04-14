const jwt = require('jsonwebtoken');

exports.verifyToken = (request, response, next) => {
    try {
        // console.log(request.headers.authorization);
        if (!request.headers.authorization)
            return response.status(200).jscon({authorized:'Unauthorized Request.....'});
        if (request.headers.authorization == null)
            return response.status(200).send({authorized:'Unauthorized Request.....'});

        let token = request.headers.authorization.split(" ")[1]
        let payload = jwt.verify(token, 'giugifsyjhsadgjbjfbbdsfjbjbk');

        next();
    }
    catch(err){
        // console.log(err);
        return response.status(200).send({authorized:'Unauthorized Request.....'});
    }
}
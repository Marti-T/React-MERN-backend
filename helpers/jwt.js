const jwt = require('jsonwebtoken');

const generarJWT = ( uid, name ) => {

    // Promise recibe un callback un resolve y reject
    // resolve si está correcto y reject si hay un error
    return new Promise( (resolve, reject) => {

        const payload = { uid, name };

        // SECRET_JWT_SEED es la variable que está en el archivo .env
        // que es la palabra clave para el token
        // con el sign hacemos la firma del token
        jwt.sign( payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '2h' // El token va a expirar en 2h, luego ya no servirá
        }, (err, token) => {

            if (err) {
                console.log(err);
                reject('No se pudo generar el token');
            }

            resolve( token );

        })

    })

}





module.exports = {
    generarJWT
}
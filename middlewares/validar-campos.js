const { response } = require('express');
const { validationResult } = require('express-validator');

// El next es un callback
// El next se va a llamar si todo está correcto
const validarCampos = (req, res = response, next) => { 

    // Manejo de errores
    const errors = validationResult( req );
    console.log(errors);
    if ( !errors.isEmpty() ) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        });
    }

    next();
}


module.exports = {
    validarCampos
}
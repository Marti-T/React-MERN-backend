const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const { generarJWT } = require('../helpers/jwt');

const crearUsuario = async( req, res = response ) => { 

    //console.log(req.body);

    //const { name, email, password } = req.body;
    const { email, password } = req.body;

    try {
        // Miramos en la base de datos si hay una usuario con este email
        let usuario = await Usuario.findOne({ email }); 

        if ( usuario ) {
            return res.status(400).json({
                ok: false,
                msg: 'Un usuario ya existe con ese correo'
            });

        }

        usuario = new Usuario( req.body );

        // Encriptar contraseña bcrypt
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );


        // Para grabar en la base de datos
        await usuario.save();

        // Generar nuestro JWT Json Web Token
        const token = await generarJWT( usuario.id, usuario.name );


        // if ( name.length < 5) {
        //     // Regresamos un error 400 porque no debería grabarse nada si no se cumple la condición
        //     // el return es importante porque el res solo se puede ejecutar una vez
        //     // si ejecutamos res más de una vez aparentemente no vamos a ver el error
        //     // pero si lo hay y en la consola nos dará un error del header
        //     return res.status(400).json({ 
        //         ok: false,
        //         msg: 'El nombre debe de ser de 5 letras'
        //     })
        // }



        //return res.json({
        // Como es el último no hace falta poner el return para que si hay el error salga
        // Si todo lo hace bien ponemos el status 201
        res.status(201).json({
            ok: true,
            //msg: 'registro',
            // name,
            // email,
            // password
            uid: usuario.id,
            name: usuario.name,
            token: token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
        
    }
    

}


const loginUsuario = async( req, res = response ) => { 

    const { email, password } = req.body;

    try {

        const usuario = await Usuario.findOne({ email }); 

        if ( !usuario ) {
            return res.status(400).json({
                ok: false,
                msg: 'Un usuario no existe con ese email'
            });
        }

        // Confirmar los passwords
        // El primer password lo va a obtener password del usuario que acaba de escribir en la petición
        // con el password ques está almacenado en la base de datos usuario.password
        // y el validPassword va a regresar un true o un false
        const validPassword = bcrypt.compareSync( password, usuario.password );

        if ( !validPassword ) {
            res.status(400).json({
                ok: false,
                msg: 'Password incorrecto'
            });
        }

        // Generar nuestro JWT Json Web Token
        const token = await generarJWT( usuario.id, usuario.name );


        res.json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        });

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }

    // res.json({
    //     ok: true,
    //     msg: 'login',
    //     email,
    //     password
    // });
    
}


const revalidarToken = async( req, res = response ) => { 

    //const uid = req.uid
    //const name = req.name

    const { uid, name } = req;

    // generar un nuevo JWT y retornarlo en esta petición
    const token = await generarJWT( uid, name );


    res.json({
        ok: true,
        //uid,
        //name,
        token
        //msg: 'renew'
    });

}



module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}
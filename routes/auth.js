/*
    Rutas de Usuarios / Auth
    host + /api/auth (localhost:4000/api/auth)
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();



router.post(
    '/new', 
    [ // middlewers
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe de ser de 6 caracteres').isLength({ min: 6 }),
        validarCampos
    ],
    crearUsuario
    ); // localhost:4000/api/auth/new en POST Postman

router.post(
    '/', 
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe de ser de 6 caracteres').isLength({ min: 6 }),
        validarCampos
    ],
    loginUsuario
); // localhost:4000/api/auth

// Esto sirve por ejemplo si el usuario cierra el navegador pero aún no han pasado las 2 horas
// y vuelve a entrar pero no han pasado las 2 horas seguirá navegando, pero vamos a generar otro
// para que así pueda estar autenticado otras 2 horas esta es la idea de esta ruta /renew 
router.get('/renew', validarJWT, revalidarToken); // localhost:4000/api/auth/renew en GET


module.exports = router;
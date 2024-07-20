// CRUD
/*
    Event Routes
    /api/events
*/

const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');

const { isDate } = require('../helpers/isDate');

const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

// Todas tienen que pasar por la validación de JWT
// Si lo ponemos así, todas las peticiones que se encuentre más abajo
// va a tener su token, van a pasar por validarJWT
// Si queremos que por ejemplo si queremos que router.get('/', getEventos); sea público 
// el router.use( validarJWT ); debería ir debajo, quedaría así:
// router.get('/', getEventos);
// router.use( validarJWT );
router.use( validarJWT );

// Obtener eventos (controllers/events.js)
router.get('/', getEventos);


// Crear un nuevo evento
router.post(
    '/', 
    [
        check('title', 'El título es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom( isDate ),
        check('end', 'Fecha de finalización es obligatoria').custom( isDate ),
        validarCampos
    ],
    crearEvento
);


// Actualizar evento
router.put('/:id', actualizarEvento);


// Borrar evento
router.delete('/:id', eliminarEvento);


module.exports = router;
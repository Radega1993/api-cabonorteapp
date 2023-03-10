/*
    Rutas de usuarios
    host + /api/auth
*/

const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();
const {validarJWT} = require('../middlewares/validar-jwt')

const { crearUsuario, loginUsuario, revalidarToken, getUserInfo } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');

router.post(
    '/new',
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe de ser de 6 caracteres').isLength({ min: 6 }),
        validarCampos
    ],
    crearUsuario 
);

router.post(
    '/',
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe de ser de 6 caracteres').isLength({ min: 6 }),
        validarCampos
    ],
    loginUsuario
);

router.get('/renew', validarJWT, revalidarToken );

router.get('/user/:id', validarJWT, getUserInfo );

module.exports = router;
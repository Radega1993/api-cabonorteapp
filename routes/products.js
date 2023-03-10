/*
    Product Routes
    /api/products
*/

const {Router} = require('express');
const { getProductos, crearProductos, actualizarProductos, eliminarProductos } = require('../controllers/products');
const {validarJWT} = require('../middlewares/validar-jwt');

const router = Router();


router.get('/', getProductos );

router.post('/', crearProductos );

router.put('/:id', validarJWT, actualizarProductos );

router.delete('/', validarJWT, eliminarProductos );

module.exports= router;

const { response } = require('express');
const Producto = require('../models/Product');

// get productos
const getProductos = async(req, res = response) => {

  const productos = await Producto.find();

  res.json({
    ok: true,
    productos
  })
}

// Creat productos
const crearProductos = async(req, res = response) => {
 
    try {
    const productSave = new Producto( req.body );
    await productSave.save();
      res.json({
        ok: true,
        productSave
      });
  } catch (e) {
    console.log(e);
    res.status(500).json({
        ok: false,
        msg: 'Hable con el administrador'
    })
  }
}
  
  // actualizar productos
  const actualizarProductos = async(req, res = response) => {

    const productId = req.params.id;

    try {
      
        const producto = Producto.findById(productId);

        if (!producto) {
            res.status(404).json({
                ok:false,
                msg: 'el producto no existe'
            })
        }

        const nuevoProducto = {
            ...req.body
        }

        const productoActualizado = await Producto.findByIdAndUpdate(productId, nuevoProducto, {new: true});
        
        res.json({
            ok: true,
            productoActualizado
          });

    } catch (e) {
        console.log(e);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
  }

  // eliminar productos
  const eliminarProductos = async(req, res = response) => {

    const productId = req.params.id;

    try {
      
        const producto = Producto.findById(productId);

        if (!producto) {
            res.status(404).json({
                ok:false,
                msg: 'el producto no existe'
            })
        }


        await Producto.findByIdAndDelete(productId);
        
        res.json({ ok: true });

    } catch (e) {
        console.log(e);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
    
  }

module.exports = {
    getProductos,
    crearProductos,
    actualizarProductos, 
    eliminarProductos,
  }
  
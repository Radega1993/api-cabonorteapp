const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const { generarJWT } = require('../helpers/jwt')
const { validationResult } = require('express-validator');

const EMAIL_ALREADY_EXISTS_MSG = 'El usuario ya existe con ese correo';


const crearUsuario = async (req, res) => {
    // Validar formulario
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ ok: false, errors: errors.array() });
    }
  
    try {
      const {
        name,
        surname,
        email,
        password,
        telefono,
        via,
        calle,
        numero,
        escalera,
        planta,
        puerta,
        poblacion,
        pais,
      } = req.body;
  
      // Verificar si el usuario ya existe
      const existingUser = await Usuario.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ ok: false, msg: EMAIL_ALREADY_EXISTS_MSG });
      }
  
      // Encriptar contraseña
      const salt = bcrypt.genSaltSync();
      const hashedPassword = bcrypt.hashSync(password, salt);
  
      // Crear usuario en MongoDB
      const usuario = await new Usuario({
        name,
        surname,
        email,
        password: hashedPassword,
        telefono,
        via,
        calle,
        numero,
        escalera,
        planta,
        puerta,
        poblacion,
        pais,
      }).save();
  
      // Generar JWT
      const token = await generarJWT(usuario.id, usuario.name);
  
      // Enviar respuesta al cliente
      res.status(201).json({
        ok: true,
        uid: usuario.id,
        name: usuario.name,
        token,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        ok: false,
        msg: 'Por favor hable con el administrador',
      });
    }
  };

const loginUsuario = async(req, res = response) => {

    const { email, password } = req.body;

    try {
        let usuario = await Usuario.findOne({ email });
        
        if ( !usuario ) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario o contraseña no correcto'
            });
        }

        const validPassword = bcrypt.compareSync(password, usuario.password)

        if ( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario o contraseña no correcto'
            });
        }

        // Generar JWT
        const token = await generarJWT(usuario.id, usuario.name)

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
            msg: 'Por favor hable con el administrador',
        });
    }

    
}

const revalidarToken = async(req, res = response) => {

    const uid = req.uid;
    const name = req.name

    // Generar JWT
    const token = await generarJWT(uid, name)


    res.json({
        ok: true,
        uid,
        name,
        token
    })
}

const getUserInfo = async(req, res = response) => {

    const uid = req.uid;


    let usuario = await Usuario.findById( uid );
        
    if ( !usuario ) {
        return res.status(400).json({
            ok: false,
            msg: 'El usuario no existe'
        });
    }

    res.json({
        ok: true,
        usuario
    })
}

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken,
    getUserInfo
};
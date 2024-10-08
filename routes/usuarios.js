const express = require("express");
const Router = express.Router();
const mysqlConexion = require("../conexion");

// Función para generar una claveU aleatoria de 4 dígitos entre 1 y 4
const generateRandomClaveU = () => {
    let claveU = '';
    for (let i = 0; i < 4; i++) {
        claveU += Math.floor(Math.random() * 4) + 1;
    }
    return claveU;
};

// Método GET
Router.get("/", (req, res) => {
    mysqlConexion.query("SELECT * from usuario", (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    });
});

// Método POST para crear un nuevo usuario con claveU
Router.post("/", (req, res) => {
    const { idusuario, nombre, correo, contrasena } = req.body;
    const claveU = generateRandomClaveU();  // Genera la claveU aleatoria

    const query = `
        INSERT INTO usuario (idusuario, nombre, correo, contrasena, claveU) 
        VALUES (?, ?, ?, ?, ?)
    `;

    mysqlConexion.query(query, [idusuario, nombre, correo, contrasena, claveU], (err, results, fields) => {
        if (!err) {
            res.status(201).json({ message: "Usuario creado", id: results.insertId, claveU: claveU });
        } else {
            console.log(err);
            res.status(500).json({ error: "Error al crear el usuario" });
        }
    });
});

// POST /usuarios/login
Router.post('/login', (req, res) => {
    const { correo, contrasena } = req.body;

    mysqlConexion.query(
        'SELECT * FROM usuario WHERE correo = ? AND contrasena = ?',
        [correo, contrasena],
        (err, rows, fields) => {
            if (err) {
                console.error('Error al buscar usuario:', err);
                return res.status(500).json({ success: false, message: 'Error al iniciar sesión. Por favor, intenta de nuevo más tarde.' });
            }

            if (rows.length > 0) {
                // Usuario encontrado, enviar datos del usuario
                const usuario = rows[0]; // Suponiendo que solo hay un usuario con ese correo y contraseña
                res.json({
                    success: true,
                    message: 'Inicio de sesión exitoso',
                    usuario: {
                        idusuario: usuario.idusuario,
                        nombre: usuario.nombre,
                        correo: usuario.correo
                        // Puedes incluir otros campos del usuario si los necesitas
                    }
                });
            } else {
                // Usuario no encontrado o credenciales incorrectas
                res.status(401).json({ success: false, message: 'Correo electrónico o contraseña incorrectos' });
            }
        }
    );
});

// Método GET para obtener claveU por nombre de usuario
Router.get("/clave/:nombre", (req, res) => {
    const { nombre } = req.params;
    const query = "SELECT claveU FROM usuario WHERE nombre = ?";

    mysqlConexion.query(query, [nombre], (err, rows, fields) => {
        if (!err) {
            if (rows.length > 0) {
                res.json(rows[0]);  // Devuelve la claveU si se encuentra el usuario
            } else {
                res.status(404).json({ message: "Usuario no encontrado" });
            }
        } else {
            console.log(err);
            res.status(500).json({ error: "Error al obtener la claveU" });
        }
    });
});

module.exports = Router;

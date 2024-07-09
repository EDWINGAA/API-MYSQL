const express = require("express");
const Router = express.Router();
const mysqlConexion = require("../conexion");

// Endpoint para obtener todos los invitados
Router.get("/", (req, res) => {
    mysqlConexion.query("SELECT * from invitados", (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.status(500).send("Error en la consulta");
        }
    });
});

// Endpoint para obtener invitados filtrados por nombreU
Router.get("/:nombreU", (req, res) => {
    const nombreU = req.params.nombreU;
    const query = `
        SELECT invitados.*
        FROM invitados
        JOIN usuario ON invitados.nombreU = usuario.nombre
        WHERE usuario.nombre = ?
    `;

    mysqlConexion.query(query, [nombreU], (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.status(500).send("Error en la consulta");
        }
    });
});

// Endpoint para insertar un nuevo invitado
Router.post("/", (req, res) => {
    const { nombreinv, codigoa, nombreU } = req.body;
    const query = "INSERT INTO invitados (nombreinv, codigoa, nombreU) VALUES (?, ?, ?)";

    mysqlConexion.query(query, [nombreinv, codigoa, nombreU], (err, result) => {
        if (!err) {
            res.send("Invitado agregado exitosamente");
        } else {
            console.log(err);
            res.status(500).send("Error en la inserción");
        }
    });
});

module.exports = Router;

const express = require("express");
const Router = express.Router();
const mysqlConexion = require("../conexion");

// Endpoint para obtener invitados filtrados por nombreU
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

module.exports = Router;

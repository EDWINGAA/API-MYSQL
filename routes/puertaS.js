const express = require("express");
const Router = express.Router();
const mysqlConexion = require("../conexion");

Router.get("/", (req, res) => {
    mysqlConexion.query("SELECT * from puertaS", (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    });
});

// Ruta para actualizar solo el campo "motor"
Router.put("/update-motor", (req, res) => {
    const { id, motor } = req.body;

    const query = "UPDATE puertaS SET motor = ? WHERE idstatus = ?";

    mysqlConexion.query(query, [motor, id], (err, result) => {
        if (!err) {
            res.send("Motor actualizado correctamente");
        } else {
            console.log(err);
            res.status(500).send("Error actualizando el motor");
        }
    });
});

module.exports = Router;

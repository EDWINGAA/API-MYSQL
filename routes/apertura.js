const express = require("express");
const Router = express.Router();
const mysqlConexion = require("../conexion");

// Endpoint para seleccionar todo de la tabla 'apertura'
Router.get("/", (req, res) => {
    mysqlConexion.query("SELECT * FROM apertura", (err, rows, fields) => {
        if (!err) {
            console.log("Data fetched from / endpoint:", rows);
            res.send(rows);
        } else {
            console.log("Error fetching data:", err);
            res.status(500).send("Error in the query");
        }
    });
});

Router.get("/withUserNames", (req, res) => {
    const query = `
        SELECT a.idapertura, a.fecha, a.hora, u.nombre 
        FROM apertura a 
        JOIN usuario u ON a.idusuario = u.idusuario
    `;

    mysqlConexion.query(query, (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            res.status(500).send("Error in the query");
        }
    });
});

module.exports = Router;

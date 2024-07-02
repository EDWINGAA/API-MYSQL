const mysql = require("mysql");
var mysqlConexion = mysql.createConnection({
    host: "oaxacapower.org",
    user: "u744130986_VaultGate",
    password: "BXueQ@vEB;g1",
    database: "u744130986_VaultGate",
    multipleStatements: true,
});

mysqlConexion.connect((err) => {
    if (!err) {
        console.log("Estoy conectado a la base de datos Mysql");
    } else {
        console.log("No estoy conectado. Error");
    }
});

module.exports = mysqlConexion;

const express = require("express");
const bodyParser = require("body-parser");
const mysqlConexion = require("./conexion");
const usuarios = require("./routes/usuarios");
const invitados = require("./routes/invitados");
const apertura = require("./routes/apertura");

var app = express();
app.use(bodyParser.json());

// Middleware para deshabilitar CORS (permitir acceso desde cualquier origen)
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // Permitir acceso desde cualquier origen
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  ); // Métodos HTTP permitidos
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  ); // Encabezados permitidos
  res.setHeader("Access-Control-Allow-Credentials", true); // Permitir credenciales (cookies, cabeceras, etc.)
  next();
});

// Rutas de la API
app.use("/usuarios", usuarios);
app.use("/invitados", invitados);
app.use("/apertura", apertura);

// Puerto en el que escucha el servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

require('dotenv').config();
const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Configura la conexión a la base de datos
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Conecta a la base de datos
db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    throw err;
  }
  console.log("MySQL Connected...");
});

// Ruta para agregar un usuario
app.post("/usuarios", (req, res) => {
  const data = req.body;
  const sql = "INSERT INTO Usuarios SET ?";
  db.query(sql, data, (err, result) => {
    if (err) {
      console.error("Error inserting user:", err);
      res.status(500).send("Error al agregar usuario");
    } else {
      res.send("Usuario agregado con éxito");
    }
  });
});

// Ruta para obtener todos los usuarios
app.get("/usuarios", (req, res) => {
  const sql = "SELECT * FROM Usuarios";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching users:", err);
      res.status(500).send("Error al obtener usuarios");
    } else {
      res.send(results);
    }
  });
});

// Ruta para agregar un análisis
app.post("/analisis", (req, res) => {
  const data = req.body;
  const sql = "INSERT INTO Analisis SET ?";
  db.query(sql, data, (err, result) => {
    if (err) {
      console.error("Error inserting analysis:", err);
      res.status(500).send("Error al agregar análisis");
    } else {
      res.send("Análisis agregado con éxito");
    }
  });
});

// Ruta para obtener todos los análisis de un usuario específico
app.get("/analisis/:usuario_id", (req, res) => {
  const { usuario_id } = req.params;
  const sql = "SELECT * FROM Analisis WHERE usuario_id = ?";
  db.query(sql, [usuario_id], (err, results) => {
    if (err) {
      console.error("Error fetching analyses:", err);
      res.status(500).send("Error al obtener análisis");
    } else {
      res.send(results);
    }
  });
});

// Ruta para agregar un resultado de análisis detallado
app.post("/resultados_analisis", (req, res) => {
  const data = req.body;
  const sql = "INSERT INTO ResultadosAnalisis SET ?";
  db.query(sql, data, (err, result) => {
    if (err) {
      console.error("Error inserting detailed result:", err);
      res.status(500).send("Error al agregar resultado de análisis");
    } else {
      res.send("Resultado de análisis agregado con éxito");
    }
  });
});

// Ruta para obtener los resultados detallados de un análisis específico
app.get("/resultados_analisis/:analisis_id", (req, res) => {
  const { analisis_id } = req.params;
  const sql = "SELECT * FROM ResultadosAnalisis WHERE analisis_id = ?";
  db.query(sql, [analisis_id], (err, results) => {
    if (err) {
      console.error("Error fetching detailed results:", err);
      res.status(500).send("Error al obtener resultados detallados");
    } else {
      res.send(results);
    }
  });
});

// Ruta para iniciar sesión y verificar usuario
app.post("/login", (req, res) => {
  const { email, contrasena_hash } = req.body;
  const sql = "SELECT * FROM Usuarios WHERE email = ? AND contrasena_hash = ?";
  db.query(sql, [email, contrasena_hash], (err, results) => {
    if (err) {
      console.error("Error logging in:", err);
      res.status(500).send("Error al iniciar sesión");
    } else if (results.length > 0) {
      res.send({ message: "Inicio de sesión exitoso", user: results[0] });
    } else {
      res.status(401).send("Credenciales incorrectas");
    }
  });
});

// Inicia el servidor
app.listen(3000, () => {
  console.log("Server started on port 3000");
});

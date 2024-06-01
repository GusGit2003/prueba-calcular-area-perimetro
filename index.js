const express = require("express"); //Importar express
const bodyParser = require("body-parser");
const cors = require("cors");
const misrutas = require("./routes/rutas");

const app = express(); // Crear al servidor
const port = process.env.PORT || 3000; 

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', misrutas);

app.use(express.static(process.cwd() + '/public/'));

app.listen(port, () => {
  console.log(`Hola servidor ejecución en http://localhost:${port}`);
});
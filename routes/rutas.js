const express = require("express"); //Importar
const router = express.Router();
const cuadrado = require("../calculos");
const calculoSueldo = require("../calculoSueldo");

/*
router.get("/", (req, res) => {
  res.send({ message: "Hola mundo, soy Gustavo Adolfo Avendaño Guevara" });
}); */
router.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/public/index.html');
});

router.get("/ayuda", (req, res) => {
  res.send({
    message: "¿En qué te ayudo? Soy Gustavo Adolfo Avendaño Guevara",
  });
});

router.get("/ayuda/:name", (req, res) => {
  res.send({ message: `Hola ${req.params.name}, ¿en qué te ayudo?` });
});

router.get("/prueba", (req, res) => {
  res.send({ message: `Hola ${req.query.name} ${req.query.apellido}` });
});

router.get("/datos", (req, res) => {
  res.send({
    secretBase: "Super tower",
    active: true,
    members: [
      {
        name: "Gustavo",
        age: 21,
        secretIdentity: "Dan Jukes",
        powers: ["Radiation resistance", "Turning tiny", "Radiation blast"],
      },
      {
        name: "Madame Uppercut",
        age: 39,
        secretIdentity: "Jane Wilson",
        powers: [
          "Million tonne punch",
          "Damage resistance",
          "Superhuman reflexes",
        ],
      },
      {
        name: "Eternal Flame",
        age: 1000000,
        secretIdentity: "Unknown",
        powers: [
          "Immortality",
          "Heat Immunity",
          "Inferno",
          "Teleportation",
          "Interdimensional travel",
        ],
      },
    ],
  });
});

//Postman
router.post("/ayuda", (req, res) => {
  console.log("Cuerpo de la petición: ", req.body);
  res.send({
    message: "Hola mundo, ¿en qué te puedo ayudar?, Soy una petición POST",
  });
});

router.post("/producto", (req, res) => {
  console.log("Cuerpo de la petición: ", req.body);
  /* La sintaxis de desestructuración es una funcionalidad que vino
      junto con ES6. Es una expresión de JavaScript que permite desempacar
      valores de arreglos o propiedades de objetos en distintas variables */
  const { nombre, sueldo, categoria } = req.body;
  console.log(nombre);
  console.log(sueldo);
  console.log(categoria);
  res.send({ message: "El producto se ha recibido" });
});

//API que combina todos los parámetros
router.post("/producto/:id", (req, res) => {
  const { id } = req.params;
  const { motor } = req.query;
  const { precio } = req.body;
  console.log(id, motor, precio);
  res.json({
    stockmin: 3,
    stockmax: 23,
    existencia: 18,
  });
});

router.get('/calculos/:width', (req, res) => {
    const { width } = req.params;
    let a = cuadrado.area(width);
    let b = cuadrado.perimetro(width);
    console.log(width, a, b);
    res.send({
        ancho: width,
        area: a,
        perimetro: b
    });
});

//Investigación
router.post("/sueldo", (req, res) => {
  console.log("Cuerpo de la petición: ", req.body);
  const { nombre, horas, pagoHora, categoria } = req.body; //Nombre, Horas Trabajadas, Pago por Hora, Categoría del Trabajador
  //console.log(nombre, horas, pagoHora, categoria);
  //res.send({ message: "Los datos del trabajador se han recibido" });

  //Calculos
  let bono = calculoSueldo.bono(categoria);
  let sueldoBruto = calculoSueldo.sueldoBruto(horas, pagoHora); //Horas Trabajadas * Pago por Hora
  let sueldoNeto = calculoSueldo.sueldoNeto(sueldoBruto, bono); //Sueldo Bruto + Bono de acuerdo a la Categoría
  let sueldoNetoImpuestos = calculoSueldo.sueldoNetoImpuestos(sueldoNeto); //El porcentaje de impuesto a deducir es de 10%

  res.json({
    nombre: nombre, categoria: categoria, bono: bono, 
    sueldoBruto: sueldoBruto, sueldoNeto: sueldoNeto, sueldoNetoImpuestos: sueldoNetoImpuestos,
  });
  console.log(nombre+", "+categoria+", "+bono+", "+sueldoBruto+", "+sueldoNeto+", "+sueldoNetoImpuestos);
});


module.exports = router;
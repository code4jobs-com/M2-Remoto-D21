let numero = 4;
let nombre = "pepe";
let objetoModelo = {
  dni: 234234234,
  nombre: "jose",
  apellido: "dominguez",
  fecha: 32429042092304982304803249023402,
  array: [1, 2, 3],
  objeto: {
    uno: 1,
    dos: 2,
  },
  funcionModelo: function patata(num1) {
    funcionModelo2(num1);
  },
};

function funcionModelo2(num2) {
  console.log(num2);
}

module.exports.numero = numero;
module.exports.nombre = nombre;
module.exports.dni = patata.dni;
module.exports.patata = objetoModelo.funcionModelo;

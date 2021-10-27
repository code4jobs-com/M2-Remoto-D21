console.log("hola estoy cargado :D");
pedirLibros();

function pedirLibros() {
  fetch("http://localhost:3000/api/libros")
    .then((res) => res.json())
    .then((datos) => {
      let imprimir = "";
      for (let i = 0; i < datos.data.length; i++) {
        imprimir += `<tr><td>${datos.data[i].titulo}</td><td>${
          datos.data[i].leido ? "Leido" : "Sin leer"
        }</td><td><button onclick="marcarLeido('${
          datos.data[i].titulo
        }')">Leido!</button></td><td><button onclick="borrar('${
          datos.data[i].titulo
        }')">Borrar</button></td></tr>`;
      }
      document.getElementById("lista").innerHTML = `<table>${imprimir}</table>`;
    });
}

function anyadir() {
  fetch(
    `http://localhost:3000/api/nuevoLibro/${
      document.getElementById("titulo").value
    }`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((res) => res.json())
    .then(function (datos) {
      datos.error
        ? feedback("Ha habido un error")
        : (feedback("Libro insertado correctamente"), pedirLibros());
    });
}

function feedback(mensaje) {
  document.getElementById("feedback").innerHTML = `<h3>${mensaje}</h3>`;
  setTimeout(() => {
    document.getElementById("feedback").innerHTML = "";
  }, 3000);
}

function marcarLeido(titulo) {
  console.log(titulo);
  fetch(`http://localhost:3000/api/editarLibro/${titulo}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then(function (datos) {
      datos.error
        ? feedback("Ha habido un error")
        : (feedback("Libro marcado como leído"), pedirLibros());
    });
}

function borrar(titulo) {
  fetch(`http://localhost:3000/api/borrarLibro/${titulo}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then(function (datos) {
      datos.error
        ? feedback("Ha habido un error")
        : (feedback("Libro borrado correctamente"), pedirLibros());
    });
}

fetch("/personas")
  .then((res) => res.json())
  .then((data) => {
    for (let i = 0; i < data.length; i++) {
      document.getElementById(
        "lista"
      ).innerHTML += `<div><h3>${data[i].nombre}</h3><h4>${data[i].apellido}</h4><p>${data[i].edad}</p></div>`;
    }
  });

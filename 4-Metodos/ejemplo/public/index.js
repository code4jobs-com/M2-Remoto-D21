function enviar() {
  let texto = document.getElementById("nombre").value;
  let envio = {
    nombre: texto,
  };

  fetch("/put", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(envio),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data.respuesta);
    });
}

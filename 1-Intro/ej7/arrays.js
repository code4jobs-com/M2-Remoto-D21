function arrays(numero) {
  let array = [];
  for (let i = 1; i < 11; i++) {
    array.push(numero + i);
  }
  return array;
}

module.exports = arrays;

function descendente(array) {
  let array2 = [];
  for (let i = array.length - 1; i >= 0; i--) {
    array2.push(array[i]);
  }
  return array2;
}

module.exports = descendente;

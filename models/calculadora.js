function somar(a, b) {
  if (typeof a !== "number") {
    return "Erro";
  }

  if (typeof b !== "number") {
    return "Erro";
  }

  return a + b;
}

exports.somar = somar;

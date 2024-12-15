const calculadora = require("../../models/calculadora");

test("Soma de 2 + 2 deveria retornar 4", () => {
  expect(calculadora.somar(2, 2)).toBe(4);
});

test("Soma de 2 + 3 deveria retornar 5", () => {
  expect(calculadora.somar(2, 3)).toBe(5);
});

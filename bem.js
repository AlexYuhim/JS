function bem() {
  let resultString = "";
  let argBem = [];
  // Забираем в цикле все аргументы из внешней функции
  for (let i = 0; i < arguments.length; i++) {
    argBem.push(arguments[i]);
  }
  // если аргументов больше чем 1 приведим их написание через "-"
  argBem = String(argBem).replace(/,/g, "-");

  return function () {
    let argElement = "";
    let argMod = "";
    // забираем все аргументы из внутренней функции
    // в зависимости от того какой тип данных распределям аргументы по переменнм
    for (let i = 0; i < arguments.length; i++) {
      if (typeof arguments[i] === "string") {
        argElement = "__" + arguments[i];
      } else if (typeof arguments[i] === "object") {
        argMod = arguments[i];
      }
    }

    let mod = "";
    // вынимаем данные из объекта для модификаторов
    Object.keys(argMod).forEach((e) => {
      if (argMod[e]) {
        mod += " " + argBem + argElement + "_" + e;
      }

      if (typeof argMod[e] === "string") {
        mod += "_" + argMod[e];
      }
    });
    // собираем всю строку
    resultString = argBem + argElement + mod;

    return resultString;
  };
}

const block = bem("block");

console.log(block()); // block
console.log(block({ main: true, size: "view" }));
console.log(block({ modA: true, modB: false, modC: "value" })); // block block_modA block_modC_value
console.log(block("element")); // block__element
console.log(block("element", { modA: true })); // block__element block__element_modA
console.log(block("element", { modA: false, modB: "value" })); // block__element block__element_modB_value
console.log(block("element", { modA: false, modB: false })); // block__element

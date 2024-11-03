let input = document.querySelector("#input");
let output = document.querySelector("#output");

function isValid(event) {
  if (event.key == "0" || event.key == "1") {
    return true;
  }

  return false;
}

function convert() {
  let binary = Array.from(String(input.value), Number);

  binary.reverse();

  let decimal = null;

  binary.forEach((number, index) => {
    if (number == "1") {
      decimal += Math.pow(2, index);
    }
  });

  output.value = decimal;
}

setInterval(convert, 100);

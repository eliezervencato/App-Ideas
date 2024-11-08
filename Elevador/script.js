const faixas = document.querySelectorAll("[faixas]");
const andar = document.querySelectorAll("[andar]");
const botao = document.querySelectorAll("button");

let emMovimentacao = false;

botao.forEach((e) => {
  e.setAttribute("value", e.innerHTML);
  e.addEventListener("click", () => {
    const andar = e.getAttribute("value");
    movimentarElevador(andar);
  });
});

faixas.forEach((e) => {
  const qtde = +e.getAttribute("faixas");

  for (let i = 0; i < qtde; i++) {
    const faixa = document.createElement("div");
    faixa.classList.add("faixa");
    e.appendChild(faixa);
  }
});

andar.forEach((e) => {
  const qtde = +e.getAttribute("andar");

  for (let i = qtde; i > 0; i--) {
    const andar = criarAndar(i);
    e.appendChild(andar);
  }

  const terreo = criarTerreo();

  e.appendChild(terreo);
});

function criarAndar(numero) {
  const porta = document.createElement("div");
  porta.classList.add("porta");

  const andar = document.createElement("div");
  andar.classList.add("andar");
  andar.setAttribute("andar", numero);
  andar.appendChild(porta);

  return andar;
}

function criarTerreo() {
  const janela = document.createElement("div");
  janela.classList.add("janela");

  const terreo = document.createElement("div");
  terreo.classList.add("terreo");
  terreo.setAttribute("andar", "t");
  terreo.appendChild(janela);

  return terreo;
}

function alturaElevador() {
  const terreo = document.querySelector('[andar="t"]');
  return terreo.offsetHeight;
}

function criarElevador() {
  const poco = document.querySelector(".poco");

  const elevador = document.createElement("div");
  elevador.classList.add("elevador");
  elevador.style.height = alturaElevador();

  poco.appendChild(elevador);
}

criarElevador();

function obterPosicaoElevador() {
  const elevador = document.querySelector(".elevador");
  return elevador.style.bottom.replace("px", "");
}

function movimentarElevador(andar) {
  if (emMovimentacao) return;

  const destaque = document.querySelector(`button[value="${andar}"]`);
  destaque.classList.add("destaque");

  emMovimentacao = true;

  const numero = andar === "T" ? 0 : +andar;
  const elevador = document.querySelector(".elevador");

  let posicaoInicial = obterPosicaoElevador();
  let posicaoFinal = numero * alturaElevador();
  const subindo = posicaoFinal > posicaoInicial;

  atualizarDisplay(subindo ? "Subindo" : "Descendo");

  let temporizador = setInterval(() => {
    const novaPosicao = +obterPosicaoElevador() + (subindo ? 10 : -10);
    const terminou = subindo
      ? novaPosicao >= posicaoFinal
      : novaPosicao <= posicaoFinal;
    elevador.style.bottom = terminou ? posicaoFinal : novaPosicao;

    if (terminou) {
      atualizarDisplay(andar === "T" ? "Térreo" : `Andar ${andar}`);
      clearInterval(temporizador);
      emMovimentacao = false;
      destaque.classList.remove("destaque");
    }
  }, 30);
}

function atualizarDisplay(andar) {
  const display = document.querySelector(".display");
  display.innerHTML = andar;
}

const alfabeto = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

const input = document.getElementById('input-mensagem')
const seletor = document.getElementById('seletor-alfabeto')
const botao = document.getElementById('botao')
const resposta = document.getElementById('texto-criptografado')

for(let i = 0; i < alfabeto.length; i++){
    seletor.innerHTML = seletor.innerHTML + `<option value="${i}">${alfabeto[i]}</option>`
}

botao.addEventListener('click', () => {
    let texto = input.value
    let deslocamento = +seletor.value

    let criptografado = criptografar(texto, deslocamento)
    resposta.innerText = criptografado
})

function criptografar(texto, deslocamento){
    let textoMaisculo = texto.toUpperCase().split("");
    // console.log(textoMaisculo)
    let textoCripto = []
    
    
    for(let i = 0; i < textoMaisculo.length; i++){
        let indiceDaLetra = alfabeto.indexOf(textoMaisculo[i])
        if(indiceDaLetra >= 0){
            textoCripto.push(letraPorIndice(indiceDaLetra + deslocamento))
        } else {
            textoCripto.push(textoMaisculo[i])
        }
    }

    return textoCripto.join("")
}

function letraPorIndice(indice){
    let indiceFinal
    if(indice >= 0){
        indiceFinal = indice % alfabeto.length
    }
    return alfabeto[indiceFinal]
}
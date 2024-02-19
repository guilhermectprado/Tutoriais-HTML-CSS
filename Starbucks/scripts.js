const html = document.querySelector('html');
const checkbox = document.querySelector('#switch');

function alterarImagemProduto (produtoClicado) {
    document.querySelector('.imagemProduto').src = produtoClicado;
}

function alterarCorCirculo (novaCor) {
    const circulo = document.querySelector('.circulo');
    circulo.style.background = novaCor;
}

function alternatMenuHamburguer () {
    var menu = document.querySelector('.menuHamburguer');
    var navegacao = document.querySelector('.navegacaoHamburguer');
    menu.classList.toggle('ativo');
    navegacao.classList.toggle('ativo');
}

checkbox.addEventListener('change', function() {
    html.classList.toggle('dark-mode');
})

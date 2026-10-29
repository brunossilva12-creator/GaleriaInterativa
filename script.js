const listaBotoes = document.querySelectorAll('.filtro');
const listaImagens = document.querySelectorAll('.miniatura');

const totalImagens = document.querySelector('#totalImagens');

const modal = document.querySelector('#modal');
const btnFechar = document.querySelector('#fechar');
const btnAnterior = document.querySelector('#anterior');
const imagemModal = document.querySelector('#imagemModal');
const contador = document.querySelector('#contador');
const nomeImagem = document.querySelector('#nomeImagem');
const informacoes = document.querySelector('#informacoes');
const titulo = document.querySelector('#titulo');
const descricao = document.querySelector('#descricao')
const btnProximo = document.querySelector('#proximo');

let indiceAtual = 0;
let imagensVisiveis = [];


function atualizarImagensVisiveis(){
    imagensVisiveis = Array.from(listaImagens).filter(
        function(imagem){
            return !imagem.classList.contains('oculta');
    })
    totalImagens.textContent = `Exibindo ${imagensVisiveis.length} de ${listaImagens.length}`
}

function filtrarImagens(categoria){
    listaImagens.forEach((imagem)=>{
        const categoriaImagem = imagem.dataset.categoria;

        if(categoria === "todas"){
            imagem.classList.remove('oculta');
            imagem.tabIndex = 0;
            imagem.classList.remove('ativa');
        }

        else if(categoriaImagem === categoria){
            imagem.classList.remove('oculta');
            imagem.tabIndex = 0;
            imagem.classList.add('ativa')
        }

        else{
            imagem.classList.remove('ativa');
            imagem.classList.add('oculta');
            imagem.tabIndex = -1;
        }
    })
    atualizarImagensVisiveis();
}

listaBotoes.forEach((botao)=>{
    botao.addEventListener("click", ()=>{
        let categoria = botao.dataset.filtro;

        listaBotoes.forEach((item)=>{
            item.classList.remove('ativo');
        })
        botao.classList.add('ativo')
        filtrarImagens(categoria);
    })
})


function mostrarImagem(indice){
    let quantidade = imagensVisiveis.length;

    if(quantidade === 0){
        return
    }

    // navegação circular
    indiceAtual = (indice + quantidade) % quantidade;

     const imagem = imagensVisiveis[indiceAtual];
  
    imagemModal.src = imagem.src;
    imagemModal.alt = imagem.alt;
    nomeImagem.textContent = imagem.alt;
    contador.textContent = ` ${indiceAtual+1} de ${quantidade}`;
    titulo.textContent = imagem.dataset.titulo;
    descricao.textContent = imagem.dataset.descricao;
}

function abrirModal(imagem){
    indiceAtual = imagensVisiveis.indexOf(imagem);
    modal.classList.add('ativo');
    mostrarImagem(indiceAtual);

}   

listaImagens.forEach(function(imagem){
    imagem.addEventListener('click', ()=>{
        abrirModal(imagem);
    })
})


btnFechar.addEventListener('click', ()=>{
    modal.classList.remove('ativo')
})

btnProximo.addEventListener('click', ()=>{
    mostrarImagem(indiceAtual+1);
})

btnAnterior.addEventListener('click', ()=>{
    mostrarImagem(indiceAtual-1);
})

document.addEventListener("keydown", (evento)=>{
    if(evento.key === "Enter" || evento.key ==="Space" || evento.key === "NumpadEnter"){
        modal.classList.add('ativo');
    }
    if(evento.key === "Escape"){
        modal.classList.remove('ativo');
    }

    if(evento.key === "ArrowRight"){
        mostrarImagem(indiceAtual+1);
    }

    if(evento.key === "ArrowLeft"){
        mostrarImagem(indiceAtual-1);
    }
})


filtrarImagens('todas');
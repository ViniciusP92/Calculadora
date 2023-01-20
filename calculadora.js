"use strict";

const display = document.getElementById('display');
const numeros = document.querySelectorAll('[id*=tecla]');
const operadores = document.querySelectorAll('[id*=operador]');

let novoNum = true;

const atualizarDisplay = (texto) => {
    if (novoNum){
        display.textContent = texto;
        novoNum = false;
    } else{
        display.textContent += texto;
    }
 
}

const adicionarValor = (evento) => atualizarDisplay(evento.target.textContent);

numeros.forEach(numero => numero.addEventListener('click', adicionarValor));


const escolherOperador = () => {
    novoNum = true;


}

operadores.forEach(operador => operador.addEventListener('click', escolherOperador));
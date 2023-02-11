"use strict";

const display = document.getElementById('display');
const numeros = document.querySelectorAll('[id*=tecla]'); // Irá procurar por elementos que tenham "tecla" em seus nomes
const operadores = document.querySelectorAll('[id*=operador]'); // Irá procurar por elementos que tenham "operador" em seus nomes

let novoNum = true;
let operador;
let numeroAntes;

const conta = () => operador !== undefined;

const calculo = () => {
    if (conta()){ 
        novoNum = true;
        // Maneira adicional de realizar o calculos das operações 
        // const numeroAtual = Number(display.textContent);
        // const resultado = eval (`${numeroAntes}${operador}${numeroAtual}`);
        // atualizarDisplay(resultado);
        const numeroAtual = parseFloat(display.textContent.replace(',', '.'));
        if (operador == "+"){
            atualizarDisplay(numeroAntes + numeroAtual);
        }else if(operador == "-"){
            atualizarDisplay(numeroAntes - numeroAtual);
        }else if(operador == "x"){
            atualizarDisplay(numeroAntes * numeroAtual);
        }else if(operador == "/"){
            atualizarDisplay(numeroAntes / numeroAtual);
    }}
}

const atualizarDisplay = (texto) => {
    if (novoNum){
        display.textContent = texto;
        novoNum = false; //Fará com que os valores continuem a ser exibidos ao invés de serem substituídos
    } else{
        display.textContent += texto;
    }
 
}

const adicionarValor = (evento) => atualizarDisplay(evento.target.textContent);

numeros.forEach(numero => numero.addEventListener('click', adicionarValor));


const escolherOperador = (evento) => {
    if (!novoNum){
    calculo()
    novoNum = true; //Irá redefinir os valores amostrados no display logo após o operador ser selecionado
    operador = evento.target.textContent;
    numeroAntes = parseFloat(display.textContent.replace(',','.'));
    console.log(operador);
    }
}

operadores.forEach(operador => operador.addEventListener('click', escolherOperador));

const acionarIgual = () => {
    calculo();
    operador = undefined;
}

document.getElementById("igual").addEventListener('click', acionarIgual);

const limparDisplay = () => display.textContent = ""

document.getElementById('limparDisplay').addEventListener('click', limparDisplay);

const backSpace = () => display.textContent = display.textContent.slice(0, -1);

document.getElementById('backSpace').addEventListener('click', backSpace);

const existeDecimal = () => display.textContent.indexOf(',') !== -1;
const existeValor = () => display.textContent.length > 0;

const inserirDecimal = () =>{
    if(!existeDecimal()){
        if(existeValor()){
            atualizarDisplay(',');
        }else {
            atualizarDisplay('0,');
        }
    }
}

document.getElementById('decimal').addEventListener('click', inserirDecimal);

const mapaTeclado = {
    '0' : 'tecla0',
    '1' : 'tecla1',
    '2' : 'tecla2',
    '3' : 'tecla3',
    '4' : 'tecla4',
    '5' : 'tecla5',
    '6' : 'tecla6',
    '7' : 'tecla7',
    '8' : 'tecla8',
    '9' : 'tecla9',
    '+' : 'operadorAdicionar',
    '-' : 'operadorSubtrair',
    '*' : 'operadorMultiplicar',
    '/' : 'operadorDividir',
    'Enter' : 'igual',
    '/' : 'operadorDividir',
    'Backspace' : 'backSpace',
    'Escape' : 'limparDisplay',
    ',' : 'decimal',
}

const mapearTeclado = (evento) =>{
    const tecla = evento.key;

    const teclaPermitida = () => Object.keys(mapaTeclado).indexOf(tecla) !== -1;
    if (teclaPermitida()) document.getElementById(mapaTeclado[tecla]).click();
}

document.addEventListener('keydown', mapearTeclado);
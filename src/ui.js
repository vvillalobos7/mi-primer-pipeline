import { evaluarRiesgo } from './app.js';

const formulario = document.querySelector('#formulario');
const resultado = document.querySelector('#resultado');

formulario.addEventListener('submit', (evento) => {
  evento.preventDefault();
  const impacto = Number(document.querySelector('#impacto').value);
  const probabilidad = Number(document.querySelector('#probabilidad').value);
  const calculo = evaluarRiesgo(impacto, probabilidad);
  resultado.textContent = `Resultado: ${calculo.puntaje}/9 · Nivel ${calculo.nivel}`;
});

import test from 'node:test';
import assert from 'node:assert/strict';
import { evaluarRiesgo } from '../src/app.js';

test('Riesgo bajo: impacto 1, probabilidad 2', () => {
  assert.deepEqual(evaluarRiesgo(1, 2), { puntaje: 2, nivel: 'BAJO' });
});

test('Riesgo medio: impacto 2, probabilidad 2', () => {
  assert.deepEqual(evaluarRiesgo(2, 2), { puntaje: 4, nivel: 'MEDIO' });
});

test('Riesgo alto: impacto 3, probabilidad 2', () => {
  assert.deepEqual(evaluarRiesgo(3, 2), { puntaje: 6, nivel: 'ALTO' });
});

test('Riesgo alto: impacto 3, probabilidad 3', () => {
  assert.deepEqual(evaluarRiesgo(3, 3), { puntaje: 9, nivel: 'ALTO' });
});

test('No acepta valores fuera del rango', () => {
  assert.throws(() => evaluarRiesgo(0, 2), RangeError);
  assert.throws(() => evaluarRiesgo(4, 1), RangeError);
  assert.throws(() => evaluarRiesgo(2, 1.5), RangeError);
});

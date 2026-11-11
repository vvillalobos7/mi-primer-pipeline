/** Lógica de negocio: una matriz educativa 3x3, sin almacenamiento de datos. */
export function evaluarRiesgo(impacto, probabilidad) {
  if (!Number.isInteger(impacto) || !Number.isInteger(probabilidad) ||
      impacto < 1 || impacto > 3 || probabilidad < 1 || probabilidad > 3) {
    throw new RangeError('Impacto y probabilidad deben ser enteros entre 1 y 3.');
  }

  const puntaje = impacto * probabilidad;
  const nivel = puntaje <= 2 ? 'BAJO' : puntaje <= 4 ? 'MEDIO' : 'ALTO';
  return { puntaje, nivel };
}

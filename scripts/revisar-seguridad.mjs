import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

// Controles de demostración: no sustituyen SAST, DAST ni revisión profesional.
const reglas = [
  { nombre: 'Uso de eval()', patron: /\beval\s*\(/ },
  { nombre: 'Uso de document.write()', patron: /\bdocument\.write\s*\(/ },
  { nombre: 'Asignación a innerHTML', patron: /\.innerHTML\s*=/ },
  { nombre: 'Posible secreto incrustado', patron: /\b(?:api_key|password|secret|access_token)\b\s*[:=]\s*['"`][^'"`]{4,}['"`]/i }
];

const carpeta = path.resolve('src');
const archivos = (await readdir(carpeta)).filter((n) => /\.(html|js|mjs)$/i.test(n));
let hallazgos = 0;

for (const archivo of archivos) {
  const contenido = await readFile(path.join(carpeta, archivo), 'utf8');
  const lineas = contenido.split(/\r?\n/);
  lineas.forEach((linea, numero) => {
    // Ignorar comentarios de una sola línea para reducir falsos positivos simples.
    if (linea.trimStart().startsWith('//')) return;
    for (const regla of reglas) {
      if (regla.patron.test(linea)) {
        hallazgos++;
        console.error(`RIESGO: ${archivo}:${numero + 1} - ${regla.nombre}`);
      }
    }
  });
}

if (hallazgos > 0) {
  console.error(`SECURITY FAIL: ${hallazgos} hallazgo(s). Se bloquea el siguiente paso.`);
  process.exitCode = 1;
} else {
  console.log('SECURITY OK: no se detectaron los patrones inseguros definidos para la demostración.');
}

import { rm, cp, access, stat } from 'node:fs/promises';
import path from 'node:path';

const fuente = path.resolve('src');
const destino = path.resolve('dist');
await access(path.join(fuente, 'index.html'));
await rm(destino, { recursive: true, force: true });
await cp(fuente, destino, { recursive: true });
const archivo = await stat(path.join(destino, 'index.html'));
if (archivo.size === 0) throw new Error('La página de salida está vacía');
console.log('BUILD OK: se creó dist/ con el sitio estático.');

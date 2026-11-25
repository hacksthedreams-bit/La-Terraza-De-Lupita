/*
 * Regenera la carta en HTML plano (dentro de <noscript>) en index.html, a partir de los datos de js/main.js.
 * Sirve para buscadores y lectores que no ejecutan JavaScript. Ejecutar cada vez que cambie la carta:
 *   node tools/generar-carta-noscript.js
 */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const mainPath = path.join(root, 'js', 'main.js');
const indexPath = path.join(root, 'index.html');

const src = fs.readFileSync(mainPath, 'utf8');
const startMarker = "'use strict';";
const start = src.indexOf(startMarker) + startMarker.length;
const catIdx = src.indexOf('var CATEGORIES = [');
const end = src.indexOf('\n  ];', catIdx) + 5;
const data = new Function('window', src.slice(start, end) + '\nreturn { PRODUCTS: PRODUCTS, CATEGORIES: CATEGORIES };')({});

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const fmt = p => '$' + String(p).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
const badgeMap = { vegano: 'Vegano', vegetariano: 'Vegetariano', personalizable: 'Personalizable', local: 'Solo en el local' };

let html = '<noscript>\n<div class="noscript-menu">\n<p>Esta es la carta en versión simple. Para pedir, escríbenos por <a href="https://wa.me/56990998900" rel="noreferrer">WhatsApp</a>.</p>\n';
data.CATEGORIES.forEach(cat => {
  const prods = data.PRODUCTS.filter(p => p.catId === cat.id && !p.hideFromGrid);
  if (!prods.length) return;
  html += '<h3>' + esc(cat.name) + '</h3>\n<p>' + esc(cat.desc) + '</p>\n<ul>\n';
  prods.forEach(p => {
    let price = fmt(p.price);
    let opts = '';
    const o = p.variants && p.variants.options;
    if (o && o.some(x => x.price)) {
      opts = ' (' + o.map(x => esc(x.label) + ' ' + fmt(x.price || p.price)).join(', ') + ')';
      price = 'desde ' + fmt(Math.min.apply(null, o.map(x => x.price || p.price)));
    }
    const tags = (p.badges || []).map(b => badgeMap[b] || b);
    html += '<li><strong>' + esc(p.name) + '</strong> — ' + price + opts + (p.desc ? '. ' + esc(p.desc) : '') +
      (tags.length ? ' [' + esc(tags.join(', ')) + ']' : '') + '</li>\n';
  });
  html += '</ul>\n';
});
html += '</div>\n</noscript>';

const A = '<!-- CARTA-NOSCRIPT:START -->';
const B = '<!-- CARTA-NOSCRIPT:END -->';
let idx = fs.readFileSync(indexPath, 'utf8');
const i = idx.indexOf(A), j = idx.indexOf(B);
if (i < 0 || j < 0) throw new Error('Faltan los marcadores CARTA-NOSCRIPT en index.html');
idx = idx.slice(0, i + A.length) + '\n' + html + '\n' + idx.slice(j);
fs.writeFileSync(indexPath, idx);
console.log('Carta noscript actualizada:', data.PRODUCTS.filter(p => !p.hideFromGrid).length, 'productos');

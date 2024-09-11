const hex = e => {
  const a = e === undefined ? [] : typeof e === 'string' ? document.querySelectorAll(e) : Array.isArray(e) ? e : [e];
  const r = {};

  /* <Store color values> */
  const clra = {
    r: '#dae',
    g: '#aed',
    y: '#eda'
  };
  [].forEach.call(Object.keys(clra), ei => r[ei] = clra[ei]);
  /* </Store color values> */

  /* <Add, Remove classes to elements> */
  r.addclassu = v => [].forEach.call(a, ei => ei ? ei.classList.add(v) : void 0);
  r.removeclassu = v => [].forEach.call(a, ei => ei ? ei.classList.remove(v) : void 0);
  /* </Add, Remove classes to elements> */

  /* <Apply styles to elements> */
  r.cssu = v => [].forEach.call(a, ei => ei ? [].forEach.call(Object.keys(v), eii => v.hasOwnProperty(eii) ? ei.style[eii] = v[eii] : void 0) : void 0);
  /* </Apply styles to elements> */

  return r;
};

hex.devu = () => '//\\v0.0.240903';

/* <Creating an element with a class> */
hex.crtu = va => {
  const { t, c, e, p } = va; //\ tag, class, element, parent

  va.ns = 'http://www.w3.org/2000/svg'; //\ Namespace
  va.clone = document.createElementNS(va.ns, 'g');

  va.e = t.match(/svg/) ? document.createElementNS('http://www.w3.org/2000/svg', t) : document.createElement(t);

  c.length ? [].forEach.call(c.split(' '), ei => va.e.classList.add(ei)) : void 0;

  if (e.match(/^<.*>$/)) va.e.innerHTML = e;
  else va.e.textContent = e;

  if (typeof p === 'object') p.appendChild(va.e);
  else p.length ? document.querySelector(p).appendChild(va.e) : document.body.appendChild(va.e);

  return va.e;
};
/* </Creating an element with a class> */

/* <Creating an element with a class> */
hex.attu = va => {
  const { t, c, e, p } = va; //\ tag, class, element, parent

  va.p = typeof p === 'object' ? p : p.length ? document.querySelector(p) : document.body;
  if (typeof e === 'object') {
    if (t.match(/svg|g/)) {
      va.c = document.createElementNS('http://www.w3.org/2000/svg', t);

      [].forEach.call(e.children, ei => {
        va.ns = document.createElementNS('http://www.w3.org/2000/svg', ei.nodeName);
        [].forEach.call(ei.attributes, eii => va.ns.setAttribute(eii.name, eii.value));
        va.c.appendChild(va.ns.cloneNode(true));
      });

    } else {
      va.c = document.createElement(t)
    }

    c.length ? [].forEach.call(c.split(' '), ei => va.c.classList.add(ei)) : void 0;

    va.p.appendChild(va.c);

  } else {
    if (e.match(/^<.*>$/)) va.p.innerHTML = e;
    else va.p.textContent = e;
  }

  return e;
};
/* </Creating an element with a class> */

/* <Import the module.> */
hex.importmoduleu = async v => {
  try {
    const s = v.match(/([^\/]+)\.[^\.]+$/)[1];
    if (hex[s]) return;

    const m = await import(v);
    hex[`${s}m`] = m.default;

  } catch (e) {
    console.log('There was a problem with the import operation:', e);
  }
};
/* </Import the module.> */

/* <Loading FONT> */
hex.loadfontu = async v => {
  try {
    const s = v.match(/([^\/]+)\.[^\.]+$/)[1];
    const font = new FontFace(s, `url(${v})`);

    const loadedFont = await font.load();
    document.fonts.add(loadedFont);
    document.body.style.fontFamily = `${s}, sans-serif`;
  } catch (e) {
    console.log('Failed to load font:', e);
  }
}
/* <Loading FONT> */

/* <Loading and parsing XML> */
hex.xml = {};
hex.xml.svgu = va => {
  const { e } = va;

  va.a = e.attributes;
  va.p = `${va.a.p.value}/${va.a.i.value}.${va.a.x.value}`;

  (async () => {
    await hex.loadsvgu(va.p);
    hex.attu({ t: 'g', c: `${hex.svga.cls} ${va.a.i.value}`, e: hex.svga[va.a.i.value], p: '.fgs>svg.prop' }); //\ need to append a path element to a g (group) element in SVG
  })();
};

hex.parsexmlu = va => {
  const { e, s } = va;
  hex.svga.cls = s;
  [].forEach.call(e.querySelectorAll('prop'), ei => hex.xml[`${ei.getAttribute('x')}u`]({ e : ei }));
};

hex.loadxmlu = async v => {
  try {
    const response = await fetch(v);
    if (!response.ok) { throw new Error('Network response was not ok'); }
    const text = await response.text();

    const parser = new DOMParser();
    const doc = parser.parseFromString(text, 'application/xml');
    const s = v.match(/([^\/]+)\.[^\.]+$/)[1];
    hex.parsexmlu({ e: doc, s: s });

  } catch (e) {
    console.log('There was a problem with the fetch operation:', e);
  }
};
/* </Loading and parsing XML> */

/* <Loading and parsing SVG> */
hex.svga = {};
hex.loadsvgu = async v => {
  try {
    const s = v.match(/([^\/]+)\.[^\.]+$/)[1];
    if(hex.svga[s]) return;

    const response = await fetch(v);
    if (!response.ok) { throw new Error('Network response was not ok'); }

    const text = await response.text();

    const parser = new DOMParser();
    const doc = parser.parseFromString(text, 'image/svg+xml');

    hex.svga[s] = doc.querySelector('g');
    
  } catch (e) {
    console.error('Error loading SVG:', e);
  }
};
/* </Loading and parsing SVG> */
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

  va.p = typeof p === 'object' ? p : p.length ? document.querySelector(p) : document.body;
  va.e = t.match(/svg|g/) ? document.createElementNS('http://www.w3.org/2000/svg', t) : document.createElement(t);

  c.length ? [].forEach.call(c.split(' '), e => va.e.classList.add(e)) : void 0;

  if (e.match(/^<.*>$/)) va.e.innerHTML = e;
  else va.e.textContent = e;

  va.p.appendChild(va.e);
 
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

/* <parsing XML> */
hex.xml = {};
hex.xml.svgu = va => {
  const { e, c, p } = va;

  va.a = e.attributes;
  va.p = va.a.p.value.length ? va.a.p.value : p;
  
  if(va.a.u.value.length) {
    va.u = `${va.a.u.value}/${va.a.i.value}.${va.a.x.value}`;

    (async () => {
      va.ei = hex.crtu({ t: 'g', c: `${c} ${va.a.i.value}`, e: '', p: va.p });
      await hex.loadfetchu({ u: va.u, p: va.ei });
    })();
  } else {
    va.ei = document.querySelector(`svg.${va.a.i.value}`);
    if(!va.ei) { hex.crtu({ t: 'svg', c: va.a.i.value, e: '', p: va.p }); }
  }
};

hex.xml.htmlu = va => {
  const { e, c, p } = va;

  va.a = e.attributes;
  va.p = va.a.p.value.length ? va.a.p.value : p;

  if(va.a.u.value.length) {
    va.u = `${va.a.u.value}/${va.a.i.value}.${va.a.x.value}`;

    (async () => {
      va.ei = hex.crtu({ t: 'div', c: `${c} ${va.a.i.value}`, e: '', p: va.p });
      await hex.loadfetchu({ u: va.u, p: va.ei });
    })();
  } else {
    va.ei = document.querySelector(`${va.a.x.value}.${va.a.i.value}`);
    if(!va.ei) { hex.crtu({ t: 'div', c: va.a.i.value, e: '', p: va.p }); }
  }
};

hex.parsexmlu = va => {
  const { e, c, p } = va;

  [].forEach.call(e.querySelectorAll('prop'), e => hex.xml[`${e.getAttribute('x')}u`]({ e: e, c: c, p: p }));
};
/* </parsing XML> */

/* <asynchronously loads an HTML, XML or SVG file> */
hex.htmlu = va => va.p.innerHTML = va.e;
hex.svgu = va => va.p.innerHTML = va.e;
hex.xmlu = va => {
  const { e, c, p } = va;

  va.p = new DOMParser();
  va.d = va.p.parseFromString(e, 'application/xml');
  hex.parsexmlu({ e: va.d, c: c, p: p });
};

hex.loadfetchu = async va => { //\ url, parent
  const { u, p } = va;

  va.p = typeof p === 'object' ? p : p.length ? document.querySelector(p) : document.body;
  va.c = u.match(/([^\/]+)\.[^\.]+$/)[1];
  va.e = u.match(/.*\.(\w+)$/)[1];

  await fetch(u)
    .then(e => { if(!e.ok) { throw new Error('Network response was not ok'); } return e.text(); })
    .then(e => hex[`${va.e}u`]({ e: e, c: va.c, p: va.p }) )
    .catch(e => console.error('There was a problem with the fetch operation:', e));
};
/* </asynchronously loads an HTML, XML or SVG file> */

/* <load a CSS> */
hex.loadcssu = v => {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.type = 'text/css';
  link.href = v;

  document.head.appendChild(link);
};
/* </load a CSS> */
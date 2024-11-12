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
hex.crtu = v => {
  const { t, c, e, p } = v; //\ tag, class, element, parent

  v.p = typeof p === 'object' ? p : p.length ? document.querySelector(p) : document.body;
  v.e = t.match(/svg|g/) ? document.createElementNS('http://www.w3.org/2000/svg', t) : document.createElement(t);

  c.length ? [].forEach.call(c.split(' '), e => v.e.classList.add(e)) : void 0;

  if (e.match(/^<.*>$/)) v.e.innerHTML = e;
  else v.e.textContent = e;

  v.p.appendChild(v.e);
 
  return v.e;
};
/* </Creating an element with a class> */

/* <Creating an element with a class> */
hex.attu = v => {
  const { t, c, e, p } = v; //\ tag, class, element, parent

  v.p = typeof p === 'object' ? p : p.length ? document.querySelector(p) : document.body;
  if (typeof e === 'object') {
    if (t.match(/svg|g/)) {
      v.c = document.createElementNS('http://www.w3.org/2000/svg', t);

      [].forEach.call(e.children, ei => {
        v.ns = document.createElementNS('http://www.w3.org/2000/svg', ei.nodeName);
        [].forEach.call(ei.attributes, eii => v.ns.setAttribute(eii.name, eii.value));
        v.c.appendChild(v.ns.cloneNode(true));
      });

    } else {
      v.c = document.createElement(t)
    }

    c.length ? [].forEach.call(c.split(' '), ei => v.c.classList.add(ei)) : void 0;

    v.p.appendChild(v.c);

  } else {
    if (e.match(/^<.*>$/)) v.p.innerHTML = e;
    else v.p.textContent = e;
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
hex.xml.svgu = v => {
  const { e, c, p } = v;

  v.a = e.attributes;
  v.p = v.a.p.value.length ? v.a.p.value : p;
  
  if(v.a.u.value.length) {
    v.u = `${v.a.u.value}/${v.a.i.value}.${v.a.x.value}`;

    (async () => {
      v.ei = hex.crtu({ t: 'g', c: `${c} ${v.a.i.value}`, e: '', p: v.p });
      await hex.loadfetchu({ u: v.u, p: v.ei });
    })();
  } else {
    v.ei = document.querySelector(`svg.${v.a.i.value}`);
    if(!v.ei) { hex.crtu({ t: 'svg', c: v.a.i.value, e: '', p: v.p }); }
  }
};

hex.xml.htmlu = v => {
  const { e, c, p } = v;

  v.a = e.attributes;
  v.p = v.a.p.value.length ? v.a.p.value : p;

  if(v.a.u.value.length) {
    v.u = `${v.a.u.value}/${v.a.i.value}.${v.a.x.value}`;

    (async () => {
      v.ei = hex.crtu({ t: 'div', c: `${c} ${v.a.i.value}`, e: '', p: v.p });
      await hex.loadfetchu({ u: v.u, p: v.ei });
    })();
  } else {
    v.ei = document.querySelector(`${v.a.x.value}.${v.a.i.value}`);
    if(!v.ei) { hex.crtu({ t: 'div', c: v.a.i.value, e: '', p: v.p }); }
  }
};

hex.parsexmlu = v => {
  const { e, c, p } = v;

  [].forEach.call(e.querySelectorAll('prop'), e => hex.xml[`${e.getAttribute('x')}u`]({ e: e, c: c, p: p }));
};
/* </parsing XML> */

/* <asynchronously loads an HTML, XML or SVG file> */
hex.htmlu = v => v.p.innerHTML = v.e;
hex.svgu = v => v.p.innerHTML = v.e;
hex.xmlu = v => {
  const { e, c, p } = v;

  v.p = new DOMParser();
  v.d = v.p.parseFromString(e, 'application/xml');
  hex.parsexmlu({ e: v.d, c: c, p: p });
};

hex.loadfetchu = async v => { //\ url, parent
  const { u, p } = v;

  v.p = typeof p === 'object' ? p : p.length ? document.querySelector(p) : document.body;
  v.c = u.match(/([^\/]+)\.[^\.]+$/)[1];
  v.e = u.match(/.*\.(\w+)$/)[1];

  await fetch(u)
    .then(e => { if(!e.ok) { throw new Error('Network response was not ok'); } return e.text(); })
    .then(e => hex[`${v.e}u`]({ e: e, c: v.c, p: v.p }) )
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
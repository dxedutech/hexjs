const hex = e => {
  const a = e === undefined ? [] : typeof e === 'string' ? document.querySelectorAll(e) : Array.isArray(e) ? e : [e];
  const r = {};

  /* <Store color values> */
  const clra = {
    r: '#dae',
    g: '#aed',
    y: '#eda'
  };
  r.r = clra.r;
  r.g = clra.g;
  r.y = clra.y;
  /* </Store color values> */

  /* <add classes to elements> */
  const addClassu = v => {
    [].forEach.call(a, e => {
      if (e) {
        e.classList.add(v);
      } else {
        console.warn('//\\Element not found:', e);
      }
    });
  };
  r.addClassu = addClassu;
  /* </Add classes to elements> */

  /* <Apply styles to elements> */
  const cssu = v => {
    [].forEach.call(a, e => {
      if (e) {
        for (const key in v) {
          if (v.hasOwnProperty(key)) { e.style[key] = v[key];}
        }
      } else {
        console.warn('//\\Element not found:', e);
      }
    });
  };
  r.cssu = cssu;
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

  if (c.length) va.e.classList.add(c);

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

      [].forEach.call(e.children, e => {
        va.ns = document.createElementNS('http://www.w3.org/2000/svg', e.nodeName);
        [].forEach.call(e.attributes, e => va.ns.setAttribute(e.name, e.value));
        va.c.appendChild(va.ns.cloneNode(true));
      });

    } else {
      va.c = document.createElement(t)
    }

    if (c.length) va.c.classList.add(c);

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

/* <Loading and parsing XML> */
hex.xml = {};
hex.xml.svgu = va => {
  const { e } = va;
  console.log(e);
};

hex.parsexmlu = v => {
  const a = v.querySelectorAll('feed');
  [].forEach.call(a, e => hex.xml[`${e.getAttribute('x') }u`]({e : e}));
};

hex.loadxmlu = async v => {
  try {
    const response = await fetch(v);
    if (!response.ok) { throw new Error('Network response was not ok'); }
    const text = await response.text();

    const parser = new DOMParser();
    const doc = parser.parseFromString(text, 'application/xml');
    hex.parsexmlu(doc);

  } catch (e) {
    console.log('There was a problem with the fetch operation:', e);
  }
};
/* </Loading and parsing XML> */

/* <Loading and parsing SVG> */
hex.svgs = {};
hex.loadsvgu = async v => {
  try {
    const s = v.match(/([^\/]+)\.[^\.]+$/)[1];
    if(hex.svgs[s]) return;

    const response = await fetch(v);
    if (!response.ok) { throw new Error('Network response was not ok'); }

    const text = await response.text();

    const parser = new DOMParser();
    const doc = parser.parseFromString(text, 'image/svg+xml');

    hex.svgs[s] = doc.querySelector('g');

  } catch (e) {
    console.error('Error loading SVG:', e);
  }
};
/* </Loading and parsing SVG> */
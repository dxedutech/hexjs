const hex = e => {
  const a = e === undefined ? [] : typeof e === 'string' ? document.querySelectorAll(e) : Array.isArray(e) ? e : [e];
  const r = {};

  /* <Store color values> */
  const colors = {
    r: '#dae',
    g: '#aed',
    y: '#eda'
  };
  r.r = colors.r;
  r.g = colors.g;
  r.y = colors.y;
  /* </Store color values> */

  /* <Apply styles to elements> */
  const style = (styles) => {
    [].forEach.call(a, e => {
      if (e) {
        for (const key in styles) {
          if (styles.hasOwnProperty(key)) { e.style[key] = styles[key];}
        }
      } else {
        console.warn('//\\Element not found:', e);
      }
    });
  };
  r.style = style;
  /* </Apply styles to elements> */

  /* <add classes to elements> */
  const addClass = (className) => {
    [].forEach.call(a, e => {
      if (e) {
        e.classList.add(className);
      } else {
        console.warn('//\\Element not found:', e);
      }
    });
  };
  r.addClass = addClass;
  /* </Add classes to elements> */

  return r;
};

hex.devu = () => '//\\v0.0.240903';

/* <Creating an element with a class> */
hex.create = v => {
  const { t, c, e, p } = v; //\ tag, class, element, parent

  const svgNamespace = 'http://www.w3.org/2000/svg';
  const gClone = document.createElementNS(svgNamespace, 'g');

  v.e = t.match(/svg/) ? document.createElementNS('http://www.w3.org/2000/svg', t) : document.createElement(t);

  if (c.length) v.e.classList.add(c);

  if (e.match(/^<.*>$/)) v.e.innerHTML = e;
  else v.e.textContent = e;

  if (typeof p === 'object') p.appendChild(v.e);
  else p.length ? document.querySelector(p).appendChild(v.e) : document.body.appendChild(v.e);

  return v.e;
};
/* </Creating an element with a class> */

/* <Creating an element with a class> */
hex.setatt = v => {
  const { e, n, s } = v;

  if (n.getAttribute(s)) e.setAttribute(s, n.getAttribute(s));
};
hex.attach = v => {
  const { t, c, e, p } = v; //\ tag, class, element, parent

  v.p = typeof p === 'object' ? p : p.length ? document.querySelector(p) : document.body;
  if (typeof e === 'object') {
    if (t.match(/svg|g/)) {
      v.c = document.createElementNS('http://www.w3.org/2000/svg', t);

      [].forEach.call(e.children, e => {
        v.ns = document.createElementNS('http://www.w3.org/2000/svg', e.nodeName);
        [].forEach.call(e.attributes, e => v.ns.setAttribute(e.name, e.value));
        v.c.appendChild(v.ns.cloneNode(true));
      });

    } else {
      v.c = document.createElement(t)
    }

    if (c.length) v.c.classList.add(c);

    v.p.appendChild(v.c);

  } else {
    if (e.match(/^<.*>$/)) v.p.innerHTML = e;
    else v.p.textContent = e;
  }

  return e;
};
/* </Creating an element with a class> */

/* <Import the module.> */
hex.loadModule = async (url) => {
  try {
    const s = url.match(/([^\/]+)\.[^\.]+$/)[1];
    if (hex[s]) return;

    const m = await import(url);
    hex[s] = m.default;

  } catch (e) {
    console.log('There was a problem with the import operation:', e);
  }
};
/* </Import the module.> */

/* <Loading and parsing XML> */
hex.xml = {};
hex.xml.svg = v => {
  const { e } = v;
  console.log(e);
};

hex.parseXML = (xml) => {
  const a = xml.querySelectorAll('feed');
  [].forEach.call(a, e => hex.xml[e.getAttribute('x')]({e : e}));
};

hex.loadXMLDoc = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) { throw new Error('Network response was not ok'); }
    const text = await response.text();

    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(text, 'application/xml');
    hex.parseXML(xmlDoc);

  } catch (e) {
    console.log('There was a problem with the fetch operation:', e);
  }
};
/* </Loading and parsing XML> */

/* <Loading and parsing SVG> */
hex.svgs = {};
hex.loadSVG = async (url) => {
  try {
    const s = url.match(/([^\/]+)\.[^\.]+$/)[1];
    if(hex.svgs[s]) return;

    const response = await fetch(url);
    if (!response.ok) { throw new Error('Network response was not ok'); }

    const text = await response.text();

    const parser = new DOMParser();
    const svgDoc = parser.parseFromString(text, 'image/svg+xml');

    hex.svgs[s] = svgDoc.querySelector('g');

  } catch (e) {
    console.error('Error loading SVG:', e);
  }
};
/* </Loading and parsing SVG> */
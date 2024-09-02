const hex = e => {
  const a = e === undefined ? [] : typeof e === 'string' ? document.querySelectorAll(e) : Array.isArray(e) ? e : [e];

  /* <Create an object to store color values> */
  const colors = {
    primary: '#007bff', // Example primary blue color
    secondary: '#6c757d', // Example secondary gray color
    success: '#28a745', // Example green color
    danger: '#dc3545', // Example red color
    // ... add more categories as needed
  };
  /* </Create an object to store color values> */

  /* <Create a function to apply styles to elements> */
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
  /* </Create a function to apply styles to elements> */

  /* <Create a function to add classes to elements> */
  const addClass = (className) => {
    [].forEach.call(a, e => {
      if (e) {
        e.classList.add(className);
      } else {
        console.warn('//\\Element not found:', e);
      }
    });
  };
  /* </Create a function to add classes to elements> */

  // Return an object with the 'style' and 'addClass' functions and access to colors
  return {
    style,
    addClass,
    primary: colors.primary,
    secondary: colors.secondary,
    success: colors.success,
    danger: colors.danger,
    // ... add more color properties as needed
  };
};

hex.create = v => {
  const { t, c, e, p } = v; //\ tag, class, element, parent

  v.e = t.match(/svg/) ? document.createElementNS('http://www.w3.org/2000/svg', t) : document.createElement(t);

  if(c.length) v.e.classList.add(c);

  if(e.match(/^<.*>$/)) v.e.innerHTML = e;
  else v.e.textContent = e;

  if(typeof p === 'object') p.appendChild(v.e);
  else p.length ? document.querySelector(p).appendChild(v.e) : document.body.appendChild(v.e);
  
  return v.e;
}

hex.xml = {};
hex.xml.svg = v => {
  const { e } = v;
  console.log(e);
};

hex.parseXML = (xml) => {
  const a = xml.querySelectorAll('feed');
  [].forEach.call(a, e => hex.xml[e.getAttribute('x')]({e : e}));
};

hex.loadXMLDoc = async (filename) => {
  try {
    const response = await fetch(filename);
    if (!response.ok) { throw new Error('Network response was not ok'); }
    const text = await response.text();

    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(text, 'application/xml');
    hex.parseXML(xmlDoc);
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }
};
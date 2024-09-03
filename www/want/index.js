
(v => {
  const { x, p } = v;

  v.e = document.querySelector(`.${p.join('.')}`);
  if(v.e !== null) return;

  v.p = x.create({ t: 'div', c: p[0], e:'', p: '' });
  x.create({ t: 'div', c: '', e:'<span>TANGRAM</span>', p: v.p });
  x(v.p).addClass(p[1]);
  
  x(v.p).style({ color: x().secondary });
  
  // Example using a more complex selector
  x('.bed span').style({ fontSize: '20px', fontWeight: 'bold' });
  
  const b = x.create({ t: 'button', c: '', e:'TANGRAM', p: v.p });
  // Use the 'hex' function to apply styles and add classes
  x(b).style({
    backgroundColor: x(b).primary,
    color: '#fff',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  });
  
  // Add a class to the button
  x(b).addClass('color');


  v.e = x.create({ t: 'svg', c: 'box', e:'<path d="M10 10 H 90 V 90 H 10 L 10 10" stroke="#fff" fill="transparent"/>', p: v.p });
  v.e.setAttribute('width', '800');
  v.e.setAttribute('height', '800');

  x.loadXMLDoc('/www/want/index.xml');

  x.loadModule('/www/ware/tangram.js');
  x.tangram.devu
})({ x: hex, p: ['bed', 'tangram'] })
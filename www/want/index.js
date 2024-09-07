(v => {
  const { x, p, wh } = v;

  v.e = document.querySelector(`.${p.join('.')}`);
  if(v.e !== null) return;

  /* .bed */
  v.bed = x.create({ t: 'div', c: p[0], e: '', p: '' });
  // x(v.bed).style({ width: `${wh.w}px`, height: `${wh.h}px` });
  x(v.bed).addClass(p[1]);  // Add a class to the button

  /* sheet */
  v.sheet = x.create({ t: 'div', c: 'sheet', e: '', p: v.bed });
  x(v.sheet).addClass('bgs');

  /* svg */
  v.e = x.create({ t: 'svg', c: 'box', e: '<g><path d="M10 10 H 90 V 90 H 10 L 10 10" stroke="#fff" fill="transparent"/></g>', p: v.sheet });
  v.e.setAttribute('width', '800');
  v.e.setAttribute('height', '800');

  /* sheet */
  v.sheet = x.create({ t: 'div', c: 'sheet', e:'', p: v.bed });
  x(v.sheet).addClass('fgs');

  x.create({ t: 'div', c: 'fg', e: '무궁화꽃이', p: v.sheet });
  x.create({ t: 'div', c: 'fg', e: '피었습니다', p: v.sheet });

  /* svg */
  v.e = x.create({ t: 'svg', c: 'prop', e: '', p: v.sheet });
  v.e.setAttribute('width', '800');
  v.e.setAttribute('height', '800');

  /* sheet */
  v.sheet = x.create({ t: 'div', c: 'sheet', e:'', p: v.bed });
  x(v.sheet).addClass('uis');

  /* button */
  v.b = x.create({ t: 'button', c: '', e: 'TANGRAM', p: v.sheet });
  x(v.b).style({
    backgroundColor: x(v.b).primary,
    color: '#fff', padding: '10px 20px',
    border: 'none', borderRadius: '5px',
    cursor: 'pointer'
  });
  x(v.b).addClass('color');
  
  (async () => { 
    await x.loadXMLDoc('/www/want/index.xml');
    await x.loadModule('/www/ware/tangram.js');
    await x.loadModule('/www/ware/env.js');
  
    x.env.resize({ w: wh.w, h: wh.h });

    await x.loadSVG('/www/wads/prop/tangram.svg');
    x.attach({ t: 'g', c: '', e: x.svgs.tangram, p: '.fgs>svg.prop' }); //\ need to append a path element to a g (group) element in SVG

  })();
})({ x: hex, p: ['bed', 'tangram'], wh: { w: 1080, h: 1080 } })
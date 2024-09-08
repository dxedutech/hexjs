(va => {
  const { x, p, wh } = va;

  va.e = document.querySelector(`.${p.join('.')}`);
  if(va.e !== null) return;

  /* .bed */
  va.bed = x.crtu({ t: 'div', c: p[0], e: '', p: '' });
  // x(va.bed).style({ width: `${wh.w}px`, height: `${wh.h}px` });
  x(va.bed).addClassu(p[1]);  // Add a class to the button

  /* sheet */
  va.sheet = x.crtu({ t: 'div', c: 'sheet', e: '', p: va.bed });
  x(va.sheet).addClassu('bgs');

  /* svg */
  va.e = x.crtu({ t: 'svg', c: 'box', e: '<g><path d="M10 10 H 90 V 90 H 10 L 10 10" stroke="#fff" fill="transparent"/></g>', p: va.sheet });
  va.e.setAttribute('width', '800');
  va.e.setAttribute('height', '800');

  /* sheet */
  va.sheet = x.crtu({ t: 'div', c: 'sheet', e:'', p: va.bed });
  x(va.sheet).addClassu('fgs');

  x.crtu({ t: 'div', c: 'fg', e: '무궁화꽃이', p: va.sheet });
  x.crtu({ t: 'div', c: 'fg', e: '피었습니다', p: va.sheet });

  /* svg */
  va.e = x.crtu({ t: 'svg', c: 'prop', e: '', p: va.sheet });
  va.e.setAttribute('width', '800');
  va.e.setAttribute('height', '800');

  /* sheet */
  va.sheet = x.crtu({ t: 'div', c: 'sheet', e:'', p: va.bed });
  x(va.sheet).addClassu('uis');

  /* button */
  va.css = {
    backgroundColor: x(va.b).g,
    cursor: 'pointer'
  }
  va.ba = x.crtu({ t: 'div', c: 'btns', e: '', p: va.sheet });
  va.b = x.crtu({ t: 'button', c: 'btn', e: '<span>TANGENT</span>', p: va.ba });
  x(va.b).cssu(va.css);
  va.b = x.crtu({ t: 'button', c: 'btn', e: '<span>TANGRAM</span>', p: va.ba });
  x(va.b).cssu(va.css);
  
  (async () => { 
    await x.loadxmlu('/www/want/index.xml');
    await x.importmoduleu('/www/ware/tangram.js');
    await x.importmoduleu('/www/ware/env.js');
  
    x.envm.resizeu({ w: wh.w, h: wh.h });

    await x.loadsvgu('/www/wads/prop/tangram.svg');
    x.attu({ t: 'g', c: '', e: x.svgs.tangram, p: '.fgs>svg.prop' }); //\ need to append a path element to a g (group) element in SVG

  })();
})({ x: hex, p: ['bed', 'tangram'], wh: { w: 1080, h: 1080 } })
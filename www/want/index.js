(v => {
  const { x, c, wh } = v;

  v.e = document.querySelector(c); //\`.${c.replace(/ /g, '.')}`
  if(v.e !== null) return;

  (async () => { 
    await x.loadfontu('/www/wads/fonts/baby_bb33.woff');
    await x.loadfontu('/www/wads/fonts/PlayTangram.woff');
    
    await x.importmoduleu('/www/ware/env.js');
    x.envm.resizeu({ w: wh.w, h: wh.h });
  })();

  /* .bed bi */
  v.bi = x.crtu({ t: 'div', c: c, e: '', p: '' });

  /* sheet si */
  v.si = x.crtu({ t: 'div', c: 'sheet bgs', e: '', p: v.bi });

  v.ei = x.crtu({ t: 'svg', c: 'bg proc', e: '<g class="box"><path d="M0 0 H1080 V1080 H0 L0 0" stroke="#fff4" fill="transparent"/></g>', p: v.si });
  v.ei.setAttribute('width', '1080');
  v.ei.setAttribute('height', '1080');

  /* sheet sj */
  v.sj = x.crtu({ t: 'div', c: 'sheet fgs', e:'', p: v.bi });

  v.ei = x.crtu({ t: 'div', c: 'fg title', e: '', p: v.sj });
  x.crtu({ t: 'div', c: '', e: '무궁화꽃이', p: v.ei });
  x.crtu({ t: 'div', c: '', e: '피었습니다', p: v.ei });

  v.ei = x.crtu({ t: 'svg', c: 'fg prop', e: '', p: v.sj });
  v.ei.setAttribute('width', '1080');
  v.ei.setAttribute('height', '1080');

  /* sheet sk */
  v.sk = x.crtu({ t: 'div', c: 'sheet uis', e:'', p: v.bi });

  v.css = {
    backgroundColor: x(v.b).g,
    cursor: 'none'
  }
  v.ei = x.crtu({ t: 'div', c: 'btns menui', e: '', p: v.sk });
  v.ej = x.crtu({ t: 'button', c: 'btn', e: '<span>TANGENT</span>', p: v.ei });
  x(v.ej).cssu(v.css);
  v.ej = x.crtu({ t: 'button', c: 'btn', e: '<span>TANGRAM</span>', p: v.ei });
  x(v.ej).cssu(v.css);
  
  /* load */
  (async () => { 
    // await x.loadxmlu('/www/want/index.xml');
    await x.loadfetchu({ u: '/www/want/index.xml', p: '.sheet.fgs' })

    v.ei = x.crtu({ t: 'g', c: 'prop tangram', e: '', p: '.sheet.fgs>svg.prop' });
    await x.loadfetchu({ u: '/www/wads/prop/tangram.svg', p: v.ei });
    // await x.loadsvgu('/www/wads/prop/tangram.svg');
    // x.attu({ t: 'g', c: 'tangram', e: x.svga.tangram, p: '.fgs>svg.prop' }); //\ need to append a path element to a g (group) element in SVG
    
    v.ei = x.crtu({ t: 'div', c: 'prop menu', e: '', p: '.sheet.uis' });
    await x.loadcssu('/www/wads/prop/index/menu.css');
    await x.loadfetchu({ u: '/www/wads/prop/index/menu.html', p: v.ei });
    
    v.ei = x.crtu({ t: 'g', c: 'prop index-3-3', e: '', p: '.sheet.fgs>svg.prop' });
    await x.loadfetchu({ u: '/www/wads/prop/index/index-3-3.svg', p: v.ei });

    await x.importmoduleu('/www/ware/tangram.js');
  })();
})({ x: hex, c: 'bed tangram', wh: { w: 1080, h: 1080 } });
//\ serves as an alias for, allowing you to reference the same object with a x.
//\ sets element class name, width, height.
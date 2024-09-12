(va => {
  const { x, c, wh } = va;

  va.e = document.querySelector(c); //\`.${c.replace(/ /g, '.')}`
  if(va.e !== null) return;

  (async () => { 
    await x.loadfontu('/www/wads/fonts/baby_bb33.woff');
    await x.loadfontu('/www/wads/fonts/PlayTangram.woff');
    
    await x.importmoduleu('/www/ware/env.js');
    x.envm.resizeu({ w: wh.w, h: wh.h });
  })();

  /* .bed bi */
  va.bi = x.crtu({ t: 'div', c: c, e: '', p: '' });

  /* sheet si */
  va.si = x.crtu({ t: 'div', c: 'sheet bgs', e: '', p: va.bi });

  va.ei = x.crtu({ t: 'svg', c: 'bg proc', e: '<g class="box"><path d="M0 0 H1080 V1080 H0 L0 0" stroke="#fff4" fill="transparent"/></g>', p: va.si });
  va.ei.setAttribute('width', '1080');
  va.ei.setAttribute('height', '1080');

  /* sheet sj */
  va.sj = x.crtu({ t: 'div', c: 'sheet fgs', e:'', p: va.bi });

  va.ei = x.crtu({ t: 'div', c: 'fg title', e: '', p: va.sj });
  x.crtu({ t: 'div', c: '', e: '무궁화꽃이', p: va.ei });
  x.crtu({ t: 'div', c: '', e: '피었습니다', p: va.ei });

  va.ei = x.crtu({ t: 'svg', c: 'fg prop', e: '', p: va.sj });
  va.ei.setAttribute('width', '1080');
  va.ei.setAttribute('height', '1080');

  /* sheet sk */
  va.sk = x.crtu({ t: 'div', c: 'sheet uis', e:'', p: va.bi });

  va.css = {
    backgroundColor: x(va.b).g,
    cursor: 'none'
  }
  va.ei = x.crtu({ t: 'div', c: 'btns menui', e: '', p: va.sk });
  va.ej = x.crtu({ t: 'button', c: 'btn', e: '<span>TANGENT</span>', p: va.ei });
  x(va.ej).cssu(va.css);
  va.ej = x.crtu({ t: 'button', c: 'btn', e: '<span>TANGRAM</span>', p: va.ei });
  x(va.ej).cssu(va.css);
  
  /* load */
  (async () => { 
    // await x.loadxmlu('/www/want/index.xml');
    await x.loadfetchu({ u: '/www/want/index.xml', p: '.sheet.fgs' })

    va.ei = x.crtu({ t: 'g', c: 'prop tangram', e: '', p: '.sheet.fgs>svg.prop' });
    await x.loadfetchu({ u: '/www/wads/prop/tangram.svg', p: va.ei });
    // await x.loadsvgu('/www/wads/prop/tangram.svg');
    // x.attu({ t: 'g', c: 'tangram', e: x.svga.tangram, p: '.fgs>svg.prop' }); //\ need to append a path element to a g (group) element in SVG
    
    va.ei = x.crtu({ t: 'div', c: 'prop menu', e: '', p: '.sheet.uis' });
    await x.loadcssu('/www/wads/prop/index/menu.css');
    await x.loadfetchu({ u: '/www/wads/prop/index/menu.html', p: va.ei });
    
    va.ei = x.crtu({ t: 'g', c: 'prop index-3-3', e: '', p: '.sheet.fgs>svg.prop' });
    await x.loadfetchu({ u: '/www/wads/prop/index/index-3-3.svg', p: va.ei });

    await x.importmoduleu('/www/ware/tangram.js');
  })();
})({ x: hex, c: '.bed.tangram', wh: { w: 1080, h: 1080 } });
//\ serves as an alias for, allowing you to reference the same object with a x.
//\ sets element class name, width, height.
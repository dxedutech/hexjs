(va => {
  const { x, c, wh } = va;

  va.e = document.querySelector(`.${c.replace(/ /g, '.')}`);
  if(va.e !== null) return;

  /* .bed bi */
  va.bi = x.crtu({ t: 'div', c: c, e: '', p: '' });

  /* sheet si */
  va.si = x.crtu({ t: 'div', c: 'sheet bgs', e: '', p: va.bi });

  va.ei = x.crtu({ t: 'svg', c: 'bg proc', e: '<g class="box"><path d="M10 80 H1000 V1000 H80 L80 80" stroke="#fff" fill="transparent"/></g>', p: va.si });
  va.ei.setAttribute('width', '1080');
  va.ei.setAttribute('height', '1080');

  /* sheet sii */
  va.sii = x.crtu({ t: 'div', c: 'sheet fgs', e:'', p: va.bi });

  va.ei = x.crtu({ t: 'div', c: 'fg title', e: '', p: va.sii });
  x.crtu({ t: 'div', c: '', e: '무궁화꽃이', p: va.ei });
  x.crtu({ t: 'div', c: '', e: '피었습니다', p: va.ei });

  va.ei = x.crtu({ t: 'svg', c: 'fg prop', e: '', p: va.sii });
  va.ei.setAttribute('width', '1080');
  va.ei.setAttribute('height', '1080');

  /* sheet siii */
  va.siii = x.crtu({ t: 'div', c: 'sheet uis', e:'', p: va.bi });

  va.css = {
    backgroundColor: x(va.b).g,
    cursor: 'none'
  }
  va.ei = x.crtu({ t: 'div', c: 'btns menui', e: '', p: va.siii });
  va.eii = x.crtu({ t: 'button', c: 'btn', e: '<span>TANGENT</span>', p: va.ei });
  x(va.eii).cssu(va.css);
  va.eii = x.crtu({ t: 'button', c: 'btn', e: '<span>TANGRAM</span>', p: va.ei });
  x(va.eii).cssu(va.css);
  
  /* load */
  (async () => { 
    await x.loadxmlu('/www/want/index.xml');
    await x.importmoduleu('/www/ware/tangram.js');
    await x.importmoduleu('/www/ware/env.js');
  
    x.envm.resizeu({ w: wh.w, h: wh.h });

    await x.loadsvgu('/www/wads/prop/tangram.svg');
    x.attu({ t: 'g', c: 'tangram', e: x.svgs.tangram, p: '.fgs>svg.prop' }); //\ need to append a path element to a g (group) element in SVG

  })();
})({ x: hex, c: 'bed tangram', wh: { w: 1080, h: 1080 } }) 
//\ serves as an alias for, allowing you to reference the same object with a x.
//\ sets element class name, width, height.
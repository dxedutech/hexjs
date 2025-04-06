(v => {
  const { x, c, wh } = v;

  (async () => { 
    await x.loadfontu('/www/wads/fonts/baby_bb33.woff');
    await x.loadfontu('/www/wads/fonts/PlayTangram.woff');
    
    await x.importmoduleu({ m: '/www/ware/env.js' }); //\ module, index
    x.envm.resizeu({ w: wh.w, h: wh.h });
  })();

  /* .bed //\ */
  v.bed = x.crtu({ t: 'div', c: c, e: '', p: document.querySelector('body>section') });

  /* .sheet.bgs //\ background */
  v.bgs = x.crtu({ t: 'div', c: 'sheet bgs', e: '', p: v.bed });

  v.ei = x.crtu({ t: 'svg', c: 'bg proc', e: `<g class="box"><path d="M0 0 H${wh.w} V${wh.h} H0 L0 0" stroke="#fff4" fill="transparent"/></g>`, p: v.bgs });
  v.ei.setAttribute('width', `${wh.w}`);
  v.ei.setAttribute('height', `${wh.h}`);

  /* .sheet.fgs //\ foreground */
  v.fgs = x.crtu({ t: 'div', c: 'sheet fgs', e:'', p: v.bed });

  v.ei = x.crtu({ t: 'div', c: 'fg title', e: '', p: v.fgs });
  x.crtu({ t: 'div', c: '', e: '무궁화꽃이', p: v.ei });
  x.crtu({ t: 'div', c: '', e: '피었습니다', p: v.ei });

  // v.ei = x.crtu({ t: 'svg', c: 'fg prop', e: '', p: v.fgs });
  // v.ei.setAttribute('width', `${wh.w}`);
  // v.ei.setAttribute('height', `${wh.h}`);

  /* .sheet.uis //\ user-interface */
  v.uis = x.crtu({ t: 'div', c: 'sheet uis', e:'', p: v.bed });

  v.css = { backgroundColor: x(v.b).g, cursor: 'none' }
  v.ei = x.crtu({ t: 'div', c: 'seg btns', e: '', p: v.uis });
  v.ei = x.crtu({ t: 'div', c: '', e: '', p: v.ei });

  v.eii = x.crtu({ t: 'button', c: 'btn nav', e: '<span>KOREAN</span>', p: v.ei });
  v.eii.setAttribute('js', '\'url\': \'korean\', \'type\': \'replace\'');
  x(v.eii).cssu(v.css);
  v.eii = x.crtu({ t: 'button', c: 'btn nav', e: '<span>TANGRAM</span>', p: v.ei });
  v.eii.setAttribute('js', '\'url\': \'tangram\', \'type\': \'replace\'');
  x(v.eii).cssu(v.css);
  // v.eii = x.crtu({ t: 'button', c: 'btn nav', e: '<span>MYRAMYUN</span>', p: v.ei });
  // v.eii.setAttribute('js', '\'url\': \'myramyun\', \'type\': \'replace\'');
  // x(v.eii).cssu(v.css);
  // v.eii = x.crtu({ t: 'button', c: 'btn nav', e: '<span>TEMP</span>', p: v.ei });
  // v.eii.setAttribute('js', '\'url\': \'temp\', \'type\': \'replace\'');
  // x(v.eii).cssu(v.css);

  /* load */
  (async () => { 
    // await x.loadxmlu('/www/want/index.xml');
    // await x.loadfetchu({ u: '/www/want/index.xml', p: '.sheet.fgs' });

    // v.ei = x.crtu({ t: 'g', c: 'prop tangram', e: '', p: '.sheet.fgs>svg.prop' });
    // await x.loadfetchu({ u: '/www/wads/prop/tans.svg', p: v.ei });
    // await x.loadsvgu('/www/wads/prop/tangram.svg');
    // x.attu({ t: 'g', c: 'tangram', e: x.svga.tangram, p: '.fgs>svg.prop' }); //\ need to append a path element to a g (group) element in SVG
    
    // v.ei = x.crtu({ t: 'div', c: 'prop menu', e: '', p: '.sheet.uis' });
    // await x.loadcssu('/www/wads/prop/index/menu.css');
    // await x.loadfetchu({ u: '/www/wads/prop/index/menu.html', p: v.ei });
    
    // v.ei = x.crtu({ t: 'g', c: 'prop index-3-3', e: '', p: '.sheet.fgs>svg.prop' });
    // await x.loadfetchu({ u: '/www/wads/prop/index/index-3-3.svg', p: v.ei });

    await x.importmoduleu({ m: '/www/ware/btn.js' }); //\ module, index
  })();
})({ x: hex, c: 'scene', wh: { w: 1280, h: 1280 } });
//\ serves as an alias for, allowing you to reference the same object with a x.
//\ sets element class name, width, height.
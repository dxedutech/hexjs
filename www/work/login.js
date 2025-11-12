(v => {
  const { x, c, wh } = v;

  (async () => { 
    await x.loadfontu('/www/with/fonts/baby_bb33.woff');
    await x.loadfontu('/www/with/fonts/PlayTangram.woff');
    
    await x.importmoduleu({ m: '/www/ware/env.js' }); //\ module, index
    x.envm.resizeu({ w: wh.w, h: wh.h });
  })();

  /* .scene */
  v.scene = x.crtu({ t: 'div', c: c, e: '', p: document.querySelector('body>section') });

  /* .sheet.bgs */
  v.bgs = x.crtu({ t: 'div', c: 'sheet bgs', e: '', p: v.scene });

  v.ei = x.crtu({ t: 'svg', c: 'bg proc', e: `<g class="box"><path d="M0 0 H${wh.w} V${wh.h} H0 L0 0" stroke="#fff4" fill="transparent"/></g>`, p: v.bgs });
  v.ei.setAttribute('width', `${wh.w}`);
  v.ei.setAttribute('height', `${wh.h}`);

  /* .sheet.fgs */
  v.fgs = x.crtu({ t: 'div', c: 'sheet fgs', e: '', p: v.scene });

  v.ei = x.crtu({ t: 'div', c: 'fg title', e: '', p: v.fgs });
  x.crtu({ t: 'div', c: '', e: '<div>LOGIN</div>', p: v.ei });

  v.d = `
  <form action="/login" method="POST" class="login-form">
    <div>
      <label for="email">Email</label>
      <input type="email" id="email" name="email" required />
    </div>
    <div>
      <label for="password">Password</label>
      <input type="password" id="password" name="password" required />
    </div>
    <div>
      <button type="submit">LOGIN</button>
    </div>
  </form>
  `;
  v.ei = x.crtu({ t: 'div', c: 'fg forms', e: '', p: v.fgs });
  v.ei.innerHTML = v.d;

  // v.ei.setAttribute('width', `${wh.w}`);
  // v.ei.setAttribute('height', `${wh.h}`);

  /* .sheet.uis */
  v.uis = x.crtu({ t: 'div', c: 'sheet uis', e:'', p: v.scene });

  v.css = { backgroundColor: x(v.b).g, cursor: 'none' }
  v.ei = x.crtu({ t: 'div', c: 'seg btns', e: '', p: v.uis });
  v.ei = x.crtu({ t: 'div', c: '', e: '', p: v.ei });

  v.eii = x.crtu({ t: 'button', c: 'btn nav', e: '<span>HOME</span>', p: v.ei });
  v.eii.setAttribute('js', '\'url\': \'index\', \'type\': \'replace\'');
  x(v.eii).cssu(v.css);

  /* load */
  (async () => { 
    await x.loadfetchu({ u: '/www/work/login.xml', p: '.sheet.fgs' });

    // v.ei = x.crtu({ t: 'g', c: 'prop tangram', e: '', p: '.sheet.fgs>svg.prop' });
    // await x.loadfetchu({ u: '/www/with/prop/tans.svg', p: v.ei });
    // await x.loadsvgu('/www/with/prop/tangram.svg');
    // x.attu({ t: 'g', c: 'tangram', e: x.svga.tangram, p: '.fgs>svg.prop' }); //\ need to append a path element to a g (group) element in SVG
    
    // v.ei = x.crtu({ t: 'div', c: 'prop menu', e: '', p: '.sheet.uis' });
    // await x.loadcssu('/www/with/prop/index/menu.css');
    // await x.loadfetchu({ u: '/www/with/prop/index/menu.html', p: v.ei });
    
    // v.ei = x.crtu({ t: 'g', c: 'prop index-3-3', e: '', p: '.sheet.fgs>svg.prop' });
    // await x.loadfetchu({ u: '/www/with/prop/index/index-3-3.svg', p: v.ei });

    await x.importmoduleu({ m: '/www/ware/btn.js' }); //\ module, index
  })();
})({ x: hex, c: 'scene', wh: { w: 1280, h: 1280 } });
//\ serves as an alias for, allowing you to reference the same object with a x.
//\ sets element class name, width, height.
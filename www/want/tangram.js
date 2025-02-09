
const romannuma = ['x', 'xi', 'xii', 'xiii', 'xiv', 'xv', 'xvi', 'xvii', 'xviii', 'xix', 'xx'];

const pathparseu = v => { /* path parser */
  const { d } = v;

  v.m = d.match(/[a-zA-Z](-?\d+(\.\d+)?),(-?\d+(\.\d+)?)/g);
  // v.pa = v.m ? v.m.map(e => e.match(/-?\d+(\.\d+)?/g).map(Number) * 1000) : [];
  v.pa = v.m ? v.m.map(e => e.match(/-?\d+(\.\d+)?/g).map(num => Math.round(parseFloat(num)*100)/100)) : [];

  return { pa: v.pa };
};

const pathdu = v => {/* path d */
  const { pa } = v;

  v.d = pa.map((e, i) => {
    v.e = [Math.round(e[0]*100)/100, Math.round(e[1]*100)/100];
    return (i === 0 ? 'M' : 'L') + v.e.join(',');
  }).join(' ') + ' Z';

  return { d: v.d };
};

const distanceu = v =>  {
  const { xy } = v;

  v.dx = xy.cx - xy.sx;
  v.dy = xy.cy - xy.sy;
  return { dx: v.dx, dy: v.dy, d: Math.sqrt(v.dx*v.dx + v.dy*v.dy) };
};

const rotateu = v =>  { 
  const { ox, oy, x, y, a } = v;

  v.r = (Math.PI/180)*a;
  v.c = Math.cos(v.r);
  v.s = Math.sin(v.r);
  v.x = (v.c * (x - ox)) + (v.s * (y - oy)) + ox;
  v.y = (v.c * (y - oy)) - (v.s * (x - ox)) + oy;

  return [v.x, v.y];
};

const closepointu = v => {
  const { a, b } = v;

  v.o = { x: 0, y: 0, d: void 0 }; //\\offset
  for (v.a of a) {
    for (v.b of b) {
      v.x = v.a[0] - v.b[0];
      v.y = v.a[1] - v.b[1];
      v.d = Math.sqrt(Math.pow(v.x, 2) + Math.pow(v.y, 2));
      if (v.d < 11) {
        v.o.x = v.x;
        v.o.y = v.y;
        v.o.d = v.d;
        break;
      }
    }
  }

  return v.o;
};

const btnstangram = {
  coloru: v => {
    const { e, o, w } = v;

    v.c = e.className.match(/on/) ? '#000' : void 0;
    [].forEach.call(Object.keys(o), k => o[k].e.setAttribute('fill', v.c || o[k].fill ));
    e.classList.toggle('on');
  },
  addu: v => {
    const { e, o, w } = v;

    v.c = e.className.match(/on/) ? 'none' : 'block';
    v.e = document.querySelector('.sheet.fgs .seg.tangram .tans.xi');
    v.e.style.display = v.c;
    e.classList.toggle('on');
  },
  resetu: v => {
    const { e, o, w } = v;

    [].forEach.call(Object.keys(o), k => o[k].e.setAttribute('d', o[k].d));
  },
  magneticu: v => {
    const { e, o, w } = v;

    v.n = []; //\\ gride point [[0,0], [128,0]... [1280,1280]]
    for(i = 0; i < 121; i++){
      v.x = (i%11);
      v.y = parseInt(i/11);
      
      if ((v.x%10)*(v.y%10)) { v.n.push([v.x*128, v.y*128 - 2]); }
    }

    v.a = [[], []];
    [].forEach.call(Object.keys(o), k => { //\\ gride alignment
      v.d = o[k].e.getAttribute('d');
      if (v.d !== o[k].d) { //\\ o[k].d is init position
        v.o = closepointu({ a: v.n, b: o[k].pa });

        if (v.o.d) {
          if (v.o.d !== 0) {
            v.pa = o[k].pa.map(e => [e[0] + v.o.x,  e[1] + v.o.y]);
            v.r = pathdu({ pa: v.pa });
            o[k].pa = v.pa;
            o[k].e.setAttribute('d', v.r.d);
          }
          if (v.a[0].indexOf(k) < 0) v.a[0].push(k);

        } else {
          if (v.o.d === 0) { if (v.a[0].indexOf(k) < 0) v.a[0].push(k); }
          else { if (v.a[1].indexOf(k) < 0) v.a[1].unshift(k); }
        }
      }
    });
    
    v.l = document.querySelector('.sheet.fgs .seg.tangram .tans.xi').style.display === 'none' ? 7 : 14;
    for (let i = 0; i < v.l; i++) {
      v.a.push([]);
      [].forEach.call(v.a[i + 1], k => {
        [].forEach.call(v.a[0], s => { //\\ tan-by-tan alignment
          if (k !== s) {
            v.o = closepointu({ a: o[s].pa, b: o[k].pa });
  
            if (v.o.d) {
              if (v.o.d !== 0) {
                v.pa = o[k].pa.map(e => [e[0] + v.o.x,  e[1] + v.o.y]);
                v.r = pathdu({ pa: v.pa });
                o[k].pa = v.pa;
                o[k].e.setAttribute('d', v.r.d);             
              }
              if (v.a[0].indexOf(k) < 0) v.a[0].push(k);
  
            } else {
              if (v.o.d === 0) { if (v.a[0].indexOf(k) < 0) v.a[0].push(k); }
              else { if (v.a[i + 2].indexOf(k) < 0) v.a[i + 2].unshift(k); }
            }
          }
        });
      });

      if(v.a[0].length === v.l) break;
    }
    // console.log(v.a);
  },
  grideu: v => {
    const { e, o, w } = v;

    v.c = e.className.match(/on/) ? 'none' : 'block';
    v.e = document.querySelector('.sheet.uis .seg.gride');
    v.e.style.display = v.c;
    v.e = document.querySelector('.sheet.bgs .bg-title');
    v.e.style.display = v.c;

    e.classList.toggle('on');
  },
  saveu: v => {
    const { e, o, w } = v;

  }
};


(v => {
  const { x, a, o, i, w } = v;

  (async () => { 
    await x.loadfontu('/www/wads/fonts/baby_bb33.woff');
    await x.loadfontu('/www/wads/fonts/PlayTangram.woff');
    
    await x.importmoduleu({ m: '/www/ware/env.js' }); //\ module, index
    x.envm.resizeu({ w: w.wh.w, h: w.wh.h });

    await x.loadfetchu({ u: '/www/want/tangram.xml', p: '.sheet.bgs' });

    // w.r = x.envm.r;
    // w.hv = x.envm.hv;

    const drag = {
      startu: e => {
        e.preventDefault();
        
        w.r = x.envm.r;
        w.hv = x.envm.hv;

        i.c = `.${e.target.classList.value.replace(/\s/, '.')}`;
        [].forEach.call(Object.keys(o[i.c]), k => i[k] = o[i.c][k]);
  
        i.t.s = Date.now(); /* Time.Start */
        i.is.d = true; /* IS.Drag */
        i.xy.sx = e.type === 'mousedown' ? e.clientX : e.touches[0].clientX;
        i.xy.sy = e.type === 'mousedown' ? e.clientY : e.touches[0].clientY;
        i.xy.cx = i.xy.sx;
        i.xy.cy = i.xy.sy;
        i.xy.dx = i.xy.cx - i.xy.sx;
        i.xy.dy = i.xy.cy - i.xy.sy;
  
        v.r = pathparseu({ d: i.e.getAttribute('d') });
        i.pa = v.r.pa; /* PathArray */
        i.xy.ox = Math.round((i.pa.reduce((sum, p) => sum + p[0], 0)/i.pa.length)*100)/100; 
        i.xy.oy = Math.round((i.pa.reduce((sum, p) => sum + p[1], 0)/i.pa.length)*100)/100; 
  
        i.e.parentNode.appendChild(i.e);
      },
  
      moveu: e => {
        if (!Object.keys(i).length) return;
  
        i.xy.cx = e.type === 'mousemove' ? e.clientX : e.touches[0].clientX;
        i.xy.cy = e.type === 'mousemove' ? e.clientY : e.touches[0].clientY;
      },
  
      endu: e => {
        if (!Object.keys(i).length) return;
  
        i.xy.ox += i.xy.dx;
        i.xy.oy += i.xy.dy;
        i.is.d = false;
        i.is.m = false; /* IS.Move */
        i.is.r = false; /* IS.Rotate */
        i.e.removeAttribute('stroke');
        i.e.removeAttribute('stroke-width');
  
        [].forEach.call(Object.keys(i), k => delete i[k]);
      }
    };
  
    const patho = {
      moveu: v => {
        const {} = v;
        if (!i.is.m) return;
  
        v.pa = i.pa.map(e => [e[0] + i.xy.dx/w.r,  e[1] + i.xy.dy/w.r]);
        v.r = pathdu({ pa: v.pa });
        o[i.c].pa = v.pa;

        i.e.setAttribute('d', v.r.d);
      },
      rotateu: v => {
        const {} = v;
        if (!i.is.r) return;
  
        v.d = Math.max(Math.abs(i.xy.dx), Math.abs(i.xy.dy));
        v.d = v.d === Math.abs(i.xy.dx) ? i.xy.dx : i.xy.dy;
  
        v.a = (Math.round((v.d/w.r)/16)*i.r)%360;
        v.pa = i.pa.map(e => rotateu({ ox: i.xy.ox, oy: i.xy.oy, x: e[0], y: e[1], a: v.a }));
        v.r = pathdu({ pa: v.pa });
        o[i.c].pa = v.pa;

        i.e.setAttribute('d', v.r.d);
      }
    };
  
    const frameu = v => {
      const {} = v;
  
      if (Object.keys(i).length) {
        if (!i.is.d) return;
  
        v.r = distanceu({ xy: i.xy });
        i.xy.dx = v.r.dx;
        i.xy.dy = v.r.dy;
  
        v.x = i.xy.ox*w.r + w.hv.h;
        v.y = i.xy.oy*w.r + w.hv.v;
        i.r = v.y - i.xy.sy < 0 ? 15 : -15;
  
        if (!i.is.m && !i.is.r) {
          v.r = distanceu({ xy: { sx: v.x, sy: v.y, cx: i.xy.sx, cy: i.xy.sy } });
          v.d = i.wh.w > i.wh.h ? i.wh.w : i.wh.h;
  
          if(v.r.d < v.d*w.r*0.25){
            i.is.m = true;
            
            i.e.setAttribute('stroke', '#dae');
            i.e.setAttribute('stroke-width', 2);
          } else {
            i.is.r = true;
  
            i.e.setAttribute('stroke', '#eda');
            i.e.setAttribute('stroke-width', 2);
          }
        } else {
          patho.moveu({});
          patho.rotateu({});
        }
      }
      
      if(x.btnm) {
        if(Object.keys(x.btnm.evt).length){
          if(x.btnm.evt.o === 'btnstangram'){
            // console.log('//\ ', x.btnm.evt.o, x.btnm.evt.s, x.btnm.evt.e.className);
            btnstangram[x.btnm.evt.s]({ e: x.btnm.evt.e, o: o, w: w });
            delete x.btnm.evt.o;
            delete x.btnm.evt.s;
            delete x.btnm.evt.e;
          }
        }
        // [`${v.s}u`]({e: v.e});
      }

      requestAnimationFrame(() => frameu({}));
    };
    frameu({});
  
    const btnsvgu = v => {
      const {} = v;
  
      v.s = document.querySelector('svg');
      v.x = new XMLSerializer();
      v.t = v.x.serializeToString(v.s);
      v.b = new Blob([v.t], { type: 'image/svg+xml;charset=utf-8' });
      v.url = URL.createObjectURL(v.b);
      v.a = document.createElement('a');
  
      v.n = new Date();
      v.ymd = v.n.getFullYear() + String(v.n.getMonth() + 1).padStart(2, '0') + String(v.n.getDate()).padStart(2, '0'); 
      v.hms = String(v.n.getHours()).padStart(2, '0') + String(v.n.getMinutes()).padStart(2, '0') + String(v.n.getSeconds()).padStart(2, '0'); 
      v.f = `tans-${v.ymd}-${v.hms}.svg`;
  
      v.a.href = v.url;
      v.a.download = v.f;
      document.body.appendChild(v.a);
      v.a.click();
      document.body.removeChild(v.a);
      URL.revokeObjectURL(v.url);
    }
  
    [].forEach.call(a, e => {
      e.addEventListener('mousedown', drag.startu);
      e.addEventListener('touchstart', drag.startu);
  
      v.d = e.getAttribute('d');
      v.f = e.getAttribute('fill');

      v.xy = { sx: 0, sy: 0, cx: 0, cy: 0, dx: 0, dy: 0 }; /* position: start, current, delta */
      v.t = { s: 0, c: 0 } /* time: start, current */
      v.is = { d: false, m: false, r: false  }; /* is: Dragging, Moving, Rotating */
      v.i = `.${e.classList.value.replace(/\s/, '.')}`;
      v.r = pathparseu({ d: v.d });
  
      v.b = e.getBBox();
      v.wh = { w: v.b.width, h: v.b.height };
  
      o[`${v.i}`] = { e: e, xy: v.xy, wh: v.wh, t: v.t, is: v.is, pa: v.r.pa, r: 15, d: v.d, fill: v.f };
    });
  
    document.addEventListener('mousemove', drag.moveu);
    document.addEventListener('touchmove', drag.moveu);
  
    document.addEventListener('mouseup', drag.endu);
    document.addEventListener('touchend', drag.endu);

    await x.importmoduleu({ m: '/www/ware/btn.js' }); //\ module, index

    v.e = document.querySelector('.sheet.fgs .seg.tangram .tans.xi');
    v.e.style.display = 'none';
  })();
})({ x: hex, a: document.querySelectorAll('.tan'), o: {}, i: {}, w:{ r: 1, wh: { w: 1280, h: 1280 }} });
// a: document.querySelectorAll('.tan'), o: {}, i: {}, w: { r: window.xr, wh: window.xwh }
//\ serves as an alias for, allowing you to reference the same object with a x.
//\ sets element class name, width, height.


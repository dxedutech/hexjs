const supportsTouch = () => 'ontouchstart' in window || navigator.maxTouchPoints > 0;
const isMobileDevice = () => (window.innerWidth <= 768 && window.devicePixelRatio || 1 > 1) || window.innerWidth < 480;

export default (r => {
  r.devu = '//\\v0.0.240923';
  r.wh = { w: 0, h: 0 };
  r.hv = { h: 0, v: 0 };
  r.isMobile = supportsTouch() || isMobileDevice();
  r.resolution = { w: window.screen.width, h: window.screen.height, r: window.devicePixelRatio };

  const resizeu = v => {
    const { w, h } = v;

    r.wh.w = w || 800;
    r.wh.h = h || 800;
    r.isPortrait = window.matchMedia("(orientation: portrait)").matches ? 'portrait' : 'landscape';

    const resizebodyu = () => {
      v.d = document.body.children[0];

      r.r = Math.min(window.innerWidth / r.wh.w, window.innerHeight / r.wh.h);
      v.d.style.transform = `scale(${r.r})`;

      v.d.style.width = `${r.wh.w}px`;
      v.d.style.height = `${r.wh.h}px`;

      r.hv.h = window.innerWidth*0.5 - r.wh.w*r.r*0.5;
      r.hv.v = window.innerHeight*0.5 - r.wh.h*r.r*0.5;

      v.e = v.d.querySelector('.sheet.uis');
      if(v.e){
        v.e.classList.remove('horizontal');
        v.e.classList.remove('vertical');
        v.e.classList.add(window.innerWidth>window.innerHeight ? 'horizontal' : 'vertical');
      };
    }
  
    window.addEventListener('resize', resizebodyu);
    resizebodyu();
  }
  r.resizeu = resizeu;

  return r;
})({});

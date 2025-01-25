const supportsTouch = () => 'ontouchstart' in window || navigator.maxTouchPoints > 0;
const isMobileDevice = () => (window.innerWidth <= 768 && window.devicePixelRatio || 1 > 1) || window.innerWidth < 480;

export default (r => {
  r.devu = '//\\v0.0.240923';
  r.wh = { w: 0, h: 0 };
  r.hv = { h: 0, v: 0 };
  r.isMobile = supportsTouch() || isMobileDevice();
  r.isPortrait = window.matchMedia("(orientation: portrait)").matches ? 'portrait' : 'landscape';
  r.resolution = { w: window.screen.width, h: window.screen.height, r: window.devicePixelRatio };

  const resizeu = v => {
    const { w, h } = v;

    r.wh.w = w || 800;
    r.wh.h = h || 800;

    const resizebodyu = () => {
      v.b = document.body;
      r.r = Math.min(window.innerWidth / r.wh.w, window.innerHeight / r.wh.h);
      v.b.style.transform = `scale(${r.r})`;
      v.b.style.transformOrigin = 'left top';
      v.b.style.left = `${window.innerWidth*0.5 - r.wh.w*r.r*0.5}px`;
      v.b.style.top = `${window.innerHeight*0.5 - r.wh.h*r.r*0.5}px`;

      v.r = v.b.children[0].getBoundingClientRect();
      r.hv.h = v.r.left;
      r.hv.v = v.r.top ;
    }
  
    document.documentElement.style.width = `${r.wh.w}px`;
    document.documentElement.style.height = `${r.wh.h}px`;
    document.body.style.width = `${r.wh.w}px`;
    document.body.style.height = `${r.wh.h}px`;

    window.addEventListener('resize', resizebodyu);
    resizebodyu();
  }
  r.resizeu = resizeu;

  return r;
})({});

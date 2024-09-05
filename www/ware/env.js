const supportsTouch = () => 'ontouchstart' in window || navigator.maxTouchPoints > 0;
const isMobileDevice = () => (window.innerWidth <= 768 && window.devicePixelRatio || 1 > 1) || window.innerWidth < 480;

export default (() => {
  const r = {};

  const devu = () => '//\\v0.0.240923';
  r.devu = devu;

  const info = () => {
    const isMobile = supportsTouch() || isMobileDevice();
    const isPortrait = window.matchMedia("(orientation: portrait)").matches;

    return {
      isMobile: isMobile,
      orientation: isPortrait ? 'portrait' : 'landscape',
      resolution: { w: window.screen.width, h: window.screen.height, r: window.devicePixelRatio }
    };
  }
  r.isMobile = info().isMobile;
  r.isPortrait = info().isPortrait;
  r.resolution = info().resolution;
  
  const resize = v => {
    const { w, h } = v;

    v.w = w || 800;
    v.h = h || 800;

    const resizeBody = () => {
      const body = document.body;
      const scale = Math.min(window.innerWidth / v.w, window.innerHeight / v.h);
      body.style.transform = `scale(${scale})`;
      body.style.transformOrigin = 'left top';
      body.style.left = `${window.innerWidth*0.5 - v.w*scale*0.5}px`;
      body.style.top = `${window.innerHeight*0.5 - v.h*scale*0.5}px`;
    }
  
    document.documentElement.style.width = `${v.w}px`;
    document.documentElement.style.height = `${v.h}px`;
    document.body.style.width = `${v.w}px`;
    document.body.style.height = `${v.h}px`;

    window.addEventListener('resize', resizeBody);
    resizeBody();
  }
  r.resize = resize;

  return r;
})();

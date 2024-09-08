const supportsTouch = () => 'ontouchstart' in window || navigator.maxTouchPoints > 0;
const isMobileDevice = () => (window.innerWidth <= 768 && window.devicePixelRatio || 1 > 1) || window.innerWidth < 480;

export default (() => {
  const r = {};

  const devu = () => '//\\v0.0.240923';
  r.devu = devu;

  const infou = () => {
    const isMobile = supportsTouch() || isMobileDevice();
    const isPortrait = window.matchMedia("(orientation: portrait)").matches;

    return {
      isMobile: isMobile,
      orientation: isPortrait ? 'portrait' : 'landscape',
      resolution: { w: window.screen.width, h: window.screen.height, r: window.devicePixelRatio }
    };
  }
  r.isMobile = infou().isMobile;
  r.isPortrait = infou().isPortrait;
  r.resolution = infou().resolution;
  
  const resizeu = va => {
    const { w, h } = va;

    va.w = w || 800;
    va.h = h || 800;

    const resizebodyu = () => {
      const body = document.body;
      const scale = Math.min(window.innerWidth / va.w, window.innerHeight / va.h);
      body.style.transform = `scale(${scale})`;
      body.style.transformOrigin = 'left top';
      body.style.left = `${window.innerWidth*0.5 - va.w*scale*0.5}px`;
      body.style.top = `${window.innerHeight*0.5 - va.h*scale*0.5}px`;
    }
  
    document.documentElement.style.width = `${va.w}px`;
    document.documentElement.style.height = `${va.h}px`;
    document.body.style.width = `${va.w}px`;
    document.body.style.height = `${va.h}px`;

    window.addEventListener('resize', resizebodyu);
    resizebodyu();
  }
  r.resizeu = resizeu;

  return r;
})();

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
  
  return r;
})();

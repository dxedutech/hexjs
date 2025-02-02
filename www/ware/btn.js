export default (v => {
  const { x, b } = v;

  const evt = {};

  const clicku = v => {
    const { e } = v;

    // x.loadpageu({ u: '/want/tangent' }); 
    v.j = x.parseattu({ e: e.target }); /* to json */

    if (v.j.hasOwnProperty('url')) {
      console.log('//\ ', v.j.url);
      location.replace(`./${v.j.url}`);
    }

    if (v.j.hasOwnProperty('fn')) {
      evt.o = v.j.obj;
      evt.s = v.j.fn;
      evt.e = e.target;
    }
  };

  [].forEach.call(b, e => {
    e.addEventListener('click', e => {
      e.preventDefault();

      clicku({ e: e });
      return false;
    });
  });
  v.evt = evt;

  const devu = () => '//\ v0.0.240923';
  v.devu = devu;

  return v;
})({ x: hex, b: document.querySelectorAll('.btn') });
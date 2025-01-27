export default (v => {
  const { x, b } = v;

  const clicku = v => {
    const { e } = v;
    console.log(e.target);
    // x.loadpageu({ u: '/want/tangent' }); 
    v.j = x.parseattu({ e: e.target }); /* to json */

    if (v.j.hasOwnProperty('url')) {
      console.log(v.j.url);
      location.replace(`./${v.j.url}`);
    }

    if (v.j.hasOwnProperty('fn')) {
      console.log(v.j.fn);
    }
  };

  [].forEach.call(b, e => {
    e.addEventListener('click', e => {
      e.preventDefault();

      clicku({ e: e });
      return false;
    });
  });

  const devu = () => '//\ v0.0.240923';
  v.devu = devu;

  return v;
})({ x: hex, b: document.querySelectorAll('.btn') });
// export default (v => {
//   const { } = v;

//   const devu = () => '//\\v0.0.240923';
//   v.devu = devu;



//   const svg = document.querySelector('svg');
//   const triangles = {
//       triangle1: {
//           element: document.getElementById('triangle1'),
//           vertices: [
//               {x: 440.000, y: 376.000},
//               {x: 504.000, y: 504.000},
//               {x: 376.000, y: 504.000}
//           ],
//           isLocked: false
//       },
//       triangle2: {
//           element: document.getElementById('triangle2'),
//           vertices: [
//               {x: 640.000, y: 576.000},
//               {x: 704.000, y: 704.000},
//               {x: 576.000, y: 704.000}
//           ],
//           isLocked: false
//       }
//   };

//   let activeTriangle = null;
//   let isDragging = false;
//   let startTime = 0;
//   let animationFrameId;
//   let previousScale = 1;

//   const MAGNETIC_THRESHOLD = 20;

//   const getCurrentScale = () => {
//       const svgRect = svg.getBoundingClientRect();
//       return svgRect.width / 1080;
//   };

//   const updateTrianglePath = (triangle) => {
//       const pathData = `M${triangle.vertices[0].x.toFixed(3)} ${triangle.vertices[0].y.toFixed(3)} L${triangle.vertices[1].x.toFixed(3)} ${triangle.vertices[1].y.toFixed(3)} L${triangle.vertices[2].x.toFixed(3)} ${triangle.vertices[2].y.toFixed(3)} Z`;
//       triangle.element.setAttribute('d', pathData);
      
//       console.log('꼭지점 좌표:', triangle.vertices.map(v => `(${v.x.toFixed(3)}, ${v.y.toFixed(3)})`));
//   };

//   const handleResize = () => {
//       const currentScale = getCurrentScale();
//       const scaleFactor = currentScale / previousScale;
      
//       Object.values(triangles).forEach(triangle => {
//           triangle.vertices = triangle.vertices.map(vertex => ({
//               x: Math.round((vertex.x * scaleFactor) * 1000) / 1000,
//               y: Math.round((vertex.y * scaleFactor) * 1000) / 1000
//           }));
//           updateTrianglePath(triangle);
//       });

//       previousScale = currentScale;
//   };

//   const checkMagneticEffect = () => {
//       if (!activeTriangle) return;

//       const otherTriangle = activeTriangle === triangles.triangle1 ? triangles.triangle2 : triangles.triangle1;

//       let magneticEffect = false;
//       activeTriangle.vertices.forEach((activeVertex, i) => {
//           otherTriangle.vertices.forEach(otherVertex => {
//               const dx = activeVertex.x - otherVertex.x;
//               const dy = activeVertex.y - otherVertex.y;
//               const distance = Math.sqrt(dx * dx + dy * dy);

//               if (distance < MAGNETIC_THRESHOLD) {
//                   magneticEffect = true;
//                   const deltaX = otherVertex.x - activeVertex.x;
//                   const deltaY = otherVertex.y - activeVertex.y;
                  
//                   activeTriangle.vertices.forEach(vertex => {
//                       vertex.x = Math.round((vertex.x + deltaX) * 1000) / 1000;
//                       vertex.y = Math.round((vertex.y + deltaY) * 1000) / 1000;
//                   });
//               }
//           });
//       });

//       if (magneticEffect) {
//           updateTrianglePath(activeTriangle);
//           activeTriangle.isLocked = true;
//           stopDragging();
//       }
//   };

//   const rotateTriangle = (timestamp) => {
//       if (!isDragging || !activeTriangle || activeTriangle.isLocked) {
//           return;
//       }

//       if (timestamp - startTime > 200) {
//           const centerX = Math.round(((activeTriangle.vertices[0].x + activeTriangle.vertices[1].x + activeTriangle.vertices[2].x) / 3) * 1000) / 1000;
//           const centerY = Math.round(((activeTriangle.vertices[0].y + activeTriangle.vertices[1].y + activeTriangle.vertices[2].y) / 3) * 1000) / 1000;
          
//           const angle = Math.PI / 12;
//           activeTriangle.vertices = activeTriangle.vertices.map(vertex => {
//               const dx = vertex.x - centerX;
//               const dy = vertex.y - centerY;
//               return {
//                   x: Math.round((centerX + dx * Math.cos(angle) - dy * Math.sin(angle)) * 1000) / 1000,
//                   y: Math.round((centerY + dx * Math.sin(angle) + dy * Math.cos(angle)) * 1000) / 1000,
//                   offsetX: vertex.offsetX,
//                   offsetY: vertex.offsetY
//               };
//           });

//           updateTrianglePath(activeTriangle);
//           checkMagneticEffect();
//           startTime = timestamp;
//       }

//       animationFrameId = requestAnimationFrame(rotateTriangle);
//   };

//   const startDragging = (e, triangle) => {
//       e.preventDefault();
//       isDragging = true;
//       activeTriangle = triangle;
//       startTime = performance.now();
      
//       const point = svg.createSVGPoint();
//       if (e.type === 'mousedown') {
//           point.x = e.clientX;
//           point.y = e.clientY;
//       } else if (e.type === 'touchstart') {
//           point.x = e.touches[0].clientX;
//           point.y = e.touches[0].clientY;
//       }

//       const svgPoint = point.matrixTransform(svg.getScreenCTM().inverse());
      
//       activeTriangle.vertices = activeTriangle.vertices.map(vertex => ({
//           ...vertex,
//           offsetX: vertex.x - svgPoint.x,
//           offsetY: vertex.y - svgPoint.y
//       }));

//       animationFrameId = requestAnimationFrame(rotateTriangle);
//   };

//   const drag = (e) => {
//       if (!isDragging || !activeTriangle || activeTriangle.isLocked) return;
//       e.preventDefault();
      
//       const point = svg.createSVGPoint();
//       if (e.type === 'mousemove') {
//           point.x = e.clientX;
//           point.y = e.clientY;
//       } else if (e.type === 'touchmove') {
//           point.x = e.touches[0].clientX;
//           point.y = e.touches[0].clientY;
//       }

//       const currentPoint = point.matrixTransform(svg.getScreenCTM().inverse());
      
//       activeTriangle.vertices = activeTriangle.vertices.map(vertex => ({
//           x: Math.round((currentPoint.x + vertex.offsetX) * 1000) / 1000,
//           y: Math.round((currentPoint.y + vertex.offsetY) * 1000) / 1000,
//           offsetX: vertex.offsetX,
//           offsetY: vertex.offsetY
//       }));

//       updateTrianglePath(activeTriangle);
//       checkMagneticEffect();
//   };

//   const stopDragging = () => {
//       isDragging = false;
//       cancelAnimationFrame(animationFrameId);
//       if (activeTriangle) {
//           activeTriangle.vertices = activeTriangle.vertices.map(({x, y}) => ({x, y}));
//           activeTriangle = null;
//       }
//   };

//   Object.values(triangles).forEach(triangle => {
//       triangle.element.addEventListener('mousedown', (e) => {
//           if (triangle.isLocked) {
//               triangle.isLocked = false;
//           }
//           startDragging(e, triangle);
//       });
//       triangle.element.addEventListener('touchstart', (e) => {
//           if (triangle.isLocked) {
//               triangle.isLocked = false;
//           }
//           startDragging(e, triangle);
//       });
//   });

//   window.addEventListener('mousemove', drag);
//   window.addEventListener('mouseup', stopDragging);
//   window.addEventListener('touchmove', drag);
//   window.addEventListener('touchend', stopDragging);
//   window.addEventListener('touchcancel', stopDragging);
//   window.addEventListener('resize', handleResize);
  

//   return v;
// })({});
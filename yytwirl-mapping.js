// --------------------------------------------------
// yytwirl shared mappings
//
// Coordinate transforms between a 100x100 rectangle/triangle space and a
// radius-100 circle, used by both yytwirl-mapping.html (the point tester)
// and yytwirl-draw.html (the image-warp tool).
//
// Notes for external use:
// - uses Math.atan2 (not p5's global atan2) so it works without p5 loaded
// - `debug` is an optional global on the host page; guarded so a missing
//   declaration never throws a ReferenceError
// --------------------------------------------------

function absmod(n, m) {
  return ((n % m) + m) % m;
}

function mapRect2Circ(x,y) {
  // input x,y are from top,left of rect 100x100
  // output x,y are from center of circle radius 100
  const angle = 2*Math.PI*x / 100;
  const res = {
    x:(100 - y) * Math.sin(angle),
    y:(y - 100) * Math.cos(angle)
  };
  // debug
  if (typeof debug !== 'undefined' && debug) console.log(
    'rect2circ',{x,y},{angle: Math.round(angle*180/Math.PI)},res
  );
  return res;
}


function mapTri2Circ(x,y) {
  // input x,y are from top,left of rect 100x100
  // output x,y are from center of circle radius 100
  const d = 100 - y;
  // singularity at tip
  if (d <= 0) {
    return { x: 0, y: 0 };
  }
  const angle = ( 2*Math.PI * x  - Math.PI * y) / d;
  const res = {
    x:d * Math.sin(angle),
    y:-d * Math.cos(angle)
  };
  // debug
  if (typeof debug !== 'undefined' && debug) console.log(
    'tri2circ',{x,y},{angle: Math.round(angle*180/Math.PI), d},res
  );
  return res;
}


function mapCirc2Rect(x,y) {
  // input x,y are from center of circle with radius 100
  // output x,y are from top, left of rect with dimensions 100x100
  const absangle = Math.atan2(y,x)+Math.PI/2;
  const angle = absmod(absangle,2*Math.PI);
  const d = Math.sqrt(x**2+y**2);
  const res = {
    x:100*angle/(2*Math.PI),
    y:100-d
  };
  if (typeof debug !== 'undefined' && debug) console.log(
    'circ2rect',{x,y},{angle: Math.round(angle*180/Math.PI),d},res
  );
  return res;
}

function mapCirc2Tri(x,y) {
  // input x,y are from center of circle with radius 100
  // output x,y are from top, left of rect with dimensions 100 x 100
  // clockwise is left to right
  const absangle = Math.atan2(y,x)+Math.PI/2;
  const angle = absmod(absangle,2*Math.PI);
  const d = Math.sqrt(x**2+y**2);
  const res = {
    x: d * angle/(2*Math.PI)+ (100-d)/2,
    y: 100-d
  };
  if (typeof debug !== 'undefined' && debug) console.log(
    'circ2tri',{x,y},{angle: Math.round(angle*180/Math.PI),d},res
  );
  return res;
}

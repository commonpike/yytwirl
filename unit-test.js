// Tests for yytwirl-mapping.js — run with: node unit-test.js

const fs = require('fs');
eval(fs.readFileSync(__dirname + '/yytwirl-mapping.js', 'utf8'));

console.log('mapRect2Circ(50,0) =', mapRect2Circ(50, 0));   // ~{x:0, y:100}
console.log('mapCirc2Rect(0,100) =', mapCirc2Rect(0, 100)); // {x:50, y:0}
console.log('mapTri2Circ(50,50) =', mapTri2Circ(50, 50));   // ~{x:0, y:50}
console.log('mapCirc2Tri(0,50)  =', mapCirc2Tri(0, 50));    // {x:50, y:50}
console.log('absmod(-1,4) =', absmod(-1, 4));               // 3

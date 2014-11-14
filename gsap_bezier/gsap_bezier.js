/**
 * DAnimation object is used to animate ease with bezier functions
 * example: TweenMax.to($('selector'), 1.5, {left:"80%", ease: DAnimation.bezier(0.04,0.86,0.8,1)});
 *
 * Used: https://github.com/rdallasgray/bez
 */
var DAnimation = ({
        start: 0,
        bezier: function(p0, p1, p2, p3){
            return DAnimation.polyBez([p0, p1], [p2, p3]);

        },
        polyBez: function(p1, p2) {
            var A = [null, null], B = [null, null], C = [null, null],
                bezCoOrd = function(t, ax) {
                    C[ax] = 3 * p1[ax], B[ax] = 3 * (p2[ax] - p1[ax]) - C[ax], A[ax] = 1 - C[ax] - B[ax];
                    return t * (C[ax] + t * (B[ax] + t * A[ax]));
                },
                xDeriv = function(t) {
                    return C[0] + t * (2 * B[0] + 3 * A[0] * t);
                },
                xForT = function(t) {
                    var x = t, i = 0, z;
                    while (++i &lt; 14) {
                        z = bezCoOrd(x, 0) - t;
                        if (Math.abs(z) &lt; 1e-3) break;
                        x -= z / xDeriv(x);
                    }
                    return x;
                };
            return function(t) {
                return bezCoOrd(xForT(t), 1);
            }
        }
    });

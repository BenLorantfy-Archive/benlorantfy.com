'use strict';

var Util = require('./util');

var _exports = module.exports = {};

_exports.prism = {
    distance: function apothem(width, sides) {
        return Math.ceil(width / (2 * Math.tan(Math.PI / sides)));
    },
    figures: function figures(width, images, initial) {
        var sides = images.length;
        var angle = 2 * Math.PI / sides;
        var acceptable = Math.round(initial / angle) * angle;
        return Util.range(0, sides).map(function (d) {
            var rotateY = d * angle + acceptable;


            var scale = 1;
            var dividedByPi = rotateY / Math.PI;
            var modulus = (Math.floor(dividedByPi * 1000) / 1000) % 1;
            if(dividedByPi == 0 || (modulus > 0.99 && modulus < 1) || modulus === 0){
                scale = 1.5;
            }


            return {
                rotateY: rotateY,
                translateX: 0,
                translateZ: _exports.prism.distance(width, sides),
                scale: scale,
                opacity: 1,
                present: true,
                key: d,
                image: images[d]
            };
        });
    }
};
_exports.classic = {
    distance: function distance(width, sides) {
        return Math.round(width * Math.log(sides));
    },
    figures: function figures(width, images, initial) {
        var sides = images.length;
        var angle = 2 * Math.PI / sides;
        var distance = _exports.classic.distance(width, sides);
        var acceptable = Math.round(initial / angle) * angle;
        return Util.range(0, sides).map(function (d) {
            var angleR = d * angle + acceptable;
            return {
                rotateY: 0,
                translateX: distance * Math.sin(angleR),
                translateZ: distance * Math.cos(angleR),
                opacity: 1,
                present: true,
                key: d,
                image: images[d]
            };
        });
    }
};
"use strict";
exports.__esModule = true;
var checkNaN = function (parameter) {
    for (var _i = 0, parameter_1 = parameter; _i < parameter_1.length; _i++) {
        var index = parameter_1[_i];
        if (isNaN(index)) {
            //console.log("one of parameters is NaN");
            throw new Error("One of parameters is NaN");
        }
    }
};
exports["default"] = checkNaN;

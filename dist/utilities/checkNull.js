"use strict";
exports.__esModule = true;
var checkNull = function (parameter) {
    for (var _i = 0, parameter_1 = parameter; _i < parameter_1.length; _i++) {
        var index = parameter_1[_i];
        if (index == null) {
            //console.log("one of parameters is Null");
            throw new Error("One of parameters is null");
        }
    }
};
exports["default"] = checkNull;

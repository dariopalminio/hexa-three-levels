"use strict";
exports.__esModule = true;
exports.GlobalConfigSuperclass = void 0;
/**
 * Global Config superclass
 */
var GlobalConfigSuperclass = /** @class */ (function () {
    function GlobalConfigSuperclass() {
        this.variables = new Map();
    }
    ;
    GlobalConfigSuperclass.prototype.get = function (key) {
        return this.variables.get(key);
    };
    ;
    GlobalConfigSuperclass.prototype.set = function (key, value) {
        this.variables.set(key, value);
    };
    ;
    GlobalConfigSuperclass.prototype.stringify = function () {
        return JSON.stringify(Object.fromEntries(this.variables));
    };
    ;
    return GlobalConfigSuperclass;
}());
exports.GlobalConfigSuperclass = GlobalConfigSuperclass;
;

"use strict";
exports.__esModule = true;
exports.Entity = void 0;
/**
 * Entity super class
 *
 * An object primarily defined by its identity is called an Entity.
 * An Entity object is mutable.
 */
var Entity = /** @class */ (function () {
    function Entity(id) {
        if (id !== undefined)
            this.id = id;
    }
    Entity.prototype.getId = function () {
        return this.id;
    };
    Entity.prototype.equals = function (objectToCheck) {
        if (objectToCheck == null || objectToCheck == undefined) {
            return false;
        }
        if (!this.isEntity(objectToCheck)) {
            return false;
        }
        if (this === objectToCheck) {
            return true;
        }
        return this.id == objectToCheck.getId();
    };
    ;
    Entity.prototype.isEntity = function (objectToCheck) {
        return objectToCheck instanceof Entity;
    };
    ;
    return Entity;
}());
exports.Entity = Entity;
;

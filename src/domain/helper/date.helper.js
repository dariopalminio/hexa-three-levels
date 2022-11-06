"use strict";
exports.__esModule = true;
exports.convertAnyToDate = exports.isStringIsoDate = void 0;
function isStringIsoDate(str) {
    if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(str))
        return false;
    var d = new Date(str);
    return d instanceof Date && d.toISOString() === str; // valid date 
}
exports.isStringIsoDate = isStringIsoDate;
var convertAnyToDate = function (d) {
    if (d instanceof Date) { //typeof: object
        return d;
    }
    ;
    //ISOString
    if (typeof d === "string") { //typeof: string
        return new Date(d);
    }
    throw new Error('Could not convert data to date');
};
exports.convertAnyToDate = convertAnyToDate;

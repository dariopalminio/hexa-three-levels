"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
exports.__esModule = true;
exports.testLib = exports.ErrorCode = exports.FailedDependencyError = exports.InternalServerError = exports.IdFormatError = exports.DuplicateError = exports.NotFoundError = exports.FormatError = exports.DomainError = void 0;
var domain_error_1 = require("./domain-error");
__createBinding(exports, domain_error_1, "DomainError");
__createBinding(exports, domain_error_1, "FormatError");
__createBinding(exports, domain_error_1, "NotFoundError");
__createBinding(exports, domain_error_1, "DuplicateError");
__createBinding(exports, domain_error_1, "IdFormatError");
__createBinding(exports, domain_error_1, "InternalServerError");
__createBinding(exports, domain_error_1, "FailedDependencyError");
var error_code_enum_1 = require("./error-code.enum");
__createBinding(exports, error_code_enum_1, "ErrorCode");
var testLib = function () { console.log("---->testLib is OK!"); };
exports.testLib = testLib;

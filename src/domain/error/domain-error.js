"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.InternalServerError = exports.FailedDependencyError = exports.IdFormatError = exports.DuplicateError = exports.NotFoundError = exports.FormatError = exports.DomainError = void 0;
var error_code_enum_1 = require("./error-code.enum");
/**
 * Defines an superclass Error for Domain Layer type errors.
 */
var DomainError = /** @class */ (function (_super) {
    __extends(DomainError, _super);
    //traslated?: string; //message traslated
    function DomainError(code, message, detail, data) {
        if (detail === void 0) { detail = ''; }
        if (data === void 0) { data = {}; }
        var _this = _super.call(this, message) || this;
        // Ensure the name of this error is the same as the class name
        _this.name = _this.constructor.name;
        _this.code = code;
        _this.data = data;
        //this.traslated = traslated;
        _this.detail = detail;
        // This clips the constructor invocation from the stack trace.
        // It's not absolutely essential, but it does make the stack trace a little nicer.
        Error.captureStackTrace(_this, _this.constructor);
        return _this;
    }
    ;
    DomainError.prototype.getCode = function () {
        return this.code;
    };
    ;
    DomainError.prototype.getDetail = function () {
        return this.detail;
    };
    ;
    DomainError.prototype.getData = function () {
        return this.data;
    };
    ;
    DomainError.prototype.getName = function () {
        return this.name;
    };
    ;
    DomainError.prototype.getMessage = function () {
        return this.message;
    };
    ;
    return DomainError;
}(Error));
exports.DomainError = DomainError;
;
/**
 * Defines an Generic Domain Error for Format (Bad Request) type errors.
 */
var FormatError = /** @class */ (function (_super) {
    __extends(FormatError, _super);
    function FormatError(message, detail, data) {
        var _this = this;
        var codeErr = error_code_enum_1.ErrorCode.BAD_REQUEST;
        var msg = 'Format Error: This error is caused when you attempt to enter a badly formatted attribute. ' + message;
        var detailed = detail ? detail : message;
        var dat = data ? data : {};
        _this = _super.call(this, codeErr, msg, detailed, dat) || this;
        _this.name = _this.constructor.name;
        Error.captureStackTrace(_this, _this.constructor);
        return _this;
    }
    return FormatError;
}(DomainError));
exports.FormatError = FormatError;
;
/**
 * Defines an Generic Domain Error for Not Found type errors.
 */
var NotFoundError = /** @class */ (function (_super) {
    __extends(NotFoundError, _super);
    function NotFoundError(message, detail, data) {
        var _this = this;
        var codeErr = error_code_enum_1.ErrorCode.NOT_FOUND;
        var msg = 'Entity not found: could not find the indicated entity in data collection. ' + message;
        var detailed = detail ? detail : message;
        var dat = data ? data : {};
        _this = _super.call(this, codeErr, msg, detailed, dat) || this;
        _this.name = _this.constructor.name;
        Error.captureStackTrace(_this, _this.constructor);
        return _this;
    }
    return NotFoundError;
}(DomainError));
exports.NotFoundError = NotFoundError;
;
/**
 * Defines an Generic Domain Error for Duplicate (Conflict) type errors.
 */
var DuplicateError = /** @class */ (function (_super) {
    __extends(DuplicateError, _super);
    function DuplicateError(message, detail, data) {
        var _this = this;
        var codeErr = error_code_enum_1.ErrorCode.NOT_FOUND;
        var msg = 'Duplicate Error: entity already exists or try to save some attribute that must be unique! ' + message;
        var detailed = detail ? detail : message;
        var dat = data ? data : {};
        _this = _super.call(this, codeErr, msg, detailed, dat) || this;
        _this.name = _this.constructor.name;
        Error.captureStackTrace(_this, _this.constructor);
        return _this;
    }
    return DuplicateError;
}(DomainError));
exports.DuplicateError = DuplicateError;
;
/**
 * Defines an Generic Domain Error for Duplicate (Conflict) type errors.
 */
var IdFormatError = /** @class */ (function (_super) {
    __extends(IdFormatError, _super);
    function IdFormatError(message, detail, data) {
        var _this = this;
        var codeErr = error_code_enum_1.ErrorCode.BAD_REQUEST;
        var msg = 'Id format is wrong. The id field is undefined or its length exceeds the maximum allowed. ' + message;
        var detailed = detail ? detail : message;
        var dat = data ? data : {};
        _this = _super.call(this, codeErr, msg, detailed, dat) || this;
        _this.name = _this.constructor.name;
        Error.captureStackTrace(_this, _this.constructor);
        return _this;
    }
    return IdFormatError;
}(DomainError));
exports.IdFormatError = IdFormatError;
;
/**
 * Defines an Generic Domain Error for Failed Dependency type errors.
 */
var FailedDependencyError = /** @class */ (function (_super) {
    __extends(FailedDependencyError, _super);
    function FailedDependencyError(message, detail, data) {
        var _this = this;
        var codeErr = error_code_enum_1.ErrorCode.FAILED_DEPENDENCY;
        var msg = 'Some dependency or external service has failed. ' + message;
        var detailed = detail ? detail : message;
        var dat = data ? data : {};
        _this = _super.call(this, codeErr, msg, detailed, dat) || this;
        _this.name = _this.constructor.name;
        Error.captureStackTrace(_this, _this.constructor);
        return _this;
    }
    return FailedDependencyError;
}(DomainError));
exports.FailedDependencyError = FailedDependencyError;
;
/**
 * Defines an Generic Domain Error for Internal Server type errors.
 * Internal Server Error	When something goes wrong on the server,
 * the consumer can’t do anything about it. Just let them know there’s a problem and that they should try again later or contact support.
 */
var InternalServerError = /** @class */ (function (_super) {
    __extends(InternalServerError, _super);
    function InternalServerError(message, detail, data) {
        var _this = this;
        var codeErr = error_code_enum_1.ErrorCode.INTERNAL_SERVER_ERROR;
        var msg = 'Something goes wrong on the server and should try again later or contact support. ' + message;
        var detailed = detail ? detail : message;
        var dat = data ? data : {};
        _this = _super.call(this, codeErr, msg, detailed, dat) || this;
        _this.name = _this.constructor.name;
        Error.captureStackTrace(_this, _this.constructor);
        return _this;
    }
    return InternalServerError;
}(DomainError));
exports.InternalServerError = InternalServerError;
;

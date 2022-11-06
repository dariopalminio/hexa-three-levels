"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
exports.MongoGenericRepository = void 0;
var domain_error_1 = require("../../../../domain/error/domain-error");
/**
 * Product Mongo repository implementation
 *
 * Template Method Class Behavioral & Concrete Adapter
 *
 * D: Mongoose Document type
 * T: Entity class type
 */
var MongoGenericRepository = /** @class */ (function () {
    function MongoGenericRepository(model, // Model Schema
    factory // Entity factory to convert from mongo to Domain class
    ) {
        this.model = model;
        this.factory = factory;
    }
    MongoGenericRepository.prototype.getAll = function (page, limit, orderByField, isAscending) {
        return __awaiter(this, void 0, void 0, function () {
            var arrayDoc, direction, mysort, gap;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(page && limit && orderByField)) return [3 /*break*/, 2];
                        direction = isAscending ? 1 : -1;
                        mysort = { reference: 1 };
                        gap = (page - 1) * limit;
                        return [4 /*yield*/, this.model.find({}).sort(mysort).skip(gap).limit(limit).exec()];
                    case 1:
                        arrayDoc = _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.model.find({}).exec()];
                    case 3:
                        // All without pagination and without sorting
                        arrayDoc = _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/, this.castArrayDocToArrayDomainEntity(arrayDoc)];
                }
            });
        });
    };
    ;
    MongoGenericRepository.prototype.find = function (query, page, limit, orderByField, isAscending) {
        return __awaiter(this, void 0, void 0, function () {
            var arrayDoc, direction, mysort, gap, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        arrayDoc = void 0;
                        if (!(page && limit && orderByField)) return [3 /*break*/, 2];
                        direction = isAscending ? 1 : -1;
                        mysort = { reference: 1 };
                        gap = (page - 1) * limit;
                        return [4 /*yield*/, this.model.find(query).sort(mysort).skip(gap).limit(limit).exec()];
                    case 1:
                        arrayDoc = _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.model.find(query).exec()];
                    case 3:
                        // All without pagination and without sorting
                        arrayDoc = _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/, this.castArrayDocToArrayDomainEntity(arrayDoc)];
                    case 5:
                        error_1 = _a.sent();
                        if ((error_1.name === 'CastError') && (error_1.path === '_id')) {
                            throw new domain_error_1.IdFormatError('', error_1.message, error_1);
                        }
                        if (error_1.name === 'CastError') {
                            throw new domain_error_1.FormatError('', error_1.message, error_1);
                        }
                        throw error_1;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    ;
    /**
     * To exclude fields in response choose to return object with the field excluded with cero value. For example:
     * const fieldsToExclude = {_id:0,title:0}
     * const filter= {“name”:“Jeff Bridges”}
     * db.collecion.find(filter,fieldsToExclude)
     * To not exclude fields use empty object: fieldsToExclude={}
     * pagination:
     * Page 1: skip = 0, limit = 10
     * Page 2: skip = 10, limit = 10
     * Page 3: skip = 20, limit = 10
     *
     * @param query filter
     * @param fieldsToExclude projection fields To Exclude
     * @param page //pointer selected
     * @param limit //The limit is used to specify the maximum number of results to be returned.
     * @param orderByField //field name
     * @param isAscending [true | false]
     * @returns
     */
    MongoGenericRepository.prototype.findExcludingFields = function (query, fieldsToExclude, page, limit, orderByField, isAscending) {
        return __awaiter(this, void 0, void 0, function () {
            var arrayDoc, mysort, gap, ascending, resultArray_1, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        arrayDoc = void 0;
                        if (!(page && limit && orderByField)) return [3 /*break*/, 2];
                        mysort = {};
                        mysort[orderByField] = isAscending ? 1 : -1; //Record<string, | 1 | -1 | {$meta: "textScore"}>
                        gap = (page - 1) * limit;
                        ascending = 1;
                        return [4 /*yield*/, this.model.find(query, fieldsToExclude).sort(mysort).skip(gap).limit(limit).exec()];
                    case 1:
                        arrayDoc = _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.model.find(query).exec()];
                    case 3:
                        // All without pagination and without sorting
                        arrayDoc = _a.sent();
                        _a.label = 4;
                    case 4:
                        resultArray_1 = [];
                        arrayDoc.forEach(function (element) {
                            //Extract doc object as result and add 'id' to result
                            var itemResult = element;
                            if (element !== null && element._doc && element._doc._id) {
                                var _a = element._doc, _id = _a._id, data = __rest(_a, ["_id"]); //remove '_id'
                                itemResult = __assign(__assign({}, data), { "id": element._doc._id.toString() }); //add 'id'
                            }
                            resultArray_1.push(itemResult);
                        });
                        return [2 /*return*/, resultArray_1];
                    case 5:
                        error_2 = _a.sent();
                        if ((error_2.name === 'CastError') && (error_2.path === '_id')) {
                            throw new domain_error_1.IdFormatError('', error_2.message, error_2);
                        }
                        if (error_2.name === 'CastError') {
                            throw new domain_error_1.FormatError('', error_2.message, error_2);
                        }
                        throw error_2;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    ;
    /**
     * getById
     * If it does not find it, it returns null
     */
    MongoGenericRepository.prototype.getById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var doc, objCasted, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.model.findById(id).exec()];
                    case 1:
                        doc = _a.sent();
                        if (doc === null) {
                            throw new domain_error_1.NotFoundError('', "Not found entity with id: ".concat(id));
                        }
                        objCasted = this.factory.createInstance(doc);
                        return [2 /*return*/, objCasted];
                    case 2:
                        error_3 = _a.sent();
                        if ((error_3.name === 'CastError') && (error_3.path === '_id')) {
                            throw new domain_error_1.IdFormatError('', error_3.message, error_3);
                        }
                        throw error_3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ;
    MongoGenericRepository.prototype.getByQueryExcludingFields = function (query, fieldsToExclude) {
        return __awaiter(this, void 0, void 0, function () {
            var document_1, result, _a, _id, data, error_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.model.findOne(query, fieldsToExclude)];
                    case 1:
                        document_1 = _b.sent();
                        result = document_1;
                        if (document_1 !== null && document_1._doc && document_1._doc._id) {
                            _a = document_1._doc, _id = _a._id, data = __rest(_a, ["_id"]);
                            result = __assign(__assign({}, data), { "id": document_1._doc._id.toString() });
                        }
                        return [2 /*return*/, result];
                    case 2:
                        error_4 = _b.sent();
                        if ((error_4.name === 'CastError') && (error_4.path === '_id')) {
                            throw new domain_error_1.IdFormatError('', error_4.message, error_4);
                        }
                        if (error_4.name === 'CastError') {
                            throw new domain_error_1.FormatError('', error_4.message, error_4);
                        }
                        throw error_4;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ;
    MongoGenericRepository.prototype.getByQuery = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            var doc, objCasted, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.model.findOne(query)];
                    case 1:
                        doc = _a.sent();
                        if (doc === null)
                            throw new Error('Entity not found');
                        objCasted = this.factory.createInstance(doc);
                        return [2 /*return*/, objCasted];
                    case 2:
                        error_5 = _a.sent();
                        if ((error_5.name === 'CastError') && (error_5.path === '_id')) {
                            throw new domain_error_1.IdFormatError('', error_5.message, error_5);
                        }
                        throw error_5;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ;
    MongoGenericRepository.prototype.hasById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var prodDoc, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.model.findById(id).exec()];
                    case 1:
                        prodDoc = _a.sent();
                        if (!prodDoc)
                            return [2 /*return*/, false];
                        return [2 /*return*/, true];
                    case 2:
                        error_6 = _a.sent();
                        if ((error_6.name === 'CastError') && (error_6.path === '_id')) {
                            throw new domain_error_1.IdFormatError('', error_6.message, error_6);
                        }
                        throw error_6;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ;
    MongoGenericRepository.prototype.hasByQuery = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            var prodDoc, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.model.findOne(query)];
                    case 1:
                        prodDoc = _a.sent();
                        if (!prodDoc)
                            return [2 /*return*/, false];
                        return [2 /*return*/, true];
                    case 2:
                        error_7 = _a.sent();
                        if ((error_7.name === 'CastError') && (error_7.path === '_id')) {
                            throw new domain_error_1.IdFormatError('', error_7.message, error_7);
                        }
                        throw error_7;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ;
    MongoGenericRepository.prototype.create = function (entity) {
        return __awaiter(this, void 0, void 0, function () {
            var docCreated, objCasted, error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.model.create(entity)];
                    case 1:
                        docCreated = _a.sent();
                        objCasted = entity.createFromAny(docCreated);
                        return [2 /*return*/, objCasted];
                    case 2:
                        error_8 = _a.sent();
                        if (error_8.name === 'CastError') {
                            throw new domain_error_1.FormatError('', error_8.message, error_8);
                        }
                        throw error_8;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ;
    MongoGenericRepository.prototype.updateById = function (entityId, entity) {
        return __awaiter(this, void 0, void 0, function () {
            var unmarshalled, id, values, docUpdated, error_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        unmarshalled = entity.convertToAny();
                        id = unmarshalled.id, values = __rest(unmarshalled, ["id"]);
                        return [4 /*yield*/, this.model.findByIdAndUpdate(entityId, __assign(__assign({}, values), { updatedAt: new Date() }), { useFindAndModify: false }).exec()];
                    case 1:
                        docUpdated = _a.sent();
                        if (docUpdated === null) {
                            throw new domain_error_1.NotFoundError('', "The ".concat(entityId, " not found or problem to save changes!"));
                        }
                        return [2 /*return*/, !!docUpdated];
                    case 2:
                        error_9 = _a.sent();
                        if ((error_9.name === 'CastError') && (error_9.path === '_id')) {
                            throw new domain_error_1.IdFormatError('', error_9.message, error_9);
                        }
                        if (error_9.name === 'CastError') {
                            throw new domain_error_1.FormatError('', error_9.message, error_9);
                        }
                        throw error_9;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ;
    MongoGenericRepository.prototype.update = function (query, valuesToSet) {
        return __awaiter(this, void 0, void 0, function () {
            var docUpdated, error_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.model.findOneAndUpdate(query, valuesToSet, { useFindAndModify: false }).exec()];
                    case 1:
                        docUpdated = _a.sent();
                        return [2 /*return*/, !!docUpdated];
                    case 2:
                        error_10 = _a.sent();
                        if ((error_10.name === 'CastError') && (error_10.path === '_id')) {
                            throw new domain_error_1.IdFormatError('', error_10.message, error_10);
                        }
                        if (error_10.name === 'CastError') {
                            throw new domain_error_1.FormatError('', error_10.message, error_10);
                        }
                        throw error_10;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ;
    MongoGenericRepository.prototype["delete"] = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var docDeleted, error_11;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.model.findByIdAndDelete(id, { useFindAndModify: false }).exec()];
                    case 1:
                        docDeleted = _a.sent();
                        return [2 /*return*/, !!docDeleted]; //doc is not null
                    case 2:
                        error_11 = _a.sent();
                        if ((error_11.name === 'CastError') && (error_11.path === '_id')) {
                            throw new domain_error_1.IdFormatError('', error_11.message, error_11);
                        }
                        throw error_11;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ;
    /**
     * Convert Unmarshalled structure data (documents from Mongo) to Domain Object Structure (Domain classes)
     * @param schemaDocArray Unmarshalled structure data (documents from Mongo)
     * @returns Domain Object Structure (Domain classes)
     */
    MongoGenericRepository.prototype.castArrayDocToArrayDomainEntity = function (schemaDocArray) {
        var _this = this;
        var domainEntityArray = [];
        schemaDocArray.forEach(function (element) { return domainEntityArray.push(_this.factory.createInstance(element)); });
        return domainEntityArray;
    };
    ;
    MongoGenericRepository.prototype.count = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.model.count(query)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ;
    return MongoGenericRepository;
}());
exports.MongoGenericRepository = MongoGenericRepository;
;

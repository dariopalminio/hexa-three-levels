"use strict";
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
exports.__esModule = true;
exports.GenericService = void 0;
var paginated_result_1 = require("../model/paginated-result");
var domain_error_1 = require("../error/domain-error");
var error_code_enum_1 = require("../error/error-code.enum");
/**
 * Generic Service (PersistentAggregateService)
 *
 * The Domain Service represents the main behavior associated with a main domain object (Entity root)
 * and its collections, as in this case the 'Category' and Category collection.
 *
 * Note: Service is where your business logic lives. This layer allows you to effectively decouple the processing logic from where the routes are defined.
 * The service provides access to the domain or business logic and uses the domain model to implement use cases.
 * The service only accesses the database or external services through the infrastructure using interfaces.
 * A service is an orchestrator of domain objects to accomplish a goal.
 */
var GenericService = /** @class */ (function () {
    function GenericService(repository, factory) {
        this.repository = repository;
        this.factory = factory;
    }
    // Get all category
    GenericService.prototype.getAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var list;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.repository.getAll()];
                    case 1:
                        list = _a.sent();
                        return [2 /*return*/, list];
                }
            });
        });
    };
    ;
    GenericService.prototype.getById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var entity;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.repository.getById(id)];
                    case 1:
                        entity = _a.sent();
                        if (!entity || entity === null)
                            throw new domain_error_1.NotFoundError('The getById method found no results.');
                        return [2 /*return*/, entity];
                }
            });
        });
    };
    ;
    GenericService.prototype.create = function (categoryDTO) {
        return __awaiter(this, void 0, void 0, function () {
            var categoryEntity, entityNew, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        try {
                            categoryEntity = this.factory.createInstance(categoryDTO);
                        }
                        catch (error) {
                            throw new domain_error_1.FormatError('Data malformed: ' + error.message);
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.repository.create(categoryEntity)];
                    case 2:
                        entityNew = _a.sent();
                        return [2 /*return*/, entityNew];
                    case 3:
                        error_1 = _a.sent();
                        if (error_1.code && error_1.code === 11000) {
                            throw new domain_error_1.DuplicateError('The create method failed to persist entity', "Database error: Duplicate key error collection or index problem. ".concat(error_1.message));
                        }
                        throw new domain_error_1.DomainError(error_code_enum_1.ErrorCode.INTERNAL_SERVER_ERROR, error_1.message, '', error_1);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ;
    GenericService.prototype["delete"] = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var found, deleted;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.repository.hasById(id)];
                    case 1:
                        found = _a.sent();
                        if (!found)
                            throw new domain_error_1.NotFoundError('The delete method did not find the indicated entity.');
                        return [4 /*yield*/, this.repository["delete"](id)];
                    case 2:
                        deleted = _a.sent();
                        return [2 /*return*/, deleted];
                }
            });
        });
    };
    ;
    GenericService.prototype.updateById = function (id, entityDTO) {
        return __awaiter(this, void 0, void 0, function () {
            var entity, found, updatedProduct;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        try {
                            entity = this.factory.createInstance(entityDTO);
                        }
                        catch (error) {
                            throw new domain_error_1.FormatError('', 'Entity data malformed:' + error.message, error);
                        }
                        return [4 /*yield*/, this.repository.hasById(id)];
                    case 1:
                        found = _a.sent();
                        if (!found)
                            throw new domain_error_1.NotFoundError('The updateById method did not find the indicated entity.');
                        return [4 /*yield*/, this.repository.updateById(id, entity)];
                    case 2:
                        updatedProduct = _a.sent();
                        return [2 /*return*/, updatedProduct];
                }
            });
        });
    };
    ;
    GenericService.prototype.getByQuery = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            var entity;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.repository.getByQuery(query)];
                    case 1:
                        entity = _a.sent();
                        if (!entity || entity === null)
                            throw new domain_error_1.NotFoundError('The getByQuery method did not find the indicated entity.');
                        return [2 /*return*/, entity];
                }
            });
        });
    };
    ;
    GenericService.prototype.update = function (query, valuesToSet) {
        return __awaiter(this, void 0, void 0, function () {
            var updatedProduct;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.repository.update(query, valuesToSet)];
                    case 1:
                        updatedProduct = _a.sent();
                        if (!updatedProduct)
                            throw new domain_error_1.NotFoundError('The update method did not find the indicated entity.');
                        return [2 /*return*/, updatedProduct];
                }
            });
        });
    };
    ;
    GenericService.prototype.hasById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.repository.hasById(id)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ;
    GenericService.prototype.hasByQuery = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.repository.hasByQuery(query)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ;
    GenericService.prototype.find = function (query, page, limit, orderByField, isAscending) {
        return __awaiter(this, void 0, void 0, function () {
            var entity;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.repository.find(query, page, limit, orderByField, isAscending)];
                    case 1:
                        entity = _a.sent();
                        return [2 /*return*/, entity];
                }
            });
        });
    };
    ;
    GenericService.prototype.findExcludingFields = function (query, fieldsToExclude, page, limit, orderByField, isAscending) {
        return __awaiter(this, void 0, void 0, function () {
            var entity;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.repository.findExcludingFields(query, fieldsToExclude, page, limit, orderByField, isAscending)];
                    case 1:
                        entity = _a.sent();
                        return [2 /*return*/, entity];
                }
            });
        });
    };
    GenericService.prototype.search = function (queryFilter, page, limit, orderByField, isAscending) {
        return __awaiter(this, void 0, void 0, function () {
            var filter, arrayLista, filtered, count;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        filter = queryFilter ? queryFilter : {};
                        return [4 /*yield*/, this.repository.find(filter, page, limit, orderByField, isAscending)];
                    case 1:
                        arrayLista = _a.sent();
                        filtered = new paginated_result_1.PaginatedResult();
                        return [4 /*yield*/, this.repository.count(filter)];
                    case 2:
                        count = _a.sent();
                        filtered.list = arrayLista;
                        filtered.page = page ? page : 1;
                        filtered.limit = limit ? limit : count;
                        filtered.count = count;
                        return [2 /*return*/, filtered];
                }
            });
        });
    };
    ;
    GenericService.prototype.searchExcludingFields = function (queryFilter, fieldsToExclude, page, limit, orderByField, isAscending) {
        return __awaiter(this, void 0, void 0, function () {
            var arrayLista, filtered, count;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.repository.findExcludingFields(queryFilter, fieldsToExclude, page, limit, orderByField, isAscending)];
                    case 1:
                        arrayLista = _a.sent();
                        filtered = new paginated_result_1.PaginatedResult();
                        return [4 /*yield*/, this.repository.count(queryFilter)];
                    case 2:
                        count = _a.sent();
                        filtered.list = arrayLista;
                        filtered.page = page ? page : 1;
                        filtered.limit = limit ? limit : count;
                        filtered.count = count;
                        return [2 /*return*/, filtered];
                }
            });
        });
    };
    ;
    return GenericService;
}());
exports.GenericService = GenericService;
;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorResponse = exports.successResponse = void 0;
function successResponse(data) {
    return {
        result: 1,
        data
    };
}
exports.successResponse = successResponse;
function errorResponse(data) {
    return {
        result: 0,
        data
    };
}
exports.errorResponse = errorResponse;

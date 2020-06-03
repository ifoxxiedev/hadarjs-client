"use strict";Object.defineProperty(exports, "__esModule", {value: true}); class HadarHttpClientUtils { 
    static showResponseErrors(err) {
        if (!err.response || !err.response.data) throw new Error(err.message);

        const { errors } = err.response.data;
        throw new Error(errors.map(err => err.message).join(','));
    }
} exports.default = HadarHttpClientUtils;

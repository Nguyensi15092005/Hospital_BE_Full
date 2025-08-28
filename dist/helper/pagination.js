"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const objectPaginationHelper = (objectPagination, query, countPage) => {
    if (query.page) {
        objectPagination.currentPage = parseInt(query.page);
    }
    if (query.limit) {
        objectPagination.limitItems = parseInt(query.limit);
    }
    objectPagination.skip = (objectPagination.currentPage - 1) * objectPagination.limitItems;
    objectPagination.totalPage = Math.ceil(countPage / objectPagination.limitItems);
    return objectPagination;
};
exports.default = objectPaginationHelper;

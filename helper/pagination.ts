interface ObjectPagination {
    currentPage: number,
    limitItems: number,
    skip?: number,
    totalPage?: number
}
const objectPaginationHelper = (objectPagination: ObjectPagination, query: Record<string, any>, countPage: number): ObjectPagination => {
    if(query.page){
        objectPagination.currentPage = parseInt(query.page);
    }

    if(query.limit){
        objectPagination.limitItems = parseInt(query.limit);
    }
    objectPagination.skip = (objectPagination.currentPage - 1) * objectPagination.limitItems;
    objectPagination.totalPage = Math.ceil(countPage/objectPagination.limitItems);
    return objectPagination
}

export default objectPaginationHelper;
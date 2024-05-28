
const getPagination = (query) => {
 const page = Math.abs(query.page);
 const limit = Math.abs(query.limit);
 
 const skip = (page - 1) * limit;

    return {  limit, skip };
};

module.exports = getPagination;
const Blog = require("../models/blogModel");
const { populate } = require("../models/commentModel");

const getBlogById = async (blogId) => {
    const blog = await Blog.findById(blogId);
    return blog;
};

const getBlogByTitle = async (blogTitle) => {
    const blog = await Blog.findOne({ title: blogTitle})
    .populate("user", "_id email firstName lastName")
    .populate({
        path: "comments",
        populate: {
            path: "user",
            select: "_id email firstName lastName",
        },
    })
    
    .exec();

    return blog;
};

const getBlogs = async ( skip, limit ) => {
    const blogs = await Blog.find()
    .skip(skip)
    .limit(limit)
    .populate("user", "_id email firstName lastName");
    
    return blogs;
};

module.exports = { getBlogById, getBlogByTitle, getBlogs };
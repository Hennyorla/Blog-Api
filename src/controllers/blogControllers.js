const Blog = require("../models/blogModel");
const Comment = require("../models/commentModel");
const { getBlogById ,getBlogByTitle , getBlogs} = require("../services/blogServices");
const getPagination = require("../utils/pagination");


const createNewBlog = async (req, res) => {
  const { userId } = req.user;
    try {
        //pull out new blog data from request body
        const {title, content} = req.body;
  
        const blog = await Blog.create({title, content, user:  userId });
        //check if blog is not created
  
        if (!blog) {
            //send back error message to client if blog is not created
          return res.status(400).json({error: "blog creation failed"});
        }
        //send back success response if new blog is created on database
        return res.status(201).json({message: "blog created successfully", blog });
    } catch (error) {
      
      //send back error message to client if blog is not created or server related errors
      res.status(500).json({error: "internal server error"});
  
    }
  };

  const addCommentToBlog = async(req, res) => {
    try{
      const { blogId } = req.params;
      const { comment } = req.body;
      const { userId } = req.user;
//check if blog with blog id exist on database
const blogExist = await getBlogById(blogId);

if (!blogExist) {
  return res.status(400).json({ error: "blog not found"})

}

//create a new comment
const newComment = await Comment.create({ comment, user:  userId });

if (!newComment) {
  return res.status(400).json({ error: "comment creation failed" });

}
//push the new comment to the blog comments array
blogExist.comments.push(newComment._id);

//save the blog with the new comment
await blogExist.save();

return res
.status(201)
.json({ message: "comment added successfully", newComment });

  
    } catch (error) {
      res.status(500).json({error: "internal server error"});
    }
  };

  const getSingleBlogByTitle = async(req) => {
    try{
      const { blogTitle } = req.params;
      const blog = await getBlogByTitle(blogTitle);
    
    if (!blog) {
      return res.status(400).json({ error: "blog not found" });
    }
    return res.status(200).json({ message: "blog found", blog });
    } catch (error) {
      res.status(500).json({error: "internal server error"});
    }
  };

  const getAllBlogs = async(req, res) => {

    try{
      //get the skip and limit query from the request
      const { skip, limit } = getPagination(req.query);
      const blogs = await getBlogs( skip, limit);
      //if no blog is found,send back an error message 
      if (!blogs) {
        return res.status(400).json({ error: "something went wrong" });
      }
      return res.status(200).json({ message: "blogs found", blogs });
    } catch (error) {
      res.status(500).json({error: "internal server error"});
    }
  };
  const updateBlog = async( req, res) => {
    try{
      const {blogId} = req.params;
      const {title, content} = req.body;
      const { userId } = req.user;

      const updatedBlog = await Blog.findByIdAndUpdate(blogId, {
        title,
        content,
        user: userId ,
      });

      if (!updatedBlog){
        return res.status(400).json({ error: "blog update failed"});
      }
    return res
    .status(200)
    .json({ message: "blog updated successfully", updateBlog});
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error"});
    }
  };

  const deleteBlog = async (req, res) => {

    try { 
      const { blogId } = req.params;

      const deletedBlog = await Blog.findOneAndDelete({ _id: blogId});

      if (deletedBlog) {
        return res.status(200).json({ message: "blog deleted successfully"});
      }
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error"});
    }
    };
  
  module.exports = {createNewBlog, addCommentToBlog, getSingleBlogByTitle, getAllBlogs, updateBlog, deleteBlog };
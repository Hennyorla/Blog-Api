const express =require('express');
const {
     createNewBlog, 
    addCommentToBlog ,
    getSingleBlogByTitle,
    getAllBlogs,
    deleteBlog,
    updateBlog,
} = require('../controllers/blogControllers');
const { requireSignin } = require('../middlewares/requireSignin');
const router = express.Router();

router .post('/', requireSignin, createNewBlog);
router.post('/:blogId/comment', requireSignin, addCommentToBlog);

router.get("/", getAllBlogs);
router.get("/:blogTitle", getSingleBlogByTitle);

router.put("/:blogId/update", requireSignin, updateBlog);
router.delete("/:blogId/delete", requireSignin, deleteBlog);

module.exports = router;
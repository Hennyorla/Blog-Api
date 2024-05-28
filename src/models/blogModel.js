const mongoose = require('mongoose');

const schema = mongoose.Schema;

blogSchema = new schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
        
    },

    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "comment",
        },
    ],

    user: {

       
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },
    },
 {timestamps: true});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
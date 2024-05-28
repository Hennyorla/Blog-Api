const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema;({

    comment: {
  type: String,
  required: true,
    },

    user: {
        
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },
    },

{ timestamps: true }
);

const Comment = mongoose.model("comment", commentSchema);

module.exports = Comment;


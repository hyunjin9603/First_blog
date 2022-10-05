const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    postId :{type:String, required :true},
    user : {type : String, required : true},
    password : {type :Number, required :true },
    content : {type : String, required : true} , 
},
{timestamps:true});

CommentSchema.virtual("commentId").get(function () {
    return this._id.toHexString();
    });
module.exports = mongoose.model('Comments', CommentSchema);
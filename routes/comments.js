const express = require('express');
const router = express('router');
const Comments = require('../schemas/comment');

router.post('/comments/:postId',async(req,res)=>{
    try{
        const {user,password,content} = req.body;
        const {postId} = req.params
        const createdcomment = 
        await Comments.create({postId,user,password,content})
        return res.json({Comment:createdcomment,'message':'댓글을 생성하였습니다'})
    }catch(err){
        console.log(err);
        res.status(500).send({err:err.message});
    }
});

router.get('/comments/:postId',async(req,res)=>{
    try{
        const {postId}=req.params
        const {user,content}=req.body;
        const comments = await Comments.find({})
        .select("user content")
        .sort({"createdAt" : "desc"});
        return res.send({comments})        
        
    }catch(err){
        console.log(err);
        res.status(500).send({err:err.message});
        
    }
});
router.put('/comments/:commentId',async(req,res)=>{
        const {commentId} = req.params;
        const {password,content} = req.body;
        const comments = await Comments.findOne({_id:commentId});
        console.log(password, comments.password)
        if(password !==comments.password){
            res.status(400).send({err : "invalid password"})
    }
    if(password ===comments.password){
        await Comments.updateOne({
            _id: commentId},
            {$set:{content}});
            return res.send({message: "댓글 수정하였습니다."})
        }   
});
router.delete('/comments/:commentId',async(req,res)=>{
        const {commentId} = req.params
        const {password} = req.body
        const comment = await Comments.findOne({_id:commentId});
        console.log(comment)
        if(password !==comment.password){
        res.json({err:"invalid password"})
        }
        console.log(password, comment.password)
        if(password ===comment.password){
            await Comments.deleteOne({_id:commentId});
            return res.send({ "message": "댓글을 삭제하였습니다."})   
        }
});



module.exports = router;
const express = require('express');
const router = express('router')
const Post = require('../schemas/post')
const mongoose = require('mongoose')

//게시글 조회
router.get('/posts', async (req,res)=>{
    try{
        const posts = await Post.find({})
        .select("user title content createdAt")
        .sort({"createdAt" : "desc"});
        return res.send({posts}) 
        
    }catch(err){
        console.log(err);
        return res.status(500).send({err: err.message})
    }
})
//게시글 작성
router.post('/posts', async (req, res)=>{
    try{
        const post = new Post(req.body);
        await post.save();
        return res.send({'message' : '게시글을 생성하였습니다'})
    }catch(err){
        console.log(err);
        return res.status(500).send({err: err.message})
    }
})

//게시글 상세조회
router.get('/posts/:postId', async(req,res)=>{
    const{ postId } = req.params;
    try{
        const post = await Post.findOne({_id: postId})
        .select("postId user title content");
        if(!mongoose.isValidObjectId(postId))
        return res.status(400).send({err:"invalid userId"})
        return res.send({post});
    }catch(err){
        console.log(err);
        return res.status(500).send({err: err.message})
    }
})

//게시글 수정
router.put('/posts/:postId', async(req,res)=>{
        const {postId} = req.params;
        const {password,title,content} = req.body;
        const post = await Post.findOne({postId});
        console.log(post.password,password)
        if(password !==post.password){
            res.status(400).send({err : "invalid password"})
        }
        
        if(password ===post.password){
            
            await Post.updateOne({
                _id: postId},
                {$set:{title, content}});
                return res.send({message: "게시글 수정하였습니다."})
            }   
    
});
//게시판 삭제
router.delete('/posts/:postId', async(req,res)=>{
    const {postId} = req.params;
    const {password} = req.body;
    const post = await Post.findOne({postId}); //await: db를 이용하겠다.
    console.log(post.password,password)
    if(password !==post.password){
        res.status(400).send({err : "invalid password"})
    }
    if(password ===post.password){ 
        await Post.deleteOne({
            _id: postId}
            );
            return res.send({message: "삭제완료하였습니다."})
        }   
});

module.exports = router;


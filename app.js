const express = require('express');
const mongoose = require('mongoose');
const app = express();
const postRouter= require('./routes/posts');
const commentRouter = require('./routes/comments');
const port = 3000;
const {Post} = require('./schemas/post')  //post.js DB작업 가능!

const MONGO_URI ='mongodb+srv://hyunjin9603:1234@cluster0.lnp9zul.mongodb.net/MyBlog?retryWrites=true&w=majority';

const server = async() =>{
    try{
        await mongoose.connect(MONGO_URI);
        console.log('MongoDB connected')
        app.use(express.json())

        app.use('/',postRouter)
        app.use('/',commentRouter)

        app.listen(3000, ()=>console.log('server listening on port 3000'))
    } catch(err){
        console.log(err)
    }
}

server();

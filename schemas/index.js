const mongoose = require("mongoose");
const connect = () => {
  mongoose
    .connect("mongodb+srv://hyunjin9603:1234@cluster0.lnp9zul.mongodb.net/MyBlog?retryWrites=true&w=majority")
    .catch(err => console.log(err));
};

mongoose.connection.on("error", err => {
  console.error("몽고디비 연결 에러", err);
});

module.exports = connect;
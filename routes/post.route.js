const express = require("express");
const postRouter = express.Router();
const { PostModel } = require("../models/post.model");

postRouter.get("/", async (req, res) => {
  const posts = await PostModel.find();
  res.send(posts);
});

postRouter.post("/add", async (req, res) => {
  const payload = req.body;
  try {
    const newPost = new PostModel(payload);
    await newPost.save();
    res.send({ msg: "Post created successfully" });
  } catch (err) {
    console.log(err);
    res.send({ msg: "Something went wrong in post creation" });
  }
});

postRouter.patch("/update/:id", async (req, res) => {
  const payload = req.body;
  const id = req.params.id;
  const post = await PostModel.findOne({ _id: id });
  const userId_in_post = post.userID;
  const userId_making_req = req.body.userID;
  try {
    if (userId_in_post == userId_making_req) {
      await PostModel.findByIdAndUpdate({ _id: id }, payload);
      res.send({ msg: "Updated Post Successfully" });
    } else {
      res.send({ msg: "Not Authorized" });
    }
  } catch (err) {
    console.log(err);
    res.send({ msg: "Something went wrong in post Updation" });
  }
});

postRouter.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  const post = await PostModel.findOne({ _id: id });
  const userId_in_post = post.userID;
  const userId_making_req = req.body.userID;
  try {
    if (userId_in_post == userId_making_req) {
      await PostModel.findByIdAndDelete({ _id: id });
      res.send({ msg: "Deleted Post Successfully" });
    } else {
      res.send({ msg: "Not Authorized" });
    }
  } catch (err) {
    console.log(err);
    res.send({ msg: "Something went wrong in post Deletion" });
  }
});

module.exports = { postRouter };

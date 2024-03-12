import express from "express";
import fs from "fs";

const router = express.Router();
router.get("/", (req, res) => {
  fs.readFile(global.mock_db, (err, data) => {
    //ERROR HANDLING
    if (err) {
      console.error("Error reading file:", err);
      res.status(500).send("Internal Server Error");
      return;
    }
    //PARSING THE JSON DATABASE FILE
    const jsonData = JSON.parse(data);
    //QUERYING FOR POST COLLECTION IN THE DATABASE
    const { posts } = jsonData;
    //SENDING POSTS TO THE CLIENT
    res.render("feed", { posts: posts });
  });
});

router.get("/personal/:id", (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    fs.readFile(global.mock_db, (err, data) => {
      //ERROR HANDLING
      if (err) {
        console.error("Error reading file:", err);
        res.status(500).send("Internal Server Error");
        return;
      }
      //PARSING THE JSON DATABASE FILE
      const jsonData = JSON.parse(data);
      //QUERYING FOR POST COLLECTION IN THE DATABASE
      const { posts, users } = jsonData;
      const user = users.find((user) => user.id === userId);
      if (!user) {
        res.status(404).json("User not found!");
        return;
      }
      const userPosts = [];
      posts.forEach((post) => {
        if (post.postAuthor === user.email) {
          userPosts.push(post);
        } else {
          return;
        }
      });
      //SENDING POSTs TO THE CLIENT
      res.render("personal-page", { posts: userPosts });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json("Internal Server Error");
  }
});
router.get("/post/edit", (req, res) => {
  res.render("post-create", { title: "New post" });
});
// DYNAMIC
router.get("/post/:id", (req, res) => {
  const postId = parseInt(req.params.id);
  fs.readFile(global.mock_db, (err, data) => {
    //ERROR HANDLING
    if (err) {
      console.error("Error reading file:", err);
      res.status(500).send("Internal Server Error");
      return;
    }
    //PARSING THE JSON DATABASE FILE
    const jsonData = JSON.parse(data);
    //QUERYING FOR POST COLLECTION IN THE DATABASE
    const { posts } = jsonData;
    //SENDING POST TO THE CLIENT
    const post = posts.find((post) => post.id === postId);
    res.render("post-page", { post: post });
  });
});
// DYNAMIC
router.get("/profile", (req, res) => {
  res.render("profile", { title: "Some profile" });
});

router.get("/sign-in", (req, res) => {
  res.render("sign-in", { title: "Sign-In Page" });
});

router.get("/sign-up", (req, res) => {
  res.render("sign-up");
});

export { router as webRoutes };

import fs from "fs";
import generateId from "../services/generateId.js";
import writeToFile from "../services/writeToFile.js";
import setCurrentDate from "../services/currentDate.js";

//GETS ALL POSTS AND SENDS THEM TO THE CLIENT
export const getAllPosts = (req, res) => {
  try {
    // READING THE JSON DATABASE FILE
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
      console.log(posts);
      //SENDING POSTS TO THE CLIENT
      res.status(200).json(posts);
    });
  } catch (err) {
    //ERROR HANDLING
    console.error(err);
    res.status(500).json("Internal Server Error");
  }
};

//CREATES NEW POSTS
export const createNewPost = async (req, res, next) => {
  try {
    //GETTING POST DATA FROM REQUEST
    const { postTitle, postBody, postAuthor } = req.body;
    //READING THE JSON DATABASE FILE
    const data = fs.readFileSync(global.mock_db);
    //PARSING THE JSON DATABASE FILE DATA
    const jsonData = JSON.parse(data);
    //QUERYING FOR POST COLLECTION IN THE DATABASE
    const { posts } = jsonData;
    //GENERATING AND FORMATING CURRENT DATE
    //CREATING NEW POST
    const newPost = {
      id: generateId(),
      postTitle,
      postBody,
      postAuthor,
      views: 0,
      likes: 0,
      createdAt: setCurrentDate(),
      updatedAt: setCurrentDate(),
    };
    //ADDING NEW POST THE PARSED DATABASE COLLECTION
    posts.push(newPost);
    //WRITING TO/SAVING CHANGES IN THE DATABASE
    await writeToFile(global.mock_db, jsonData);
    //SENDING SUCCESS RESPONSE
    res.status(200).json(newPost);
    next();
  } catch (err) {
    //ERROR HANDLING
    console.error(err);
    res.status(500).json("Internal Server Error");
  }
};

//SENDS POST WITH REQUESTED ID
export const getPostById = (req, res) => {
  //RECEIVING POST ID VIA PARAMETERS
  const postId = parseInt(req.params.id);
  try {
    //READING THE JSON DATABASE FILE
    fs.readFile(global.mock_db, (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).json("Internal Server Error");
        return;
      }
      //PARSING THE JSON DATABASE FILE DATA
      const jsonData = JSON.parse(data);
      //QUERYING FOR POST COLLECTION IN THE DATABASE
      const { posts } = jsonData;
      //SEARCHING FOR POST WITH REQUESTED ID
      const existingPost = posts.find((post) => {
        return post.id === postId;
      });
      if (!existingPost) {
        //IF POST WITH REQUESTED ID NOT FOUND
        res.status(404).json("Post not found!");
        return;
      }
      //SENDING POST WITH REQUESTED ID
      res.status(200).json(existingPost);
    });
  } catch (err) {
    //ERROR HANDLING
    console.error(err);
    res.status(500).json("Internal Server Error");
  }
};
//UPDATES EXISTING POST
export const updatePost = async (req, res, next) => {
  //RECEIVING POST ID VIA PARAMETERS
  const postId = parseInt(req.params.id);
  //RECEIVING DATA FROM THE BODY OF THE REQUEST
  const { postTitle, postBody, postAuthor } = req.body;
  try {
    //READING THE JSON DATABASE FILE
    const data = fs.readFileSync(global.mock_db);
    //PARSING THE JSON DATABASE FILE DATA
    const jsonData = JSON.parse(data);
    //QUERYING FOR POST COLLECTION IN THE DATABASE
    const { posts } = jsonData;
    //SEARCHING FOR POST WITH REQUESTED ID
    const existingPost = posts.find((post) => {
      return post.id === postId;
    });
    if (!existingPost) {
      //IF POST WITH REQUESTED ID NOT FOUND
      res.status(404).json("Post not found");
      return;
    }
    //UPDATING POST DATA
    if (postTitle) existingPost.postTitle = postTitle;
    if (postBody) existingPost.postBody = postBody;
    if (postAuthor) existingPost.postAuthor = postAuthor;
    existingPost.updatedAt = setCurrentDate();
    //WRITING TO/SAVING CHANGES IN THE DATABASE
    await writeToFile(global.mock_db, jsonData);
    //SENDING SUCCES RESPONSE
    await res.status(200).json(existingPost);
    next();
  } catch (err) {
    //ERROR HANDLING
    console.error(err);
    res.status(500).json("Internal Server Error");
  }
};

//DELETES POST WITH REQUESTED ID
export const deletePost = async (req, res) => {
  //RECEIVING POST ID VIA PARAMETERS
  const postId = parseInt(req.params.id);
  try {
    //READING THE JSON DATABASE FILE
    const data = fs.readFileSync(global.mock_db);
    //PARSING THE JSON DATABASE FILE DATA
    const jsonData = JSON.parse(data);
    //QUERYING FOR POSTS
    const { posts } = jsonData;
    //SEARCHING FOR INDEX OF POST WITH MATCHING ID
    const postIndex = posts.findIndex((post) => {
      return post.id === postId;
    });
    if (!posts[postIndex]) {
      //IF POST WITH REQUESTED INDEX NOT FOUND
      res.status(404).json("Post not found!");
      return;
    }
    //DELETING POST WITH REQUESTED INDEX
    posts.splice(postIndex, 1);
    //WRITING TO/SAVING CHANGES IN THE DATABASE
    await writeToFile(global.mock_db, jsonData);
    //SENDING SUCCESS RESPONSE
    await res.status(200).json({ message: "Post has been deleted", posts });
    next();
  } catch (err) {
    //ERROR HANDLING
    console.error(err);
    res.status(500).json("Internal Server Error");
  }
};

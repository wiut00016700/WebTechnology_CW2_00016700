import express from "express";
import {
  createNewPost,
  deletePost,
  getAllPosts,
  getPostById,
  updatePost,
} from "../controllers/posts.js";
import { login, signUp } from "../controllers/auth.js";

const router = express.Router();
//POSTS HANDLERS
//SENDS ALL POSTS FROM MOCK DATABASE
router.get("/posts", getAllPosts);
router.get("/posts/:id", getPostById);
//CREATES NEW POST IN MOCK DATABASE
router.post("/posts", createNewPost);
//UPDATES EXISTING POST IN MOCK DATABASE
router.patch("/posts/:id", updatePost);
//DELETES EXISTING POST IN MOCK DATABASE
router.delete("/posts/:id", deletePost);

//AUTH HANDLERS
router.post("/auth/sign-up", signUp);
router.post("/auth/login", login);
export { router as apiRoutes };

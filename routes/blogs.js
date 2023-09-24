const express = require("express");
const router = express.Router();
const Blog = require("../models/Blog");
const authMiddleware = require("../middleware/auth");
const checkIDValidity = require("../middleware/checkIDValidity");
const checkBlogOwner = require("../middleware/checkBlogOwner");
const {
  createBlog,
  getAllBlogs,
  getBlogID,
  deleteBlog,
  updateBlog,
  voteBlog,
} = require("../controllers/blogs");

router.get("/", authMiddleware, getAllBlogs);

router.post("/", authMiddleware, createBlog);

router.get("/:id", authMiddleware, checkIDValidity, getBlogID);

router.delete(
  "/:id",
  authMiddleware,
  checkIDValidity,
  checkBlogOwner,
  deleteBlog
);

router.patch(
  "/:id",
  authMiddleware,
  checkIDValidity,
  checkBlogOwner,
  updateBlog
);

router.post("/:id/vote", authMiddleware, checkIDValidity, voteBlog);

module.exports = router;

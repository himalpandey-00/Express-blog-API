const Blog = require("../models/Blog");

const checkBlogOwner = async (req, res, next) => {
  const blog = await Blog.findById(req.params.id);
  if (blog) {
    if (blog.author == req.user_id) {
      return next();
    } else {
      return res.status(401).json({ error: "You don't own the blog" });
    }
  } else {
    return res.status(404).json({ error: "Blog not found" });
  }
};

module.exports = checkBlogOwner;

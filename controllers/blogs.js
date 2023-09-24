const Blog = require("../models/Blog");

const createBlog = async (req, res) => {
  const { title, content } = req.body;

  try {
    const blog = await Blog.create({
      title: title,
      content: content,
      author: req.user_id,
    });
    return res.json(blog);
  } catch (err) {
    return res.json({ message: err });
  }
};

const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().select("-vote");
    return res.json(blogs);
  } catch (err) {
    return res.json({ message: err });
  }
};

const getBlogID = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).select("-vote");
    return res.json(blog);
  } catch (err) {
    return res.json({ message: err });
  }
};

const deleteBlog = async (req, res) => {
  try {
    const removeBlog = await Blog.findByIdAndDelete({ _id: req.params.id });
    return res.json({ success: "Successfully deleted" });
  } catch (err) {
    return res.json({ message: err });
  }
};

const updateBlog = async (req, res) => {
  try {
    const updateBlog = await Blog.findOneAndUpdate(
      { _id: req.params.id },
      { title: req.body.title, content: req.body.content },
      { new: true }
    ).select("-vote");
    return res.json(updateBlog);
  } catch (err) {
    return res.json({ message: err });
  }
};

const voteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (blog) {
      const previouslyVoted = blog.vote.find(
        (previouslyVoted) => previouslyVoted.user_id == req.user_id
      );

      if (!previouslyVoted) {
        const upVote = await Blog.findOneAndUpdate(
          { _id: req.params.id },
          { $push: { vote: { user_id: req.user_id } }, $inc: { voteCount: 1 } },
          { new: true }
        ).select("-vote");
        return res.json(upVote);
      } else {
        const cancelVote = await Blog.findOneAndUpdate(
          { _id: req.params.id },
          {
            $pull: { vote: { user_id: req.user_id } },
            $inc: { voteCount: -1 },
          },
          { new: true }
        ).select("-vote");
        return res.json(cancelVote);
      }
    }
  } catch (err) {
    return res.json(err);
  }
};

module.exports = {
  createBlog,
  getAllBlogs,
  getBlogID,
  deleteBlog,
  updateBlog,
  voteBlog,
};

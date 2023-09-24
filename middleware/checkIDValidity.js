const checkIDValidity = (req, res, next) => {
  const id = req.params.id;
  if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    return next();
  } else {
    res.status(400).json({ error: "Invalid ID provided" });
  }
};

module.exports = checkIDValidity;
// req: GET /api/posts
const getPosts = (req, res) => {
  res.status(200).json({
    message: 'Get posts'
  });
};

// req: POST /api/posts
const addPost = (req, res) => {
  res.status(200).json({
    message: 'Set post'
  });
};

// req: PUT /api/posts/:id
const updatePost = (req, res) => {
  res.status(200).json({
    message: `Update post ${req.params.id}`
  });
};

// req: DELETE /api/posts/:id
const deletePost = (req, res) => {
  res.status(200).json({
    message: `Delete post ${req.params.id}`
  });
};

export { getPosts, addPost, updatePost, deletePost };

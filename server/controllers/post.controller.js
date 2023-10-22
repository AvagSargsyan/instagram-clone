import asyncHandler from 'express-async-handler';

// req: GET /api/posts
const getPosts = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: 'Get posts'
  });
});

// req: POST /api/posts
const addPost = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error('Please add a text field');
  }
  res.status(200).json({
    message: 'Set post'
  });
});

// req: PUT /api/posts/:id
const updatePost = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: `Update post ${req.params.id}`
  });
});

// req: DELETE /api/posts/:id
const deletePost = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: `Delete post ${req.params.id}`
  });
});

export { getPosts, addPost, updatePost, deletePost };

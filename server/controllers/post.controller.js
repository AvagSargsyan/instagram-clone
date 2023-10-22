import asyncHandler from 'express-async-handler';
import Post from '../models/post.model.js';

// req: GET /api/posts
const getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find();

  res.status(200).json(posts);
});

// req: POST /api/posts
const addPost = asyncHandler(async (req, res) => {
  if (!req.body.content) {
    res.status(400);
    throw new Error('Please add a content field');
  }

  const post = await Post.create({
    content: req.body.content
  });

  res.status(201).json(post);
});

// req: PUT /api/posts/:id
const updatePost = asyncHandler(async (req, res) => {
  if (!req.body.content) {
    res.status(400);
    throw new Error('Please add a content field');
  }

  try {
    await Post.findById(req.params.id);
  } catch (error) {
    res.status(400);
    throw new Error('Post not found');
  }

  const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  });

  res.status(200).json(updatedPost);
});

// req: DELETE /api/posts/:id
const deletePost = asyncHandler(async (req, res) => {
  try {
    await Post.findById(req.params.id);
  } catch (error) {
    res.status(400);
    throw new Error('Post not found');
  }

  await Post.deleteOne({ _id: req.params.id });

  res.status(200).json({ id: req.params.id });
});

export { getPosts, addPost, updatePost, deletePost };

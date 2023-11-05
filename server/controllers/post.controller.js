import asyncHandler from 'express-async-handler';
import Post from '../models/post.model.js';

// req: GET /api/posts/all
const getAllPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find().sort('-createdAt').populate({
    path: 'author',
    select: 'name'
  });

  res.status(200).json(posts);
});

// req: GET /api/posts
const getOwnPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({ author: req.user.id }).sort('-createdAt');

  res.status(200).json(posts);
});

// req: POST /api/posts
const addPost = asyncHandler(async (req, res) => {
  if (!req.body.content) {
    res.status(400);
    throw new Error('Please add a content field');
  }

  console.log(req.body);
  console.log(req.uploadedFileName);
  console.log(req.file);
  

  const post = await Post.create({
    content: req.body.content,
    author: req.user.id,
    imageSrc: req.uploadedFileName
  });

  res.status(201).json(post);
});

// req: PUT /api/posts/:id
const updatePost = asyncHandler(async (req, res) => {
  let post;

  try {
    post = await Post.findById(req.params.id);
  } catch (error) {
    res.status(400);
    throw new Error('Post not found');
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error('User not found');
  }

  // Make sure the logged in user matches the post author
  if (post.author.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  });

  res.status(200).json(updatedPost);
});

// req: DELETE /api/posts/:id
const deletePost = asyncHandler(async (req, res) => {
  let post;

  try {
    post = await Post.findById(req.params.id);
  } catch (error) {
    res.status(400);
    throw new Error('Post not found');
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error('User not found');
  }

  // Make sure the logged in user matches the post author
  if (post.author.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  await post.deleteOne();

  res.status(200).json({ id: req.params.id });
});

export { getAllPosts, getOwnPosts, addPost, updatePost, deletePost };

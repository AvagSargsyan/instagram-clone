import asyncHandler from 'express-async-handler';
import Post from '../models/post.model.js';
import path from 'path';
import fs from 'fs';

// req: GET /api/posts/all
const getAllPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find()
    .sort('-createdAt')
    .populate({
      path: 'author',
      select: ['name', 'profilePictureSrc']
    });

  res.status(200).json(posts);
});

// req: GET /api/posts
const getOwnPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({ author: req.user.id })
    .sort('-createdAt')
    .populate({
      path: 'author',
      select: ['name', 'profilePictureSrc']
    });

  res.status(200).json(posts);
});

// req: POST /api/posts
const addPost = asyncHandler(async (req, res) => {
  if (!req.body.content) {
    res.status(400);
    throw new Error('Please add a content field');
  }

  const post = await Post.create({
    content: req.body.content,
    author: req.user.id,
    imageSrc: `/uploads/images/${req.uploadedFileName}`
  });

  const serializedPost = await post.populate({
    path: 'author',
    select: ['name', 'profilePictureSrc']
  });

  res.status(201).json(serializedPost);
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

  // Delete the associated image file
  const imagePath = path.join('server/', post.imageSrc);
  try {
    await fs.promises.unlink(imagePath);
  } catch (err) {
    console.error(`Error deleting image: ${err}`);
    res.status(500);
    throw new Error('Image deletion failed');
  }

  // Delete the post from the database
  await post.deleteOne();

  res.status(200).json({ id: req.params.id });
});

export { getAllPosts, getOwnPosts, addPost, updatePost, deletePost };

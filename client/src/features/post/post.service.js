import axios from 'axios';

const API_URL = '/api/posts';

// Get all posts
const getAllPosts = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};

// Get own posts
const getOwnPosts = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  const response = await axios.get(`${API_URL}/ownPosts`, config);

  return response.data;
};

// Create post
const createPost = async (formData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  };

  const response = await axios.post(API_URL, formData, config);

  return response.data;
};

// Delete post
const deletePost = async (postId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  const response = await axios.delete(`${API_URL}/${postId}`, config);

  return response.data;
};

const postService = { getAllPosts, getOwnPosts, createPost, deletePost };

export default postService;

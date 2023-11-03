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
const createPost = async (postData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  const response = await axios.post(API_URL, postData, config);

  return response.data;
};

const postService = { getAllPosts, getOwnPosts, createPost };

export default postService;

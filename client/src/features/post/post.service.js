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

// Get all posts
const getOwnPosts = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  const response = await axios.get(`${API_URL}/ownPosts`, config);

  return response.data;
};

const postService = { getAllPosts, getOwnPosts };

export default postService;

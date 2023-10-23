// req: POST /api/users/register
const registerUser = (req, res) => {
  res.json({
    message: 'Register user'
  });
};

// req: POST /api/users/login
const loginUser = (req, res) => {
  res.json({
    message: 'Login user'
  });
};

// req: GET /api/users/me
const getMe = (req, res) => {
  res.json({
    message: 'User data'
  });
};

export { registerUser, loginUser, getMe };

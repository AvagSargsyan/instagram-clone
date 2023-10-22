import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({
    message: 'Get posts'
  });
});

router.post('/', (req, res) => {
  res.status(200).json({
    message: 'Set post'
  });
});

router.put('/:id', (req, res) => {
  res.status(200).json({
    message: `Update post ${req.params.id}`
  });
});

router.delete('/:id', (req, res) => {
  res.status(200).json({
    message: `Delete post ${req.params.id}`
  });
});

export default router;

import express from 'express';
import postRoutes from './routes/postRoutes.js';

const port = process.env.PORT || 5000;

const app = express();
app.use('/api/posts', postRoutes);

app.listen(port, () => console.log(`Server started on port ${port}`));

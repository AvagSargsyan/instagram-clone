import express from 'express';
import { errorHandler } from './middleware/error.middleware.js';
import postRoutes from './routes/post.route.js';
import userRoutes from './routes/user.route.js';
import connectDB from './config/db.config.js';
import constants from './constants.js';

const port = process.env.PORT || 5000;

connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/uploads/images', express.static(constants.IMAGE_PATH));

app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));

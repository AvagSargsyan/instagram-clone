import express from 'express';
import { errorHandler } from './middleware/error.middleware.js';
import postRoutes from './routes/postRoutes.js';
import connectDB from './config/db.config.js';

const port = process.env.PORT || 5000;

connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/posts', postRoutes);

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));

import express from 'express';
import { errorHandler } from './middleware/error.middleware.js';
import postRoutes from './routes/postRoutes.js';

const port = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/posts', postRoutes);

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));

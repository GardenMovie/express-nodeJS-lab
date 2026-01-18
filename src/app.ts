import express from 'express';
import itemRoutes from './routes/itemRoutes';
import { errorHandler } from './middlewares/errorHandler';

const app = express();


app.use(express.json());

// Health check endpoint
import { HTTP_STATUS } from './constants/httpStatus';

app.get('/health', (req, res) => {
    res.status(HTTP_STATUS.OK).json({ status: 'ok', timestamp: new Date().toISOString() });
});
// Routes
app.use('/api/items', itemRoutes);

// Global error handler (should be after routes)
app.use(errorHandler);

export default app;
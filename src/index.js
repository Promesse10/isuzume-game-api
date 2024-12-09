import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import errorHandler from './middlewares/errorHandler.js';
import gameRoutes from './routes/game.routes.js';
import playerRoutes from './routes/player.routes.js';
import questionRoutes from './routes/question.routes.js';
import prizeRoutes from './routes/prize.routes.js';
import { connectDB } from './config/db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

//Connection of DB

connectDB()

// Routes
app.use('/api/game', gameRoutes);
app.use('/api/player', playerRoutes);
app.use('/api/question', questionRoutes);
app.use('/api/prize', prizeRoutes);

// Error handling middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
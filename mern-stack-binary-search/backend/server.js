import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';

import authRoutes from './routes/auth.routes.js';
import searchRoutes from './routes/search.routes.js';
import binaryRoutes from './routes/binary.routes.js';

dotenv.config();

const app = express();


//Middleware

app.use(cors());
app.use(express.json());

// routes
app.use('/api/auth', authRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/binaryarray', binaryRoutes);

connectDB();

// Health Check 
app.get('/health', (req, res) => {
    res.json({
        status: 'OK',
        message: 'DSA Learning API is reunning'
    })
});

const PORT = process.env.PORT || 5000;

// Vercel need to exports the app handler instead of listen()

if(process.env.NODE_ENV !== production){
app.listen(PORT, () =>  {
    console.log(`Server running on ${PORT}`)
});
}

export default app;



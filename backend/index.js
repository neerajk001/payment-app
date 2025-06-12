import express from 'express';
import mongoose from 'mongoose'; 
import cors from 'cors'; 

import authroutes from './routes/auth.routes.js';
import accountroutes from './routes/account.routes.js';

const app = express();


app.use(cors({
  origin: ['http://localhost:5173', 'https://payment-app-dacc.vercel.app'],
  credentials: true
}));

app.use(express.json()); 

// Use the main router
app.use('/api/v1', authroutes);
app.use('/api/v1/account', accountroutes);

const main = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect("mongodb+srv://neeraj001:heyramheyram001@cluster0.rlawr.mongodb.net/paytm");
        console.log('Connected to MongoDB');

        // Start the Express server
        app.listen(3000, () => {
            console.log('Server starting on port 3000');
        });
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};


main();

import express from 'express';
import mongoose from 'mongoose'; // Import mongoose as an ES module
import cors from 'cors'; // Uncomment if you want to use CORS

import authroutes from './routes/auth.routes.js'
import accountroutes from './routes/account.routes.js'

const app = express();

// Middleware to parse JSON requests
app.use(cors({
    origin: "http://localhost:5173",  // Change this to your frontend's port
    credentials: true
}));
app.use(express.json()); 



// Use the main router
app.use('/api/v1', authroutes);
app.use('/api/v1/account',accountroutes)


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

// Call the main function to start the application
main();

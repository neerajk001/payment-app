import jwt from 'jsonwebtoken';
import JWT_SECRET  from '../config.js'; // Ensure correct import

export const authMiddleware = (req, res, next) => {
    
    const authHeader = req.headers.authorization; 
    

    // Check if authHeader exists and starts with "Bearer "
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({
            success: false,
            message: "Token not provided"
        });
    }

    try {
        const token = authHeader.split(' ')[1]; // Extract token after "Bearer "
        const decoded = jwt.verify(token, JWT_SECRET); // Verify token

        req.userId = decoded.userId; // Attach userId to request
        next(); // Proceed to next middleware
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        });
    }
};

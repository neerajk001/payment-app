import JWT_SECRET from "./config.js";
import jwt from 'jsonwebtoken';

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log("account routes reaching here");

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      message: "Authorization header missing or malformed"
    });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log("decoded", decoded);

    if (decoded.id) {
      req.userId = decoded.id;
      return next();
    } else {
      return res.status(401).json({
        message: "Invalid token payload"
      });
    }
  } catch (error) {
    console.error("JWT Middleware Error:", error.message);
    return res.status(401).json({
      message: "Invalid or expired token"
    });
  }
};

export default authMiddleware;

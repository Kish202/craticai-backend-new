// src/middlewares/authMiddleware.js
import jwt, { decode } from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  try {
    console.log("🚀 [authMiddleware] Hit");

    // Log all cookies
    console.log("🍪 Cookies received:", req.cookies);

    const token = req.cookies?.token;
    if (!token) {
      console.warn("⚠️ [authMiddleware] No token found in cookies");
      return res.status(401).json({ message: "Not authenticated - no token" });
    }

    console.log("🔑 [authMiddleware] Token found:", token);

    // Try decoding
    let decoded;
    try {
      decoded = jwt.verify(token, "123xyzqetyui123123"); // must match jwt.sign
      console.log("✅ [authMiddleware] Token successfully decoded:", decoded);
    } catch (verifyErr) {
      console.error("❌ [authMiddleware] Token verification failed:", verifyErr.message);
      return res.status(401).json({ message: "Invalid or expired token" });
    }
console.log("Decoded token:", decoded);
    // Attach user info
    req.user = {
      id : decoded.id,
      email: decoded.email,

    };

    console.log("👤 [authMiddleware] User attached to req.user:", req.user);

    next();
  } catch (err) {
    console.error("💥 [authMiddleware] Unexpected error:", err);
    return res.status(401).json({ message: "Auth middleware crashed" });
  }
};


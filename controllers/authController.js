// src/controllers/auth.controller.js
import { registerUser, loginUser, getUserById  } from "../services/authService.js";

/**
 * Register a new user
 */
export async function register(req, res) {
  try {
    console.log("🚀 Register endpoint hit");
    console.log("Request body:", req.body);

    const { email, password } = req.body;

    if (!email || !password) {
      console.warn("⚠️ Missing fields in registration");
      return res.status(400).json({ error: ", email, and password are required" });
    }

    console.log(`Registering user: ${email}`);
    const user = await registerUser(email, password);

    console.log("✅ User registered successfully:", user);
    res.status(201).json({ user });
  } catch (err) {
    console.error("❌ Registration error:", err);
    res.status(400).json({ error: err.message });
  }
}

/**
 * Login existing user
 */
export async function login(req, res) {
  try {
    console.log("🚀 Login endpoint hit");
    console.log("Request body:", req.body);

    const { email, password } = req.body;

    if (!email || !password) {
      console.warn("⚠️ Missing email or password in login");
      return res.status(400).json({ error: "Email and password are required" });
    }

    console.log(`Logging in user: ${email}`);
    const { user, token } = await loginUser(email, password);

    if (!user || !token) {
      console.warn("⚠️ Login failed for user:", email);
      return res.status(400).json({ error: "Invalid email or password" });
    }

    console.log("✅ Login successful, setting cookie");
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 1000, // 1 hour
    });

    res.json({ user });
  } catch (err) {
    console.error("❌ Login error:", err);
    res.status(400).json({ error: err.message });
  }
}

/**
 * Logout user by clearing token cookie
 */
export async function logout(req, res) {
  console.log("🚀 Logout endpoint hit");
  res.clearCookie("token");
  console.log("✅ Token cookie cleared");
  res.json({ message: "Logged out" });
}

/**
 * Get currently logged-in user
 */
export async function getMe(req, res) {
  try {
    console.log("🚀 getMe endpoint hit");
    console.log("req.user:", req.user);

    if (!req.user ) {
      console.warn("⚠️ No user info in request");
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await getUserById(req.user.id); // make sure this function exists

    if (!user) {
      console.warn("⚠️ User not found for ID:", req.user.id);
      return res.status(404).json({ message: "User not found" });
    }

    console.log("✅ User fetched successfully:", user);
    res.json({ user });
  } catch (err) {
    console.error("❌ getMe error:", err);
    res.status(500).json({ message: "Server error" });
  }
}

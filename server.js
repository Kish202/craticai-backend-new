import express  from 'express';
import  cors  from 'cors';
import authRoutes from './routes/authRoutes.js';
import earlyAccessRoutes from './routes/earlyaccessRoutes.js';
import cookieParser from "cookie-parser";

import dotenv from 'dotenv';
dotenv.config();


const app = express();



app.use(cors({
  origin: 'http://localhost:5173', 
//  origin:'https://craticai.com/',
  credentials: true,
}));
app.use(cookieParser());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("🚀 Backend is running on Vercel!");
});
app.use('/client', earlyAccessRoutes);
app.use('/api/auth', authRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`);
});

export default app;


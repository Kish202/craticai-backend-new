


import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { findUserByEmail, createUser, findById } from '../repositories/authRepository.js';

const JWT_SECRET = '123xyzqetyui123123'

export async function registerUser(email, password) {
  const existingUser = await findUserByEmail(email);
  if (existingUser) throw new Error("User already exists");

  const hash = await bcrypt.hash(password, 10);
  return await createUser(email, hash);
}

export async function loginUser(email, password) {
  const user = await findUserByEmail(email);
  if (!user) throw new Error("Invalid email or password");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid email or password");

  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: "1h",
  });

  return { user, token };
}

export async function getUserById(id) {
  return await findById(id);
}


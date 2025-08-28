import User from "../user/user.model.js";

import {
    generateAccessToken,
    generateRefreshToken,
} from "./token.service.js";

export const loginUser = async (email, password) => {
  if (!email || !password) throw new Error("Missing required fields");

  const user = await User.findOne({ email }).select("+password");
  if (!user) throw new Error("User not found");

  const isValid = await user.comparePassword(password);
  if (!isValid) throw new Error("Invalid credentials");

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  user.refreshTokens.push({ token: refreshToken });
  await user.save();

  return { accessToken, refreshToken, user: user.toJSON() };
};

export const signupUser = async ({ name, email, password, role }) => {
  if (!name || !email || !password) throw new Error("Missing required fields");

  if (role && role== "admin"){
    throw new Error("Admin role is reserved")
  }
  if (role && role == "instructor"){
      throw new Error("You cannot sign up directly as an instructor. Please apply after registration.");
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error("User already exists");

  const newUser = await User.create({ name, email, password, role });

  return newUser.toJSON();
};

export const logoutUser = async (userId, refreshToken) => {
  if (!userId || !refreshToken) throw new Error("Missing required fields");

  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  user.refreshTokens = user.refreshTokens.filter(
    (t) => t.token !== refreshToken
  );
  await user.save();

  return { message: "Logged out successfully" };
};
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();
const { generateAccessToken, generateRefreshToken } = require('../utils/jwt');

// Login User
exports.login = async (email, password) => {
  const user = await prisma.user.findUnique({
      where: { email }
  });
  if (!user) {
      throw new Error('Invalid email or password');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
      throw new Error('Invalid email or password');
  }

  // Generate Tokens
  const payload = { id: user.id, email: user.email, role: user.role };
  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  // Save Refresh Token to Database
  await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken }
  });

  return { accessToken, refreshToken };
};

// Refresh Token
exports.refreshToken = async (token) => {
  const user = await prisma.user.findFirst({
      where: { refreshToken: token }
  });

  if (!user) {
      throw new Error('Invalid refresh token');
  }

  const payload = { id: user.id, email: user.email, role: user.role };
  const newAccessToken = generateAccessToken(payload);
  const newRefreshToken = generateRefreshToken(payload);

  // Update Refresh Token in Database
  await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken: newRefreshToken }
  });

  return { accessToken: newAccessToken, refreshToken: newRefreshToken };
};
// Get all users
exports.getAllUsers = async () => {
  return await prisma.user.findMany();
};

// Get user by ID
exports.getUserById = async (id) => {
  return await prisma.user.findUnique({
    where: { id }
  });
};

// Create new user
exports.createUser = async (data) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(data.password, salt);
  return await prisma.user.create({
      data: {
          ...data,
          password: hashedPassword
      }
  });
};

// Update user by ID
exports.updateUser = async (id, data) => {
  // Nếu có password trong data thì mã hóa lại
  if (data.password) {
      const salt = await bcrypt.genSalt(10);
      data.password = await bcrypt.hash(data.password, salt);
  }

  // Cập nhật thông tin user
  return await prisma.user.update({
      where: { id },
      data
  });
};

// Delete user by ID
exports.deleteUser = async (id) => {
  return await prisma.user.delete({
    where: { id }
  });
};

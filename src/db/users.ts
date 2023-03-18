// Import Mongoose module
import mongoose from 'mongoose';

// Define user schema using Mongoose
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  authentication: {
    password: { type: String, required: true, select: false },
    salt: { type: String, select: false },
    sessionToken: { type: String, select: false },
  },
});

// Create user model using defined schema
export const UserModel = mongoose.model('User', UserSchema);

// Export helper functions to interact with user model

// Get all users
export const getUsers = () => UserModel.find();

// Get user by email
export const getUserByEmail = (email: string) => UserModel.findOne({ email });

// Get user by session token
export const getUsersBySessionToken = (sessionToken: string) =>
  UserModel.findOne({ 'authentication.sessionToken': sessionToken });

// Get user by ID
export const getUsersById = (id: string) => UserModel.findById(id);

// Create new user and convert Mongoose document to plain JS object
export const createUser = (values: Record<string, any>) =>
  new UserModel(values).save().then((user) => user.toObject());

// Delete user by ID
export const deleteUserById = (id: string) =>
  UserModel.findOneAndDelete({ _id: id });

// Update user by ID
export const updateUserById = (id: string, values: Record<string, any>) =>
  UserModel.findByIdAndUpdate(id, values);

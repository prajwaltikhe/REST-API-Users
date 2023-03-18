// Import necessary modules
import express from 'express';
import { deleteUserById, getUsers, getUsersById } from '../db/users';

// Middleware function that returns all users from the database
export const getAllUsers = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    // Get all users from the database
    const users = await getUsers();

    // Return a JSON response with users and 200 status code
    return res.status(200).json(users);
  } catch (error) {
    // Log any errors and return a 400 error
    console.log(error);
    return res.sendStatus(400);
  }
};

// Middleware function that deletes a user with the given ID
export const deleteUser = async (
  req: express.Request, // Request object
  res: express.Response // Response object
) => {
  try {
    // Get the ID of the user to be deleted from the request parameters
    const { id } = req.params;

    // Delete the user with the given ID from the database
    const deletedUser = await deleteUserById(id);

    // Return the deleted user as a JSON response
    return res.json(deletedUser);
  } catch (error) {
    // Log any errors and return a 400 error
    console.log(error);
    return res.sendStatus(400);
  }
};

// Middleware function that updates a user with the given ID
export const updateUser = async (
  req: express.Request, // Request object
  res: express.Response // Response object
) => {
  try {
    // Get the ID of the user to be updated from the request parameters
    const { id } = req.params;

    // Get the new username from the request body
    const { username } = req.body;

    // If no username was provided, return a 400 error
    if (!username) {
      return res.sendStatus(400);
    }

    // Get the user with the given ID from the database
    const user = await getUsersById(id);

    // Update the user's username with the new username
    user.username = username;

    // Save the updated user to the database
    await user.save();

    // Return the updated user as a JSON response with a 200 status code
    return res.status(200).json(user).end();
  } catch (error) {
    // Log any errors and return a 400 error
    console.log(error);
    return res.sendStatus(400);
  }
};

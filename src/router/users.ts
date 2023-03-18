// Import the required dependencies
import express from 'express';
import { deleteUser, getAllUsers, updateUser } from '../controllers/users';
import { isAdmin, isAuthenticated } from '../middlewares';

export default (router: express.Router) => {
  // GET request to get all users, middleware to check authentication first
  router.get('/users', isAuthenticated, getAllUsers);
  // DELETE request to delete a user by id, middleware to check authentication and admin status
  router.delete('/users/:id', isAuthenticated, isAdmin, deleteUser);
  // PATCH request to update a user by id, middleware to check authentication and admin status
  router.patch('/users/:id', isAuthenticated, isAdmin, updateUser);
};

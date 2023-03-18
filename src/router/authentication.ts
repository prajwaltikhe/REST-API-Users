// Import the required dependencies
import express from 'express';
import { login, register } from '../controllers/authentication';

// Export a function that takes in a router instance and defines authentication routes
export default (router: express.Router) => {
  router.post('/auth/register', register);
  router.post('/auth/login', login);
};

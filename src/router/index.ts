// Import the required dependencies
import express from 'express';
import authentication from './authentication';
import users from './users';

// Create a new router instance
const router = express.Router();

// Export a function that returns the router after applying the authentication & users middleware
export default (): express.Router => {
  authentication(router);
  users(router);
  return router;
};

import express from 'express';
import { get, merge } from 'lodash';
import { getUsersBySessionToken } from '../db/users';

//Middleware function that checks if the user is an admin.
export const isAdmin = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { id } = req.params;
    const currentUserId = get(req, 'identity._id' as string);

    if (!currentUserId) {
      return res.sendStatus(403); // User is not authenticated
    }

    if (currentUserId.toString() !== id) {
      return res.sendStatus(400); // User is not authorized to perform this action
    }

    // Calls the next middleware function if the user is an admin
    return next();
  } catch (error) {
    // Log any errors and return a 400 error
    console.log(error);
    return res.sendStatus(400);
  }
};

// Middleware function that checks if the user is authenticated.
export const isAuthenticated = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    // Get session token from the cookies in the request
    const sessionToken = req.cookies['REST-API'];

    // Check if session token exist
    if (!sessionToken) {
      return res.sendStatus(400);
    }

    // Get the user associated with the session token from the database
    const existingUser = await getUsersBySessionToken(sessionToken);

    // Check if user exist
    if (!existingUser) {
      return res.sendStatus(403);
    }

    // Merge the user information with the request object
    merge(req, { identity: existingUser });

    // Calls the next middleware function if the user is authenticated
    return next();
  } catch (error) {
    // Log any errors and return a 400 error
    console.log(error);
    return res.sendStatus(400);
  }
};

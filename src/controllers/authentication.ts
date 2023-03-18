// Import necessary modules
import express from 'express';
import { createUser, getUserByEmail } from '../db/users';
import { authentication, random } from '../helpers';

// Login async function
export const login = async (req: express.Request, res: express.Response) => {
  try {
    // Request data from body
    const { email, password } = req.body;

    // If any field is missing, send bad request
    if (!email || !password) {
      return res.sendStatus(400);
    }

    // Check if user with given email already exists
    const user = await getUserByEmail(email).select(
      '+authentication.salt +authentication.password'
    );

    // If user not exist, send bad request
    if (!user) {
      return res.sendStatus(400);
    }

    // Generate a hash based on the provided password and user's salt
    const expectedHash = authentication(user.authentication.salt, password);

    // Compare the expected hash with the stored hash
    if (user.authentication.password !== expectedHash) {
      return res.sendStatus(403);
    }

    // Generate a random salt for the user's session token.
    const salt = random();

    // Create the session token by hashing the user's id and the generated salt.
    user.authentication.sessionToken = authentication(
      salt,
      user._id.toString()
    );

    // Save the updated user object in the database.
    await user.save();

    // Set the REST-API cookie with the session token for the user.
    res.cookie('REST-API', user.authentication.sessionToken, {
      domain: 'localhost',
      path: '/',
    });

    // Return success response with user data.
    return res.status(200).json(user).end();
  } catch (error) {
    // Log any errors and return a 400 error
    console.log(error);
    return res.sendStatus(400);
  }
};

// Register async function
export const register = async (req: express.Request, res: express.Response) => {
  try {
    // Request data from body
    const { email, password, username } = req.body;

    // If any field is missing, send bad request
    if (!email || !password || !username) {
      return res.sendStatus(400);
    }

    // Check if user with given email already exists
    const existingUser = await getUserByEmail(email);

    // If user already exists, send bad request
    if (existingUser) {
      return res.sendStatus(400);
    }

    // Generate a random salt
    const salt = random();

    // Create a new user
    const user = await createUser({
      email,
      username,
      authentication: { salt, password: authentication(salt, password) },
    });

    // Send success response with user object
    return res.status(200).json(user).end();
  } catch (error) {
    // Log any errors and return a 400 error
    console.log(error);
    return res.sendStatus(400);
  }
};

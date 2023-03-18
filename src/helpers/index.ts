// Import the required dependencies
import crypto from 'crypto';

// Define the secret used for authentication
const SECRET = 'REST-API';

// Generate a random string using the crypto library
export const random = () => crypto.randomBytes(128).toString('base64');

// Create a hash using the salt and password provided, combined with the secret
export const authentication = (salt: string, password: string) => {
  return (
    crypto
      // Create a HMAC hash using salt & password, separated by a '/'
      .createHmac('sha256', [salt, password].join('/'))
      // Append the secret to the HMAC hash
      .update(SECRET)
      // Convert the result to hexadecimal format
      .digest('hex')
  );
};

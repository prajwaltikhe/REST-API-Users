// Import necessary modules
import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';
import router from './router';

// Create an instance of express app
const app = express();

// Enable cross-origin resource sharing
app.use(
  cors({
    credentials: true,
  })
);

// Enable response compression
app.use(compression());

// Parse incoming request cookies
app.use(cookieParser());

// Parse incoming request body in JSON format
app.use(bodyParser.json());

// Create HTTP server using express app
const server = http.createServer(app);

// Start server and listen on port 8080
server.listen(8080, () => {
  console.log('Server running on http://localhost:8080/');
});

// Connection to MongoDB using Mongoose
const MONGO_URL =
  'mongodb+srv://prajwaltikhe:PrajwalTikhe10@cluster1.nlo7ijb.mongodb.net/?retryWrites=true&w=majority';

// Set Promise
mongoose.Promise = Promise;

// Connect to MongoDB using Mongoose
mongoose.connect(MONGO_URL);

// Check Log errors
mongoose.connection.on('error', (error: Error) => console.log(error));

// Routes
app.use('/', router());

# REST API Users

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description

REST API Users is a RESTful API for handling user-related HTTP requests and responses. It allows developers to build scalable web applications with ease, by providing a streamlined way to manage user data.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Endpoints](#endpoints)
- [Contributing](#contributing)
- [License](#license)

## Installation

To use REST API Users, you'll need to have Node.js and TypeScript installed on your machine. Once you've installed Node.js and TypeScript, follow these steps:

1. Clone the repository to your local machine.
2. Navigate to the root directory of the project.
3. Run `npm install` to install the required dependencies.
4. Create a `.env` file in the root directory, and add your MongoDB database URI to the `MONGO_URI` variable.
5. Run `npm start` to start the server.

## Usage

To use REST API Users, you can send HTTP requests to the server using your preferred client (e.g. [Postman](https://www.postman.com/), [Thurderclient](https://www.thunderclient.com/), or a web browser).

## Endpoints

REST API Users provides the following endpoints:

| Method | Endpoint       | Description              |
| ------ | -------------- | ------------------------ |
| POST   | /auth/register | Create a new user.       |
| POST   | /auth/login    | Login a user.            |
| GET    | /users         | Get a list of all users. |
| PATCH  | /users/:id     | Update a user by ID.     |
| DELETE | /users/:id     | Delete a user by ID.     |

## Contributing

Contributions are welcome! If you'd like to contribute to REST API Users, please follow these steps:

1. Fork the repository.
2. Create a new branch for your changes.
3. Make your changes and commit them.
4. Push your changes to your fork.
5. Submit a pull request.

## License

REST API Users is licensed under the [MIT License](https://opensource.org/licenses/MIT).

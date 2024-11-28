# User Management System

## Overview

The **User Management System** is a Node.js-based application designed to manage user data efficiently. It offers features such as user creation, retrieval, updating, and deletion, while ensuring robust validation, scalable architecture, and high maintainability. The system is built using TypeScript for type safety and leverages Express.js for its lightweight and flexible framework.

---

## Features

- **User CRUD Operations**:
  - Create users with validation for fields like name, email, and age.
  - Retrieve single or multiple users with support for pagination and filtering.
  - Update user details dynamically with partial updates.
  - Delete users with proper feedback mechanisms.
- **Advanced Features**:
  - Calculate the average age of users by city with filtering options.
- **Centralized Error Handling**: Ensures consistent error responses across the application.
- **Validation**: Enforces strict data integrity using `class-validator`.

---

## Technology Stack

- **Backend Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB (via Mongoose)
- **Validation**: `class-validator`
- **Testing**: Jest and Supertest

---

## Installation and Setup

### Prerequisites

- Node.js (v16 or later)
- npm or yarn
- MongoDB

### Steps

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd user-management-system
   ```
2. Install dependencies
   ```bash
       yarn install
   ```
3. Configure environment variables: Create a .env file in the root directory. Reference `env.example` for the content of the env file

4. Start the application

```bash
  npm run dev // for dev environment
  npm run start // for prod enviroment
```

5. Run tests

```bash
  npm run test
```

## API Endpoints

### Base URL
`localhost:4000/api/v1`

### User Endpoint

1.  Create a User
    POST `/users`
    Request Body:
    ```json
    {
      "name": "John Doe",
      "email": "john.doe@example.com",
      "age": 25
    }
    ```
    Response:
    ```json
    {
      "success": true,
      "message": "User created successfully",
      "content": {
        "id": "6almr09823uj4n9s8euhn298ewh42",
        "name": "John Doe",
        "email": "john.doe@example.com",
        "age": 25
      }
    }
    ```
2.  Get multiple users
    GET `/users?page=1&pageSize=10`
    Response:
    ```json
    {
      "success": true,
      "message": "Users fetched successfully",
      "content": [
        {
          "id": "12345",
          "name": "John Doe",
          "email": "john.doe@example.com",
          "age": 25
        },
        ...
      ]
    }
    ```
3.  Get user by ID
    GET `/users?page=1&pageSize=10`
    Response:
    ```json
    {
      "success": true,
      "message": "User fetched successfully",
      "content": {
        "id": "12345",
        "name": "John Doe",
        "email": "john.doe@example.com",
        "age": 25
      }
    }
    ```
4.  Update User
    PUT `/users/:id`
    Request Body:
    ```json
    {
      "name": "John Ogungbure"
    }
    ```
    Response:
    ```json
    {
      "success": true,
      "message": "User created successfully",
      "content": {
        "id": "6almr09823uj4n9s8euhn298ewh42",
        "name": "John Ogungbure",
        "email": "john.doe@example.com",
        "age": 25
      }
    }
    ```
5.  Delete User
    DELETE `/users/:id`
    Response:
    ```json
    {
      "success": true,
      "message": "User deleted successfully"
    }
    ```

6.  Get Average Age by City
    GET `/users/average-age?minAge=20`
    Response:
    ```json
    {
      "success": true,
      "message": "User created successfully",
      "content": {
        "id": "6almr09823uj4n9s8euhn298ewh42",
        "name": "John Ogungbure",
        "email": "john.doe@example.com",
        "age": 25
      }
    }
    ```

## Decisions, Assumptions, and Optimizations
### Decisions
  - Architecture:
      Modularized the system, with each system containing component related to it
      Used a service-repository pattern to decouple business logic from data access.
      Components of the API are classed based e.g UserController, UserService, UserRepository
  - Validation:
      Leveraged class-validator for robust data validation at the DTO level.
  - Centralized Responses:
      Utilized a custom SuccessResponse class to ensure consistency in API responses.
### Assumptions
  - All user-provided data follows the defined schema.
  - Email addresses are unique and enforced at the database level.
  - The application currently does not implement authentication or permissions.
### Optimizations
  - For improved class based architecture, the system can leverage Inversion of control (IOC).
  - Pagination and filtering in getAllUsers to handle large datasets efficiently.
  - Code splitting and modular service structure for better maintainability.
  - Centralized error handling for consistent API behavior.

## License
This project is licensed under the MIT License. See the LICENSE file for details.
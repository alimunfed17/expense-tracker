## Backend Docs

---

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup & Installation](#setup--installation)
- [Environment Variables](#environment-variables)
- [Running the Backend](#running-the-backend)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Error Handling](#error-handling)

---

# Features
- Add, Update Expenses
- Fetch Expenses with category, date
- Authentication with JWT (Login, Register)

---

## Tech Stack
- **NODE**: Framework for building APIs
- **Express**: API for creating expenses and users
- **MONGODB**: Storing Expenses, Users as collections

---

## Project Structure
```bash
backend/
├─ src/
│  ├─ config/
|  |    └── db
│  ├─ controllers/
|  |    ├─ authController
|  |    └── expenseController
│  ├─ middleware/
|  |    └── authMiddleware
│  ├─ models/
|  |    ├─ User
|  |    └── Expense
│  ├─ routes/ 
|  |    ├─ authRoutes
|  |    └── expenseRoutes            
│  └─ server.ts
├─ .env.example
├─ .gitignore
├─ package-lock.json
├─ package.json
├─ README.md
└─ tsconfig.json
```

---

## Setup & Installation

#### 1. Create a Virtual Environment:
```bash
cd backend
```


#### 2. Install dependencies:
```bash
npm install
```

#### 3. Start Backend:
```bash
tsc
node src/server.js
```

---

## Environment Variables

Create a `.env` file in the backend root with the following:
```bash
PORT=5000
MONGO_URI=
JWT_SECRET=
```
- `PORT` — PORT to start sever.
- `JWT_SECRET` — JWT Secret token.
- `MONGO_URI` — MongoDB connection string.

---

## Running the Backend

Start the server in development mode:
```bash
tsc
node src/server.js
```

Start the production server:
```bash
npm build
```

Server will run at:
```bash
http://localhost:5000
```

---

## API Endpoints
| Method | Endpoint | Description | Request Body / Params |
|--------|----------|-------------|----------------------|
| Method     | Endpoint             | Description                                                 | Request Body / Params                                                                         |
| ---------- | -------------------- | ----------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| **POST**   | `/api/auth/register` | Register a new user                                         | `{ "name": "John", "email": "john@example.com", "password": "123456" }`                       |
| **POST**   | `/api/auth/login`    | Authenticate a user and return JWT                          | `{ "email": "john@example.com", "password": "123456" }`                                       |
| **GET**    | `/api/expenses`      | Get all expenses for logged-in user (with optional filters) | Query params: `category`, `title`, `startDate`, `endDate`, `minAmount`, `maxAmount`, `search` |
| **POST**   | `/api/expenses`      | Add a new expense                                           | `{ "title": "Lunch", "amount": 15, "category": "Food", "date": "2025-10-30" }`                |
| **PUT**    | `/api/expenses/:id`  | Update an expense                                           | Partial or full expense fields                                                                |
| **DELETE** | `/api/expenses/:id`  | Delete an expense                                           | Path param: `id`                                                                              |


### Example Requests
-  1. Register a User
```bash
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "123456"
}
```

- Response:
```bash
{
  "_id": "6721a9a8c1234b...",
  "name": "John Doe",
  "email": "john@example.com",
  "token": "eyJhbGciOiJIUzI1..."
}
```

- 2. Login a User
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "123456"
}
```

- Response:
```bash
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5..."
}
```

- 3. Add a New Expense
```bash
POST /api/expenses
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json

{
  "title": "Lunch with friends",
  "amount": 25.50,
  "category": "Food",
  "date": "2025-10-29"
}
```

Response:
```bash
{
  "_id": "6721aa32f1a7e8...",
  "title": "Lunch with friends",
  "amount": 25.5,
  "category": "Food",
  "date": "2025-10-29T00:00:00.000Z",
  "userId": "6721a9a8c1234b..."
}
```

- 4. Fetch Expenses (with optional filters)
```bash
GET /api/expenses?category=food&minAmount=10&maxAmount=100
Authorization: Bearer <JWT_TOKEN>
```

- Response:
```bash
[
  {
    "_id": "6721aa32f1a7e8...",
    "title": "Lunch",
    "amount": 25.5,
    "category": "Food",
    "date": "2025-10-29T00:00:00.000Z"
  }
]
```

- You can also use:
```bash
?search=rent → matches title or category

?startDate=2025-10-01&endDate=2025-10-30 → filters by date range
```

- 5. Update an Expense
```bash
PUT /api/expenses/6721aa32f1a7e8...
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json

{
  "amount": 30.00,
  "category": "Dining"
}
```

- Response:
```bash
{
  "_id": "6721aa32f1a7e8...",
  "title": "Lunch with friends",
  "amount": 30,
  "category": "Dining",
  "date": "2025-10-29T00:00:00.000Z"
}
```
- 6. Delete an Expense
```bash
DELETE /api/expenses/6721aa32f1a7e8...
Authorization: Bearer <JWT_TOKEN>
```


- Response:
```bash
{
  "message": "Expense deleted successfully"
}
```
---

## Database Schema
### Expense (Mongoose)
```bash
{
  Expense: {
    id: number,
    title: String,
    category: String,
    amount: Number,
    Date: Date,
  },
}
```
### User (Mongoose)
```bash
{
  Expense: {
    id: number,
    name: String,
    email: String,
    password: String,
  },
}
```

---

## Error Handling
- No Response → 400 Bad Request
- Expense Add, Edit, Get errors → 500 Internal Server Error
- MongoDB errors → 500 Internal Server Error
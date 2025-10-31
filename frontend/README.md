# Frontend Docs

---

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)  
- [Project Structure](#project-structure)
- [Setup & Installation](#setup--installation)
- [Running the Application](#running-the-application)
- [Usage](#usage)

---

## Features
- Manage Expenses with different categories
- Show charts expenses with different categories, date
- Responsive design suitable for desktop and mobile devices.

---

## Tech Stack

- **React**: Frontend for building UI.
- **Tailwind CSS**: Styling and responsive design.
- **TypeScript**: Type safety and better code quality.

---

## Project Structure

```bash
frontend/
├── src/
│ ├── api/
│ │     ├── authApi
│ │     └── expenseApi
│ ├── components/
│ ├── context/
│ │     └── AuthContext
│ ├── pages/ 
│ │     ├── Dashboard
│ │     ├── Home
│ │     ├── Login
│ │     └── Register
│ ├── types/
│ ├── utils/
│ ├── App.css
│ ├── App.tsx
│ ├── index.css
│ └── main.tsx
├── .env.example
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json 
├── package.json
├── README.md 
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

---

## Setup & Installation

#### 1. Install dependencies:
```bash
cd frontend

npm install
# or 
yarn install
```

#### 2. Set up environment variables:

Create a `.env` file in the frontend root directory:
```bash
VITE_BASE_URL=http://localhost:5001/api
```
This points to your backend API.

---

## Running the Application
Start the development server:
```bash
npm run dev
# or
yarn dev
```

The frontend should now be running at:
```bash
    http://localhost:5173
```


Ensure your backend server is running simultaneously to allow API communication.

--- 

## Usage

**1. Home Page**: Quick links to signup and login 

**2. Dashboard Page**:

- Links to add expense, show summary and charts with different categories
- A table to list all the expenses and also edit and delete.

**3. User Page**:

- Shows user data and settings to change password.
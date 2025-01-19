# User Management System - Frontend

This is the frontend implementation of the User Management System built using **Next.js**, **TypeScript**, **Tailwind CSS**, **Redux Toolkit**, and **ShadCN components**. It communicates with the backend API to perform CRUD operations and handle authentication and authorization.

---

## Features

- **User Management**:
  - Create, update, and delete users.
  - View users with pagination.
- **Authentication**:
  - Secure login functionality for the admin.
  - Token-based session management.
- **Responsive UI**:
  - Built with **ShadCN components** for a modern and accessible design.
- **State Management**:
  - **Redux Toolkit** for efficient state handling and seamless data flow.

---

## Technologies Used

- **Next.js**: Framework for building React applications with server-side rendering.
- **TypeScript**: For static type checking.
- **Tailwind CSS**: For styling and layout.
- **Redux Toolkit**: For managing application state.
- **Axios**: For API calls.
- **ShadCN Components**: For reusable UI components.

---

## Installation and Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/muhammadsahad1/ums-frontend.git

2. Navigate to the project directory:
    ```bash
    cd ums-frontend

3. Install dependencies:
    ```bash
    npm install

4. Create a .env.local file in the root directory and add the following:
    ```bash
    NEXT_PUBLIC_API_BASE_URL=<Backend API URL>

5. Start the development server:
    ```bash
    npm run dev

ADMIN Credentials
    Email: admin@gmail.com
    Password: Sahad321@

Project Structure
ums-frontend/
├── public/              # Static assets (images, fonts, etc.)
├── src/                 # Main source code
│   ├── api/             # API services (e.g., Axios setup, API calls)
│   ├── app/             # Main application configuration (e.g., routing, global state setup)
│   ├── components/      # Reusable UI components (e.g., buttons, modals, forms)
│   ├── hoc/             # Higher-order components (e.g., authentication wrappers)
│   ├── hooks/           # Custom hooks (e.g., useAuth, usePagination)
│   ├── lib/             # Utility libraries (e.g., helper functions)
│   ├── store/           # Redux store, slices, and actions
│   ├── types/           # TypeScript types/interfaces (e.g., user, API responses)
│   ├── utils/           # Helper functions and utilities (e.g., formatters, validation)
│   └── styles/          # Global and component-specific styles (Tailwind CSS config, etc.)
├── .env.local           # Environment variables (e.g., API base URL)
├── .gitignore           # Git ignore file
├── next.config.js       # Next.js configuration
├── package.json         # NPM dependencies and scripts
├── tailwind.config.js   # Tailwind CSS configuration
└── tsconfig.json        # TypeScript configuration


API Endpoints

    Authentication
    POST /api/auth/admin/login - Login admin and generate a token.

    User Management
    GET /api/admin/users - Get all users with pagination.
    POST /api/admin/user - Create a new user.
    PUT /api/admin/users/:id - Update an existing user.
    DELETE /api/admin/users/:id - Delete a user.

How to Use
Start the backend server:
npm run dev

Use the provided admin credentials to authenticate.
Access user management endpoints via the frontend.

Scripts
npm run dev - Run the server in development mode.
npm run start - Start the server in production mode.
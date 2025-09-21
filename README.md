# Agent Management MERN Project

This project is a full-stack MERN (MongoDB, Express, React, Node.js) application for agent management, admin authentication, and CSV/XLSX file upload/distribution. It features a modern, dark-themed React frontend and a secure, RESTful backend.

---

## Prerequisites
- Node.js (v18+ recommended)
- npm (comes with Node.js)
- MongoDB (local or cloud, e.g., MongoDB Atlas)

---

## Backend Setup

1. **Navigate to the backend folder:**
   ```sh
   cd backend
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Create a `.env` file:**
   Copy the example below and fill in your values:
   ```env
   PORT=3001
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. **Start the backend server:**
   ```sh
   npm run dev
   ```
   The backend will run on `http://localhost:3001` by default.

---

## Frontend Setup

1. **Navigate to the frontend folder:**
   ```sh
   cd frontend
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **(Optional) Configure API base URL:**
   By default, the frontend expects the backend at `http://localhost:3001/api`. To change this, create a `.env` file in the `frontend` folder:
   ```env
   VITE_API_BASE_URL=http://localhost:3001/api
   ```

4. **Start the frontend dev server:**
   ```sh
   npm run dev
   ```
   The frontend will run on `http://localhost:5173` by default.

---

## Usage
- Register a new admin user.
- Login as admin.
- Manage agents, upload CSV/XLSX files, and distribute lists.

---

## Project Structure
- `backend/` — Node.js/Express API, MongoDB models, authentication, file upload, agent management.
- `frontend/` — React app (Vite), TailwindCSS, React Router, Axios, context-based authentication.

---

## Troubleshooting
- Ensure MongoDB is running and accessible.
- Check `.env` files for correct values.
- If ports are in use, update `PORT` in backend or use `--port` flag for Vite frontend.

---

## License
MIT

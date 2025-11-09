# 📝 MERN Note App  
A full-featured, real-time collaborative note-taking application built with **MongoDB, Express, React, Node.js, Socket.IO**, and **JWT authentication with HttpOnly cookies**.

Live Demo: https://note-app-gamma-eight.vercel.app  

## 🚀 Features

✅ User Authentication (Register, Login, Logout)  
✅ Secure HttpOnly Cookie-based Sessions  
✅ Create / Edit / Delete Notes  
✅ Real-time Collaboration (Socket.IO)  
✅ Search Notes (full-text search on title + content)  
✅ Categories & Tags  
✅ Notes Sharing (reader / editor roles)  
✅ Archive / Trash / Restore  
✅ Auto-saving notes every 1.5s  
✅ Clean UI built with **Shadcn + Lucide Icons + TailwindCSS**  
✅ Fully mobile responsive  
✅ Production-ready backend (Render)  
✅ Production-ready frontend (Vercel)  


## 🛠️ Tech Stack

### **Frontend**
- React (Vite)
- React Router
- Zustand (Auth state)
- TanStack React Query
- Shadcn UI
- TailwindCSS
- Axios
- Socket.IO Client

### **Backend**
- Node.js
- Express
- MongoDB & Mongoose
- JWT Authentication
- Socket.IO
- CORS with credentials
- HttpOnly Secure Cookies

## 🔐 Environment Variables

### ✅ Backend (`server/.env`)

PORT=4000

MONGO_URI=mongodb://localhost:27017/note-app

JWT_SECRET=your-secret

COOKIE_NAME=token

CLIENT_ORIGIN=http://localhost:5173

### ✅ Frontend (`client/.env`)
VITE_API_URL=http://localhost:4000/api

VITE_SOCKET_URL=http://localhost:4000

## ▶️ Running the App (Development)

### ✅ 1. Start Backend (Node.js)

cd server
npm install
npm run dev

This runs using **nodemon** on:

http://localhost:4000

### ✅ 2. Start Frontend (React + Vite)

cd client
npm install
npm run dev

Runs on:

http://localhost:5173

## 🔥 API Overview

### Auth

POST /api/auth/register

POST /api/auth/login

POST /api/auth/logout

GET /api/auth/me

### Notes

GET /api/notes

POST /api/notes

GET /api/notes/:id

PUT /api/notes/:id

PUT /api/notes/:id/archive

PUT /api/notes/:id/unarchive

PUT /api/notes/:id/trash

PUT /api/notes/:id/restore

DELETE /api/notes/:id

### Sharing

POST /api/shares

GET /api/shares/:noteId

DELETE /api/shares/:shareId

## 📸 Screenshots (Add Your Images)

##Sign In

<img width="633" height="418" alt="image" src="https://github.com/user-attachments/assets/818e742f-7273-41b9-8672-6e0a371a5979" />

##Notes

<img width="1348" height="629" alt="image" src="https://github.com/user-attachments/assets/6719fd1d-2082-4b66-80f1-9d7b6ccadf67" />



## ✅ Author

**Sanjay Aggi**  
Full-Stack MERN Developer  
Hyderabad, India  

## ⭐ Contribute

PRs and issues are welcome! If you find bugs or want new features, open an issue.

## 🐧 License

MIT License  

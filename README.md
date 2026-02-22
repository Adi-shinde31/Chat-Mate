# 💬 Real-Time Chat App (MERN Stack)

A full-stack **Real-Time Chat Application** built with the **MERN stack (MongoDB, Express.js, React, Node.js)**.  
It features **JWT authentication, real-time messaging with Socket.io, image sharing, profile management**, and a clean, responsive UI.

---

## 🚀 Features

### 🔐 Authentication
- User Registration & Login
- JWT-based authentication (HTTP-only cookies)
- Protected routes
- Logout functionality

### 💬 Real-Time Messaging
- One-to-one chat system
- Instant message delivery using Socket.io
- Auto-scroll to latest message
- Online user tracking

### 🖼 Image Sharing
- Send image attachments
- Image type validation
- File size limit enforcement (75KB)
- Base64 image preview before sending

### 👤 Profile Management
- Update profile picture
- View account details
- Member since date
- Account status badge

### 🎨 UI & UX
- Fully responsive layout
- Mobile-friendly chat interface
- No double scroll issues
- Toast notifications using react-hot-toast
- Clean design with TailwindCSS + DaisyUI

---

## 🧰 Tech Stack

### Frontend
- React
- Zustand (State Management)
- React Router
- TailwindCSS
- DaisyUI
- react-hot-toast
- Socket.io-client
- Lucide React (Icons)

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- Socket.io
- Cloudinary (optional for image hosting)

---

## 🏗️ Project Structure

```
client/
├── components/
│   ├── ChatContainer.jsx
│   ├── MessageInput.jsx
│   ├── ChatHeader.jsx
│   ├── Sidebar.jsx
│   └── NoChatSelected.jsx
│
├── pages/
│   ├── LoginPage.jsx
│   ├── SignupPage.jsx
│   ├── ProfileUpdatePage.jsx
│   └── HomePage.jsx
│
├── store/
│   ├── useAuthStore.js
│   └── useChatStore.js
│
└── App.jsx

server/
├── src/
│   ├── controllers/
│   │   ├── authController.js
│   │   └── messageController.js
│   │
│   ├── lib/
│   │   ├── cloudinary.js
│   │   ├── socket.js
│   │   └── utils.js
|   |
│   ├── models/
│   │   ├── userModel.js
│   │   └── messageModel.js
│   │
│   ├── routes/
│   │   ├── autRoutes.js
│   │   └── messageRoutes.js
│   │
│   ├── middlewares/
│   │   └── authMiddleware.js
│   │
│   ├── config/
│   │   └── db.js
│   │
│   └── server.js
│
├── package.json
└── .env
```

---

## ⚡ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/Adi-shinde31/Chat-Mate.git
cd Chat-Mate
```

---

### 2. Backend Setup

```bash
cd server
npm install
```

Create a `.env` file inside `/server`:

```env
PORT=5000
MONGO_URI=<your_mongodb_uri>
JWT_SECRET=<your_secret_key>

CLOUDINARY_CLOUD_NAME=<your_cloud_name>
CLOUDINARY_API_KEY=<your_api_key>
CLOUDINARY_API_SECRET=<your_api_secret>

NODE_ENV=development
```

Start backend server:

```bash
npm run server
```

---

### 3. Frontend Setup

```bash
cd client
npm install
npm run dev
```

---

## 🔐 Environment Variables

| Variable | Description |
|----------|------------|
| `PORT` | Backend server port |
| `MONGO_URI` | MongoDB Atlas connection string |
| `JWT_SECRET` | Secret key for JWT tokens |
| `CLOUDINARY_*` | Image storage credentials (optional) |
| `NODE_ENV` | development / production |

---

## 🔧 Usage

### Register / Login

- Navigate to `/signup` or `/login`
- Enter credentials
- JWT token stored securely in HTTP-only cookies

### Start Chatting

- Select a user from sidebar
- Messages load automatically
- Send text or image
- Messages appear instantly in real-time

### Update Profile

- Go to profile page
- Click camera icon
- Upload image (max 75KB)

---

## 📦 API Endpoints

### Auth Routes

| Endpoint | Method | Protected | Description |
|----------|--------|-----------|-------------|
| `/api/auth/signup` | POST | ❌ | Register user |
| `/api/auth/login` | POST | ❌ | Login user |
| `/api/auth/logout` | POST | ✅ | Logout user |
| `/api/auth/check` | GET | ✅ | Verify authentication |

### Message Routes

| Endpoint | Method | Protected | Description |
|----------|--------|-----------|-------------|
| `/api/messages/:id` | GET | ✅ | Get messages with user |
| `/api/messages/send/:id` | POST | ✅ | Send message |

---

## 📝 Notes

- Image upload limit: **75KB**
- JWT stored in HTTP-only cookies
- Passwords hashed using **bcrypt**
- Zustand used for global state management
- Toast notifications handled with **react-hot-toast**

---

## 👨‍💻 Author
Aditya Shinde  
[GitHub](https://github.com/Adi-shinde31) | [LinkedIn](https://www.linkedin.com/in/adi-shinde31)

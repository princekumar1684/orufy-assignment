# 🚀 Productr - MERN Product Management Dashboard

A full-stack MERN application for managing products with OTP-based authentication, image uploads, publishing controls, and a responsive admin dashboard.


## Live Demo

🔗 Live link : https://mern-project-frontend-blond.vercel.app


## 📖 Overview

Productr allows users to securely log in using Email or Mobile OTP verification and manage products through an intuitive dashboard.

Users can:

- Create products
- Upload multiple product images
- Edit product details
- Publish/Unpublish products
- Delete products
- View published and unpublished products separately

---

## ✨ Features

### 🔐 Authentication

- OTP-based Login (Email / Mobile)
- JWT Authentication
- Secure HTTP-only Cookie Storage
- Protected Dashboard Routes
- Logout Functionality

### 📦 Product Management

- Create Products
- Edit Products
- Delete Products
- Publish / Unpublish Products
- Product Status Management
- Multiple Image Upload Support
- Product Image Preview Before Upload
- Exchange Eligibility Option
- Switch Between Product Images Using Selectors

### 📊 Dashboard

- Published Products View
- Unpublished Products View
- Responsive UI
- Mobile-Friendly Sidebar Navigation

---

## 🛠️ Tech Stack

### Frontend

- React
- Vite
- React Router DOM
- Axios
- Tailwind CSS
- Lucide React

### Backend

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT
- Cookie Parser
- Multer

### Image Storage

- ImageKit

### Deployment

- Vercel (Frontend)
- Render (Backend)
- MongoDB Atlas (Database)

---

## 📁 Project Structure

text Productr │ ├── frontend │   ├── public │   ├── src │   │   ├── assets │   │   ├── components │   │   ├── layout │   │   ├── pages │   │   ├── routes │   │   └── main.jsx │   │ │   ├── .env │   ├── package.json │   └── vite.config.js │ ├── backend │   ├── config │   ├── controllers │   ├── middleware │   ├── models │   ├── routes │   ├── .env │   ├── app.js │   ├── server.js │   └── package.json │ └── README.md 

---

## ⚙️ Environment Variables

### Frontend (.env)

env VITE_BACKEND_URL=https://your-backend-url.com 

### Backend (.env)

PORT=3000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

FRONTEND_URL=https://your-frontend-url.vercel.app

IMAGEKIT_PUBLIC_KEY=your_public_key

IMAGEKIT_PRIVATE_KEY=your_private_key

IMAGEKIT_URL_ENDPOINT=your_url_endpoint
---

## 🚀 Installation

### Clone Repository

bash git clone <repository-url>  cd Productr 

---

### Frontend Setup

bash cd frontend  npm install  npm run dev 

Frontend runs on:

text http://localhost:5173 

---

### Backend Setup

bash cd backend  npm install  npm start 

Backend runs on:

text http://localhost:3000 

---

## 🔗 API Endpoints

### Authentication

http POST /api/auth/send-otp  POST /api/auth/verify-otp  GET /api/auth/me  POST /api/auth/logout 

---

### Products

http GET /api/products  POST /api/products/create  POST /api/products/update/:id  POST /api/products/delete/:id 

---

### Upload

http POST /api/upload/image 

---

## 📸 Product Workflow

1. Login using Email or Mobile OTP
2. Access Dashboard
3. Create a Product
4. Upload Multiple Images
5. Publish or Unpublish Products
6. Edit Product Information
7. Delete Products When Required

---

## 🌐 Deployment

### Backend Deployment

- Deploy on Render
- Add Environment Variables
- Connect MongoDB Atlas

### Frontend Deployment

- Deploy on Vercel
- Add VITE_BACKEND_URL
- Configure vercel.json for React Router support

Example:

json {   "rewrites": [     {       "source": "/(.*)",       "destination": "/index.html"     }   ] } 

---

## 👨‍💻 Author

Prince Kumar

Built with React, Node.js, Express, MongoDB Atlas, Tailwind CSS, and ImageKit
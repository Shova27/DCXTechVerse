⁶# DCXTechVerse --Universe Of Tech
# MERN Stack eCommerce Project

## Overview
This is a full-fledged eCommerce website built using the **MERN (MongoDB, Express, React, Node.js) stack**. The platform supports **user authentication, product listing, cart management**.

## Features
✅ **User Authentication** (JWT-based login & registration)  
✅ **Product Management** (CRUD operations for products)  
✅ **Shopping Cart** (Add, update, and remove items)  
✅ **Category-based Filtering**  
✅ **Carousel** (Display latest products)  
✅ **Responsive UI using Bootstrap**  

## Technologies Used
- **Frontend:** React.js (with React Router & Bootstrap)
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose ODM)
- **Authentication:** JWT (JSON Web Tokens)
- **Image Uploads:** Multer
- **State Management:** React Context API
- **API Calls:** Axios

## Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/Shova27/DCXTechVerse.git
cd DCXTechVerse
```

### 2. Install Dependencies
#### **Backend**
```bash
cd Backend
npm install
```
#### **Frontend**
```bash
cd Client
npm install
```

### 3. Setup Environment Variables
Create a `.env` file in the backend directory and configure the following:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### 4. Run the Application
#### **Start Backend Server**
```bash
cd backend
node index.js
```
#### **Start Frontend Server**
```bash
cd frontend
npm start
```

## Future Enhancements
🚀 **Payment Integration (Stripe/PayPal)**  
🚀 **Order History & Invoice Generation**  
🚀 **Admin Dashboard for Product Management**  

⚡ **Happy Coding!** ⚡


## Amazon Clone - Backend API

Node.js + Express backend with MongoDB for a full-featured e-commerce platform.

# Features

 * Authentication

- Email/Password registration and login
- Google OAuth integration (Firebase)
- JWT token-based sessions
- Password hashing with bcrypt


 * Product Management

- Get all products
- Get single product by ID
- Filter products by category
- Product ratings and reviews


 * Database

- MongoDB with Mongoose ODM
- User and Product models
- Password hashing

 # Tech Stack

* Node.js & Express.js
* MongoDB (via MongoDB Atlas)
* Mongoose ODM
* JWT for authentication
* bcryptjs for password security
* Firebase (Google OAuth)


# Prerequisites

* Node.js (v14+)
* MongoDB Atlas account
* Firebase project (for Google sign-in)

## Installation

1. Clone and navigate to server folder

- cd server
- npm install

2. Create .env file in server root:

MONGODB_URI=your_mongodb_atlas_connection_string
PORT=5000
JWT_SECRET=your_secret_key_here

3. Seed the database with sample products:

- node seedProducts.js 
This adds 20+ products across categories.

4. Start the server:

- npm run dev    # Development (with nodemon)
- npm start      # Production

Server runs at http://localhost:5000

## API Endpoints

*  Authentication

1. POST /api/auth/register - Register with email/password
2. POST /api/auth/login - Login with email/password
3. POST /api/auth/google - Google OAuth login
4. GET /api/auth/me - Get current user (requires token)

* Products

1. GET /api/products - Get all products
2. GET /api/products/:id - Get single product
3. GET /api/products/category/:category - Get products by category

## Database Models

* User

{
  name: String,
  email: String (unique),
  password: String (hashed),
  googleId: String (for OAuth),
  createdAt: Date
}

* Product

{
  name: String,
  description: String,
  price: Number,
  originalPrice: Number,
  category: String,
  image: String (URL),
  rating: Number,
  reviewCount: Number,
  stock: Number,
  inStock: Boolean,
  createdAt: Date
}

### Project Structure

server/
├── models/
│   ├── User.js          # User schema with password hashing
│   └── Product.js       # Product schema
├── routes/
│   ├── auth.js          # Auth routes (login, register, Google)
│   └── products.js      # Product routes
├── .env                 # Environment variables
├── server.js            # Main entry point
├── seedProducts.js      # Database  script
└── package.json


## Available Scripts

- npm run dev      # Start with nodemon (auto-restart)
- npm start        # Start in production mode
- node seedProducts.js  # Seed database with sample data

## Deployment

* Environment Variables Needed:

- MONGODB_URI - Your MongoDB Atlas connection string
- PORT - Server port (default: 5000)
- JWT_SECRET - Secret key for JWT tokens


* Recommended Platforms:

- Render - Free tier available
- Railway - Easy deployment

## Security Features

- JWT tokens with 7-day expiration
- Password hashing with bcrypt (10 salt rounds)
- Secure password comparison
- Protected routes with token verification
- CORS enabled for frontend requests

## Testing

Visit http://localhost:5000/api/products in browser to test API.
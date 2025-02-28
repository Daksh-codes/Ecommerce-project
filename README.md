# E-commerce Project

## Overview
This is a full-stack e-commerce web application that allows users to browse products, add them to their cart, and proceed with checkout. The project includes authentication, product management, and order processing features.

## Features
- User authentication (login/register)
- Product browsing with categories
- Shopping cart functionality
- Order placement and checkout process
- Admin panel for product and order management
- Secure payment integration (if applicable)

## Technologies Used
### Frontend:
- React.js
- Zusstand (State Management)
- Tailwind CSS (for styling)

### Backend:
- Node.js
- Express.js
- MongoDB (Database)
- JWT Authentication

## Installation
### Prerequisites:
- Node.js & npm installed
- MongoDB installed and running locally or a MongoDB Atlas instance

### Steps:
1. Clone the repository:
   ```bash
   git clone https://github.com/Daksh-codes/Ecommerce-project.git
   cd Ecommerce-project
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   - Create a `.env` file in the root directory and add necessary credentials (e.g., MongoDB URI, JWT secret, etc.)
   ```
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open the application in your browser at `http://localhost:3000`.

## Usage
- Sign up or log in to your account.
- Browse available products and add them to the cart.
- Proceed to checkout and place your order.
- Admins can manage products and orders from the admin dashboard.

## Contributing
Feel free to fork this repository and submit pull requests with improvements.



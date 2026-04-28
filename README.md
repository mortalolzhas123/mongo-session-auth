# 🔐 Mongo Session Auth 

A user authentication system built with Node.js, Express, and MongoDB. This project implements secure registration, session-based login, and protected private routes. Developed as a Final Project for IFP.

## 🛠 Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose)
- **Authentication:** express-session
- **Security:** Password hashing using `bcryptjs`
- **Frontend (Test UI):** HTML, Vanilla JavaScript (Fetch API)

## ✨ Key Features

- Registration for new users (with email validation and password hashing).
- Secure login and session creation.
- Protected route access (the `/profile` endpoint is restricted to authenticated users only).
- Proper logout functionality that destroys the session and clears cookies.

## 🚀 How to Run Locally

1. Clone the repository (or navigate to your project folder):
   ```bash
   git clone <your-github-link>
   cd mongo-session-auth

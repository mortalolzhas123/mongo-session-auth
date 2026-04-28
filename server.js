require("dotenv").config();
const express = require("express");
const session = require("express-session");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");

const app = express();

connectDB();

app.use(express.json());
app.use(express.static("public"));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 60
    }
}));

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5005;
app.listen(PORT, () => console.log("Server running on port", PORT));

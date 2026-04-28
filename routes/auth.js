const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const requireAuth = require("../middleware/requireauth");

const router = express.Router();

router.post("/register", async (req, res) => {
    try {
        const name = (req.body.name || "").trim();
        const email = (req.body.email || "").trim().toLowerCase();
        const password = req.body.password || "";

        if (!name || !email || !password) {
            return res.status(400).json({ message: "name, email, password are required" });
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "password must be at least 6 characters" });
        }

        const exists = await User.findOne({ email });
        if (exists) {
            return res.status(409).json({ message: "email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        return res.status(201).json({
            message: "registered",
            user: { id: user._id, name: user.name, email: user.email, createdAt: user.createdAt }
        });
    } catch (err) {
        return res.status(500).json({ message: "server error" });
    }
});

router.post("/login", async (req, res) => {
    try {
        const email = (req.body.email || "").trim().toLowerCase();
        const password = req.body.password || "";

        if (!email || !password) {
            return res.status(400).json({ message: "email and password are required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const ok = await bcrypt.compare(password, user.password);
        if (!ok) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        req.session.userId = user._id.toString();

        return res.status(200).json({
            message: "logged in",
            user: { id: user._id, name: user.name, email: user.email }
        });
    } catch (err) {
        return res.status(500).json({ message: "server error" });
    }
});

router.post("/logout", (req, res) => {
    if (!req.session) return res.status(200).json({ message: "logged out" });

    req.session.destroy((err) => {
        if (err) return res.status(500).json({ message: "could not logout" });
        res.clearCookie("connect.sid");
        return res.status(200).json({ message: "logged out" });
    });
});

router.get("/profile", requireAuth, async (req, res) => {
    try {
        const user = await User.findById(req.session.userId).select("-password");
        if (!user) return res.status(404).json({ message: "User not found" });

        return res.status(200).json({ user });
    } catch (err) {
        return res.status(500).json({ message: "server error" });
    }
});

module.exports = router;

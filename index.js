require("dotenv").config(); // MUST be first

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const productRoutes = require("./routes/productRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

// CORS
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://startup-products-post.netlify.app"
  ],
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"]
}));

app.use(express.json());
app.use("/uploads", express.static("uploads"));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("Connection Error:", err));

// Routes
app.use("/", productRoutes);
app.use("/", adminRoutes);

// Root route (optional)
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// Start server
app.listen(3001, "0.0.0.0", () => {
  console.log("Server running on port 3001");
});
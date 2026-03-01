const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const productRoutes = require("./routes/productRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"]
}));

app.use(express.json());
app.use("/uploads", express.static("uploads"));

mongoose.connect("mongodb+srv://naveennani0066_db_user:Nani12345@products.seozk3q.mongodb.net/productsDB?retryWrites=true&w=majority")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("Connection Error:", err));

app.use("/", productRoutes);
app.use("/", adminRoutes);

app.listen(3001, "0.0.0.0", () => {
  console.log("Server running on port 3001");
});
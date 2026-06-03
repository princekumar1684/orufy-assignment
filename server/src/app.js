const express = require("express");
const cookiesParser = require("cookie-parser");
const authMiddleware = require("./middleware/auth.middleware");
const authRoutes = require("./routes/auth.routes");
const productRoutes = require("./routes/product.route");
const uploadRoutes = require("./routes/upload.routes");
const cors = require("cors");
const app = express();

app.use(
  cors({
    origin: [process.env.FRONTEND_URL, "http://localhost:5173"],
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookiesParser());

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/upload", uploadRoutes);
module.exports = app;

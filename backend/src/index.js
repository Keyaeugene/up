require("dotenv").config();
const express = require("express");
const cors = require("cors");

const productsRouter = require("./routes/products");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Health check — visit http://localhost:4000/health in a browser to confirm
// the server is alive.
app.get("/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

app.use("/api/products", productsRouter);

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Sample data
let assets = [
  {
    id: 1,
    name: "Laptop",
    category: "Electronics",
    status: "Available"
  },
  {
    id: 2,
    name: "Projector",
    category: "Electronics",
    status: "Allocated"
  }
];

// Home
app.get("/", (req, res) => {
  res.send("AssetFlow Backend Running");
});

// Get all assets
app.get("/assets", (req, res) => {
  res.json(assets);
});

// Add asset
app.post("/assets", (req, res) => {
  const asset = {
    id: assets.length + 1,
    name: req.body.name,
    category: req.body.category,
    status: "Available"
  };

  assets.push(asset);
  res.json({
    message: "Asset Added Successfully",
    asset
  });
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
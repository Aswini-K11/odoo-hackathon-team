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
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/assetflow")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Asset Schema
const AssetSchema = new mongoose.Schema({
    name: String,
    category: String,
    serialNumber: String,
    location: String,
    status: {
        type: String,
        default: "Available"
    }
});

// Model
const Asset = mongoose.model("Asset", AssetSchema);

// Home
app.get("/", (req, res) => {
    res.send("AssetFlow Backend Running");
});

// Get All Assets
app.get("/assets", async (req, res) => {
    const assets = await Asset.find();
    res.json(assets);
});

// Add Asset
app.post("/assets", async (req, res) => {
    const asset = new Asset({
        name: req.body.name,
        category: req.body.category,
        serialNumber: req.body.serialNumber,
        location: req.body.location
    });

    await asset.save();
    res.json({
        message: "Asset Added Successfully",
        asset
    });
});

// Update Asset Status
app.put("/assets/:id", async (req, res) => {
    const asset = await Asset.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.json(asset);
});

// Delete Asset
app.delete("/assets/:id", async (req, res) => {
    await Asset.findByIdAndDelete(req.params.id);
    res.json({ message: "Asset Deleted" });
});

// Start Server
app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});

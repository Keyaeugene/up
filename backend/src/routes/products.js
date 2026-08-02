const express = require("express");
const prisma = require("../prismaClient");

const router = express.Router();

// GET /api/products — list all products.
// Note: for the v1 mockup we skip authentication and just use a single
// hardcoded demo merchant (see index.js seed step). Real multi-merchant
// auth comes in a later step.
router.get("/", async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: "asc" },
    });
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// POST /api/products — create a product.
// Body: { merchantId, name, price, sku?, barcode?, stock? }
router.post("/", async (req, res) => {
  const { merchantId, name, price, sku, barcode, stock } = req.body;

  if (!merchantId || !name || price === undefined) {
    return res
      .status(400)
      .json({ error: "merchantId, name, and price are required" });
  }

  try {
    const product = await prisma.product.create({
      data: {
        merchantId,
        name,
        price,
        sku: sku || undefined,
        barcode: barcode || undefined,
        stock: stock ?? 0,
      },
    });
    res.status(201).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create product" });
  }
});

// GET /api/products/barcode/:barcode — lookup for scanner workflow.
router.get("/barcode/:barcode", async (req, res) => {
  try {
    const product = await prisma.product.findUnique({
      where: { barcode: req.params.barcode },
    });
    if (!product) return res.status(404).json({ error: "Not found" });
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to look up product" });
  }
});

module.exports = router;

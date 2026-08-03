const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const merchant = await prisma.merchant.upsert({
    where: { email: "demo@shop.co.ke" },
    update: {},
    create: {
      name: "Demo Mini-Mart",
      email: "demo@shop.co.ke",
      password: "not-hashed-yet-fix-before-production",
      receiptsEnabled: true,
    },
  });

  const demoProducts = [
    { name: "Bread - White 400g", price: 65.0, sku: "BRD-001", barcode: "6161100000011", stock: 40 },
    { name: "Milk - Fresh 500ml", price: 60.0, sku: "MLK-001", barcode: "6161100000028", stock: 25 },
    { name: "Cooking Oil 1L", price: 320.0, sku: "OIL-001", barcode: "6161100000035", stock: 15 },
    { name: "Sugar 1kg", price: 150.0, sku: "SGR-001", barcode: "6161100000042", stock: 30 },
    { name: "Soda 500ml", price: 70.0, sku: "SDA-001", barcode: "6161100000059", stock: 50 },
  ];

  for (const p of demoProducts) {
    await prisma.product.upsert({
      where: { sku: p.sku },
      update: { barcode: p.barcode, price: p.price, stock: p.stock },
      create: { ...p, merchantId: merchant.id },
    });
  }

  console.log("Seeded merchant:", merchant.id);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
// Creates one demo merchant and a few demo products so the POS screen has
// something to show. Run with: npm run prisma:seed
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
    { name: "Bread - White 400g", price: 65.0, sku: "BRD-001", stock: 40 },
    { name: "Milk - Fresh 500ml", price: 60.0, sku: "MLK-001", stock: 25 },
    { name: "Cooking Oil 1L", price: 320.0, sku: "OIL-001", stock: 15 },
    { name: "Sugar 1kg", price: 150.0, sku: "SGR-001", stock: 30 },
    { name: "Soda 500ml", price: 70.0, sku: "SDA-001", stock: 50 },
  ];

  for (const p of demoProducts) {
    await prisma.product.upsert({
      where: { sku: p.sku },
      update: {},
      create: { ...p, merchantId: merchant.id },
    });
  }

  console.log("Seeded merchant:", merchant.id);
  console.log("Save this merchantId — the frontend .env.local needs it.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

// Shape of a Product as returned by the backend API.
// Mirrors the "Product" model in backend/prisma/schema.prisma.
export interface Product {
  id: string;
  merchantId: string;
  name: string;
  description: string | null;
  price: string; // Prisma Decimal comes over JSON as a string
  sku: string | null;
  barcode: string | null;
  stock: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// One line in the cashier's cart.
export interface CartLine {
  product: Product;
  quantity: number;
}

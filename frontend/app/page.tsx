"use client";

import { useEffect, useState } from "react";
import type { Product, CartLine } from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export default function POSScreen() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartLine[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/api/products`)
      .then((res) => {
        if (!res.ok) throw new Error("Backend responded with an error");
        return res.json() as Promise<Product[]>;
      })
      .then((data) => setProducts(data))
      .catch((err) => {
        console.error(err);
        setError(
          "Could not reach the backend. Is it running? See docs/04-run-backend.md"
        );
      })
      .finally(() => setLoading(false));
  }, []);

  function addToCart(product: Product) {
    setCart((prev) => {
      const existing = prev.find((line) => line.product.id === product.id);
      if (existing) {
        return prev.map((line) =>
          line.product.id === product.id
            ? { ...line, quantity: line.quantity + 1 }
            : line
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  }

  function removeFromCart(productId: string) {
    setCart((prev) => prev.filter((line) => line.product.id !== productId));
  }

  const total = cart.reduce(
    (sum, line) => sum + Number(line.product.price) * line.quantity,
    0
  );

  return (
    <div className="page">
      <div className="product-grid">
        <h1>Demo Mini-Mart — POS</h1>
        {loading && <p className="status">Loading products…</p>}
        {error && <p className="status error">{error}</p>}
        <div className="grid">
          {products.map((product) => (
            <button
              key={product.id}
              className="product-card"
              onClick={() => addToCart(product)}
            >
              <div>{product.name}</div>
              <div className="price">
                KES {Number(product.price).toFixed(2)}
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="cart-panel">
        <h2>Cart</h2>
        {cart.length === 0 && <p className="status">Cart is empty.</p>}
        {cart.map((line) => (
          <div className="cart-item" key={line.product.id}>
            <span>
              {line.product.name} × {line.quantity}
            </span>
            <span>
              KES {(Number(line.product.price) * line.quantity).toFixed(2)}
              {"  "}
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  removeFromCart(line.product.id);
                }}
              >
                ✕
              </a>
            </span>
          </div>
        ))}
        <div className="cart-total">
          <span>Total</span>
          <span>KES {total.toFixed(2)}</span>
        </div>
        <p className="status">
          Checkout (Cash / M-Pesa) comes in the next build step.
        </p>
      </div>
    </div>
  );
}

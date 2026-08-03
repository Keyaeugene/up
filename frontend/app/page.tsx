"use client";

import { useCallback, useEffect, useState } from "react";
import type { Product, CartLine } from "./types";
import { useBarcodeScanner } from "./useBarcodeScanner";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

type ScanStatus =
  | { kind: "idle" }
  | { kind: "added"; name: string }
  | { kind: "not-found"; code: string };

export default function POSScreen() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartLine[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [scanStatus, setScanStatus] = useState<ScanStatus>({ kind: "idle" });

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

  const handleBarcodeScan = useCallback(async (code: string) => {
    try {
      const res = await fetch(`${API_URL}/api/products/barcode/${code}`);
      if (res.status === 404) {
        setScanStatus({ kind: "not-found", code });
        return;
      }
      if (!res.ok) throw new Error("Lookup failed");
      const product: Product = await res.json();
      addToCart(product);
      setScanStatus({ kind: "added", name: product.name });
    } catch (err) {
      console.error(err);
      setScanStatus({ kind: "not-found", code });
    }
  }, []);

  useBarcodeScanner(handleBarcodeScan);

  useEffect(() => {
    if (scanStatus.kind === "idle") return;
    const timer = setTimeout(() => setScanStatus({ kind: "idle" }), 2500);
    return () => clearTimeout(timer);
  }, [scanStatus]);

  const total = cart.reduce(
    (sum, line) => sum + Number(line.product.price) * line.quantity,
    0
  );

  return (
    <div className="page">
      <div className="product-grid">
        <h1>Demo Mini-Mart — POS</h1>
        <p className="status">
          Scan a barcode anytime — the scanner works from anywhere on this
          screen, no need to click into a box first.
        </p>
        {scanStatus.kind === "added" && (
          <p className="scan-banner scan-banner--ok">
            ✓ Added "{scanStatus.name}" to cart
          </p>
        )}
        {scanStatus.kind === "not-found" && (
          <p className="scan-banner scan-banner--error">
            ✕ No product found for barcode "{scanStatus.code}"
          </p>
        )}
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
              {product.barcode && (
                <div className="barcode-hint">{product.barcode}</div>
              )}
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
  <button
    type="button"
    onClick={() => removeFromCart(line.product.id)}
    style={{ background: "none", border: "none", cursor: "pointer", color: "red" }}
  >
    ✕
  </button>
</span>
          </div>
        ))}
        <div className="cart-total">
          <span>Total</span>
          <span>KES {total.toFixed(2)}</span>
        </div>
        <p className="status">
          Checkout (Cash / M-Pesa) comes in a future build step.
        </p>
      </div>
    </div>
  );
}
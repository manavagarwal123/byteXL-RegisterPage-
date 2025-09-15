import { useState } from "react";
import "./App.css";

// ✅ ProductCard component
function ProductCard({ name, price, inStock, onAddToCart }) {
  const [available, setAvailable] = useState(inStock);

  const cardStyle = {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "16px",
    margin: "12px",
    width: "240px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
    transition: "transform 0.2s ease",
    cursor: "pointer",
  };

  const stockStyle = {
    color: available ? "green" : "red",
    fontWeight: "bold",
    marginTop: "8px",
  };

  return (
    <div
      style={cardStyle}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      <h2>{name}</h2>
      <p>💲{price.toFixed(2)}</p>
      <p style={stockStyle}>{available ? "In Stock" : "Out of Stock"}</p>

      <button
        onClick={() => setAvailable(!available)}
        style={{
          margin: "6px",
          padding: "8px 12px",
          borderRadius: "6px",
          border: "none",
          background: "#007bff",
          color: "white",
          cursor: "pointer",
        }}
      >
        Toggle Stock
      </button>

      <button
        onClick={onAddToCart}
        disabled={!available}
        style={{
          margin: "6px",
          padding: "8px 12px",
          borderRadius: "6px",
          border: "none",
          background: available ? "#28a745" : "#aaa",
          color: "white",
          cursor: available ? "pointer" : "not-allowed",
        }}
      >
        Add to Cart 🛒
      </button>
    </div>
  );
}

// ✅ Main App
function App() {
  const [cartCount, setCartCount] = useState(0);

  const products = [
    { name: "Wireless Mouse", price: 25.99, inStock: true },
    { name: "Mechanical Keyboard", price: 89.49, inStock: false },
    { name: "HD Monitor", price: 199.99, inStock: true },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h1>🛍️ Product Store</h1>
      <p>
        Cart: <strong>{cartCount}</strong> items
      </p>

      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {products.map((product, index) => (
          <ProductCard
            key={index}
            name={product.name}
            price={product.price}
            inStock={product.inStock}
            onAddToCart={() => setCartCount(cartCount + 1)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { AppProvider } from "./context/ProductContext.jsx";
import { FilterProvider } from "./context/FilterContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import { Analytics } from "@vercel/analytics/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AppProvider>
    <FilterProvider>
      <CartProvider>
        <React.StrictMode>
          <App />
          <Analytics />
        </React.StrictMode>
      </CartProvider>
    </FilterProvider>
  </AppProvider>
);

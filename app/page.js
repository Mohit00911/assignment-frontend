"use client"
import ProductCard from "./components/productCard";
import './styles/homepage.css'
import { useEffect, useState } from "react";

export default function Home() {
  const [products,setProducts]=useState("")
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('http://localhost:3001/getOfferings');
        if (!res.ok) {
          throw new Error('Failed to fetch offerings');
        }
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } 
    };

    fetchProducts();
  }, []);

  return (
  <>
    <div className="app">

    <header className="header">
   <h1>Koinpr Marketplace</h1>
      <p>Showing Result: <span className="result-count">{products.length}</span></p>
      <p>Content distribution</p>
   </header>

    <div className="product-grid">
        {products && products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </div>
 
  </>
  );
}


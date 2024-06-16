import React from 'react';
import '../styles/productCard.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL } from "@/utils/headers";
const ProductCard = ({ product }) => {
  const addToCart = async (product) => {
  
    try {
      const response = await fetch(`${BASE_URL}/addToCart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });

      if (!response.ok) {
      
        throw new Error('Failed to add product to cart');
       
      }

      const data = await response.json();
      console.log('Product added to cart:', data);
      toast.success('Item added to Cart');
           
    } catch (error) {
      console.error('Error:', error);
      toast.error('Item already in cart');
    }
  };

  return (
    <div className="product-card">
      <div className="product-info">
        <h3 className="product-title">{product.title}</h3>
        <p className="product-description">{product.description}</p>
        <p className="product-price">$ {product.price}</p>
        <button className='cart__button' onClick={() => addToCart(product)}>Add To Cart</button>
      </div>
      <ToastContainer/>
    </div>

  );
};

export default ProductCard;

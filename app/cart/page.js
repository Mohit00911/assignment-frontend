"use client"
import React, { useEffect, useState } from 'react';
import '../styles/cart.css';
import { MdDelete } from "react-icons/md";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL } from "@/utils/headers";

const Page = () => {
    const [cartItems, setCartItems] = useState([]);
    const [updateFlag, setUpdateFlag] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch(`${BASE_URL}/getCartItems`);
                if (!res.ok) {
                    throw new Error('Failed to fetch CartItems');
                }
                const data = await res.json();
                const total = data.reduce((acc, item) => acc + item.price, 0);
                setTotalPrice(total);
                setCartItems(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchProducts();
    }, [updateFlag]);

    const handleCheckout = async () => {
      
    
        try {
         
          const transactionResponse = await fetch(`${BASE_URL}/checkout`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              items: cartItems,
              total: totalPrice,
            }),
          });
    
      
          const transactionData = await transactionResponse.json();
          toast.success('Checkout completed successfully!');
         
        } catch (error) {
          console.error('Error during checkout:', error);
          toast.error('Error during checkout. Please try again.');
        }
      };
    
    const deleteItem = async (id) => {
        try {
            const res = await fetch(`${BASE_URL}/deleteCartItem/${id}`, {
                method: 'DELETE',
            });

            if (!res.ok) {
                throw new Error('Failed to delete item');
            }

            setUpdateFlag((prevFlag) => !prevFlag);
            toast.success('Item removed from cart');
           
        } catch (error) {
            console.error('Error deleting item:', error);
            toast.error('Failed to delete item');
        }
    };

    return (
        <div className='cart__and__checkout'>
            <div className='cart__outer'>
                <div className='cart__inner'>
                {cartItems.length > 0 ? (
        <div className='cart__items'>
          <p className='cart__title'>Items</p>
          {cartItems.map((cartItem) => (
            <div key={cartItem._id} className='cart__item'>
              <div className='content'>
                <p className='item__title'>{cartItem.title}</p>
                <p className='item__description'>{cartItem.description}</p>
                <p className='item__price'>${cartItem.price.toFixed(2)}</p>
              </div>
              <div className='close'>
                <MdDelete onClick={() => deleteItem(cartItem._id)} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className='empty__cart'>
          <p>Your cart is empty. Add some items!</p>
        </div>
      )}
                </div>
            </div>
            <div className='checkout__outer'>
                <div className='checkout__inner'>
               <div className='total'>

          <p>Total</p>
          <p>$ {totalPrice}</p>
               </div>
          <button onClick={()=>handleCheckout()} >Complete Checkout</button>
        
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default Page;

"use client"
import React, { useState } from 'react';
import '../styles/publish.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Page = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const offeringData = {
      title,
      description,
      price
    };

    try {
      const response = await fetch(`${BASE_URL}/createOfferings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(offeringData)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
     
      toast.success('Offering created!');
      setTitle('');
      setDescription('');
      setPrice('');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error creating offering. Please try again.');
    }
  };

  return (
    <div className='publish__main'>
      <ToastContainer />
      <div className='publish__inner'>
        <p>Add Offering</p>
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <label htmlFor='title'>Title</label>
            <input
              type='text'
              id='title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='description'>Description</label>
            <textarea
              id='description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='price'>Price</label>
            <input
              type='number'
              id='price'
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
          <button type='submit'>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Page;

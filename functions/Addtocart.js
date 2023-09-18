import React from 'react';

const AddToCart = (productId) => {

    const existingCart = JSON.parse(localStorage.getItem('cart')) || {};

    // Check if the product already exists in the cart
    if (existingCart.hasOwnProperty(productId)) {
      // If it exists, increment the quantity
      existingCart[productId] += 1;
    } else {
      // If it doesn't exist, add it to the cart with a quantity of 1
      existingCart[productId] = 1;
    }

    localStorage.setItem('cart', JSON.stringify(existingCart));

    console.log("Added to cart:", productId);
  
};

export default AddToCart;

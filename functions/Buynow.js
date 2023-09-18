
const Buynow = (productId) => {
  const existingCart = {};
  existingCart[productId] = 1; 
  localStorage.setItem('cart', JSON.stringify(existingCart));
  console.log("Added to cart:", productId);
};

export default Buynow;



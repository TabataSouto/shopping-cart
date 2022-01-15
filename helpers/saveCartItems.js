const saveCartItems = (product) => {
  // const productCart = document.querySelector('.cart__items').innerHTML;
  localStorage.setItem('cartItems', product);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}

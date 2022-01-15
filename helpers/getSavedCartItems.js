const getSavedCartItems = () => {
  // recuperada a section da ol;
  const productCart = document.querySelector('.cart__items');
  // acresecntado na section cart a ol salta em localStorage;
  productCart.innerHTML = localStorage.getItem('cartItems');
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}

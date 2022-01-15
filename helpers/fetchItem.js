const fetchItem = async (idItem) => {
  // seu código aqui
  try {
    const url = `https://api.mercadolibre.com/items/${idItem}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}

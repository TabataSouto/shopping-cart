// constantes globais
const sectionCartItems = document.querySelector('.cart__items');
const emptyCartButton = document.querySelector('.empty-cart');
const subTotal = document.querySelector('.total-price');

// ------------------
function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ sku, name, image, salePrice }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createCustomElement('span', 'item__price', `R$ ${salePrice.toFixed(2)}`));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

async function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

// Somar o valor de todos os produtos do carrinho;
const sumPrices = () => {
  // spreed operator transforma o meu HTMLcollection em um array, possuindo a mesma função do Array.from(): https://stackoverflow.com/questions/222841/most-efficient-way-to-convert-an-htmlcollection-to-an-array
  const lis = [...sectionCartItems.children];
  // 
  const priceString = lis
    .map((element) => 
      element.innerText.split('$')[1]);
  const priceNumber = priceString
    .map((number) =>
      parseFloat(number));
  const sum = priceNumber.reduce((acc, val) => acc + val, 0);
  subTotal.innerText = Math.round(sum * 100) / 100;
};

function cartItemClickListener(event) {
  // remove o produto do carrinho ao clilcar nele;
  event.target.remove();
  sumPrices();
  // remove do localStorage ao remover do carrinho de compras;
  saveCartItems(sectionCartItems.innerHTML);
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

// remove o p com 'Carregando...' quando a API é carregada;
const removeLoading = () => {
  document.querySelector('.loading').remove();
};

// adicionar produto ao carrinho de compras clicando no botão 'Adicionar ao carrinho!'
function getIdOnClick() {
  const addCartButton = document.querySelectorAll('.item__add');
  // loop para percorrer todos os buttons 'Adicionar ao carrinho'
  return addCartButton.forEach((element) => {
    // evento de click criado em todos os buttons
    element.addEventListener('click', async (event) => {
      // event target pega a tag do botão e em seguida recupera o pai com o parentNode
      const getFather = event.target.parentNode;
      // passado como parametro da getSkuFromProductItem para pegar o ID e trazer objeto com as informações apenas do produto que foi selecionado;
      const getId = await getSkuFromProductItem(getFather);
      // adicionado no site as informações ao clicar no botão de adicionar ao carrinho;
      const { id: sku, title: name, price: salePrice } = await fetchItem(getId);
      sectionCartItems.appendChild(createCartItemElement({ sku, name, salePrice }));
      sumPrices();
      // salva os produtos adicionados no carrinho de compras em localStorage;
      saveCartItems(sectionCartItems.innerHTML);
    });
  });
}

// esvaziar lista de carrinho ao clicar no botão 'Esvaziar carrinho';
function emptyCart() {
  // evento de click no botão 'Esvaziar carrinho';
  emptyCartButton.addEventListener('click', (event) => {
    // trás o pai que é a section cart;
    const button = event.target.parentNode;
    // recupera as lis da ol;
    const ol = button.querySelectorAll('ol > li');
    // faz loop para remover todas as li's do ol
    ol.forEach((el) => el.remove());
    sumPrices();
    subTotal.innerText = '0,00';
    saveCartItems(sectionCartItems.innerHTML);
  });
}

const addProductItemElement = async () => {
    // desestruturando a fetchProducts com a chave que será utilizada;
  const { results } = await fetchProducts('computador');
  removeLoading();
  // section em que os items irão aparecer
  const sectionItems = document.querySelector('.items');
  // loop para adicionar todos os items disponíveis no array de objetos na tela;
  results.forEach((product) => {
    // desestruturando resultas em chaves que serão utilizadas renomeadas;
    const { id: sku, title: name, thumbnail: image, price: salePrice } = product;
    // adicionando no html os produtos criados com a função createProductItemElement;
    sectionItems.appendChild(createProductItemElement({ sku, name, image, salePrice }));
  });
  getIdOnClick();
  emptyCart();
};

const getItemsCartList = () => {
  // adicionando as li's salvas em localStorage.setItem na ol;
  sectionCartItems.innerHTML = getSavedCartItems();
  // recuperando li's que foram adicionadas na ol com o localStorage.getItem;
  const li = sectionCartItems.querySelectorAll('li');
  // loop para percorrer todas as li's pegas pelo getItem;
  li.forEach((element) => {
    // adiciona o evento de remover ao clicar no produto em todas as li's;
    element.addEventListener('click', cartItemClickListener);
  });
};

window.onload = () => {
  getItemsCartList();
  setTimeout(() => addProductItemElement(), 1000);
};

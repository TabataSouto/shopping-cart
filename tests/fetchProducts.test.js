require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fecthProducts', () => {
  // implemente seus testes aqui
  it('Teste se fetchProducts é uma função', () => {
    // referência colega @SrTonn e https://jestjs.io/pt-BR/docs/expect#tobeinstanceofclass
    // testa se é objeto, função, array, string, etc;
    expect(fetchProducts).toBeInstanceOf(Function);
  });
});

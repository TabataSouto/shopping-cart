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

  it('Execute a função fetchProducts com o argumento "computador" e teste se fetch foi chamada', async () => {
    await fetchProducts('computador');
    // toHaveBeenCalled garante que uma função de simulação (mock) foi chamada;
    expect(fetch).toHaveBeenCalled();
  });

  it('Teste se, ao chamar a função fetchProducts com o argumento "computador", a função fetch utiliza o endpoint "https://api.mercadolibre.com/sites/MLB/search?q=computador"', async () => {
    await fetchProducts('computador');
    // referência: https://jestjs.io/pt-BR/docs/expect#tohavebeencalledwitharg1-arg2-
    // garante que uma função de simulação (mock) foi chamada com argumentos específicos;
    const url = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    expect(fetch).toHaveBeenCalledWith(url);
  });

  it('Teste se o retorno da função fetchProducts com o argumento "computador" é uma estrutura de dados igual ao objeto computadorSearch, que já está importado no arquivo', async () => {
    const compare = await fetchProducts('computador');
    // compara recursivamente todas as propriedades de instâncias de objetos;
    expect(compare).toEqual(computadorSearch);
  });
});

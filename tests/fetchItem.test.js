require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fecthItem', () => {
  it('Teste se fetchItem é uma função.', async () => {
    expect(fetchItem).toBeInstanceOf(Function);
  });
  
  it('Execute a função fetchItem com o argumento do item "MLB1615760527" e teste se fetch foi chamada.', async () => {
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  });

  it('', () => {
    fail('Teste vazio');
  });

  it('', () => {
    fail('Teste vazio');
  });

  it('', () => {
    fail('Teste vazio');
  });
});

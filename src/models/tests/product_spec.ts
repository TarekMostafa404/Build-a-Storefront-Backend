import { Product, ProductStore } from '../product';

const Store = new ProductStore();
describe('Product Model', () => {
  it('should have index method', () => {
    expect(Store.index).toBeDefined();
  });

  it('index method should return a list of products', async () => {
    const result = await Store.index();
    expect(result).toEqual([]);
  });
});

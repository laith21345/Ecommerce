import { SearchForProductByTitlePipe } from './search-for-product-by-title.pipe';

describe('SearchForProductByNamePipe', () => {
  it('create an instance', () => {
    const pipe = new SearchForProductByTitlePipe();
    expect(pipe).toBeTruthy();
  });
});

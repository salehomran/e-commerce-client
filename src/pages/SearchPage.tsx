import React, { useState, ChangeEvent, FormEvent} from 'react';
import { searchProducts } from '../services/searchService';
import { ISearchItem } from '../types/SearchResult';
import { fetchProducts } from '../services/productService';
import { IProduct } from '../types/Product';

const SearchPage: React.FC = () => {
  const [items, setItems] = useState<ISearchItem[] | null>(null);
  const [error, setError] = useState<string>('');
  const [searchText, setSearchText] = useState<string>('');

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (searchText.length <= 3) {
        throw new Error('Must type more than 3 chars');
      }
      
      const response = await searchProducts(searchText);
      console.log(response);

      if (response.items === undefined) {
        throw new Error('No search results');
      }

      const storeProducts = await fetchProducts();

      // Filter the response items to only include products that are in the store products and alter the link to the product page
      const filteredProducts = response.items.filter((item: ISearchItem) => {
        const matchingProduct = storeProducts.find((product: IProduct) => item.title.toLowerCase().includes(product.name.toLowerCase()));
        if (matchingProduct) {
          item.link = `/products/${matchingProduct.id}`;
        }
        return matchingProduct !== undefined;
      });

      setItems(filteredProducts);
      setError('');
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
        setError(error.message);
      }
      console.log(error);
    }
  };


  return (
    <div className="search-page">
      <section id="header" className='mb-4'>
        <form id="search-form">
          <input 
            type="text" 
            placeholder="search (sök skärm)" 
            className='border border-gray-400 rounded p-1' 
            onChange={(e: ChangeEvent<HTMLInputElement>) => { setSearchText(e.target.value)}}
          />
          
          <button className='border border-gray-400 rounded p-1' onClick={handleSearch}>Search</button>
        </form>
      </section>
      <h2>Sökresultat</h2>
      
      {error && <p className="error">{error}</p>}
      
      {items && items.map((item) => (
        <div key={item.title} className="search-result-item">
          <div className="result-image">
            {item.pagemap.cse_thumbnail ? (
              <img 
                src={item.pagemap.cse_thumbnail[0].src} 
                alt={item.title}
                className="thumbnail"
              />
            ) : (
              <img 
                src={'https://tacm.com/wp-content/uploads/2018/01/no-image-available.jpeg'} 
                alt="No image available"
                className="thumbnail"
              />
            )}
          </div>
          
          <div className="result-content">
            <h3>{item.title}</h3>
            <p>{item.snippet}</p>
            <a href={item.link} target="_blank" rel="noopener noreferrer">
              To Product →
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchPage; 
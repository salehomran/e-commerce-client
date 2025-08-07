import axios from 'axios';

export const searchProducts = async (query: string) => {
  const response = await axios.get('https://www.googleapis.com/customsearch/v1', {
    params: {
      q: query,
      key: 'AIzaSyCDzl45FVyHIYHswJwYCFU4hXi_7u5E8yg',
      cx:'d0776ff73f80940e7'
    }
  });
  
  return response.data;
}; 
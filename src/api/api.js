
const BASE_URL = 'https://dummyjson.com/products';

export const getProducts = async () => {
  try {
    const response = await fetch(`${BASE_URL}?limit=0`);
    const data = await response.json();
    return data.products;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const searchProducts = async (query) => {
  try {
    const response = await fetch(`${BASE_URL}/search?q=${query}`);
    const data = await response.json();
    return data.products;
  } catch (error) {
    console.error("Error searching products:", error);
    throw error;
  }
};

export const getCategories = async () => {
  try {
    const response = await fetch(`${BASE_URL}/categories`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
}

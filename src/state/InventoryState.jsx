import React, { createContext, useContext, useState, useEffect } from 'react';
import { getProducts, getCategories } from '../api/api';

const InventoryContext = createContext();

export const useInventory = () => useContext(InventoryContext);

export const InventoryProvider = ({ children }) => {
    // --- State: Data ---
    const [inventory, setInventory] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // --- State: Filters & UI ---
    const [filteredInventory, setFilteredInventory] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [sortOrder, setSortOrder] = useState('');

    // --- Effect: Initial Data Fetch ---
    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                // Fetch both products and categories in parallel
                const [productList, categoryList] = await Promise.all([
                    getProducts(),
                    getCategories()
                ]);

                setInventory(productList);
                setFilteredInventory(productList);
                setCategories(categoryList);
            } catch (err) {
                console.error("Failed to initialize shop data", err);
                setError('Unable to load products. Please check your connection.');
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    // --- Effect: Handle Filtering & Sorting ---
    useEffect(() => {
        let result = [...inventory];

        // 1. Filter by Search Query
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(item =>
                item.title.toLowerCase().includes(query)
            );
        }

        // 2. Filter by Category
        if (selectedCategory) {
            result = result.filter(item => item.category === selectedCategory);
        }

        // 3. Apply Sorting
        if (sortOrder === 'asc') {
            result.sort((a, b) => a.price - b.price);
        } else if (sortOrder === 'desc') {
            result.sort((a, b) => b.price - a.price);
        }

        setFilteredInventory(result);
    }, [inventory, searchQuery, selectedCategory, sortOrder]);

    const value = {
        inventory: filteredInventory,
        categories,
        loading,
        error,

        // Filter actions
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        sortOrder,
        setSortOrder
    };

    return (
        <InventoryContext.Provider value={value}>
            {children}
        </InventoryContext.Provider>
    );
};

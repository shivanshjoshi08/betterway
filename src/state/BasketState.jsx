import React, { createContext, useContext, useState, useEffect } from 'react';

const BasketContext = createContext();

export const useBasket = () => useContext(BasketContext);

export const BasketProvider = ({ children }) => {
    // --- State Management ---
    const [basket, setBasket] = useState(() => {
        // Load persist state on mount
        try {
            const savedBasket = localStorage.getItem('basket'); // Changed key to 'basket'
            return savedBasket ? JSON.parse(savedBasket) : [];
        } catch (error) {
            console.error("Failed to load basket", error);
            return [];
        }
    });

    // --- Persistence ---
    useEffect(() => {
        localStorage.setItem('basket', JSON.stringify(basket));
    }, [basket]);

    // --- Actions ---

    // Renamed from addToCart to addToBasket
    const addToBasket = (item) => {
        setBasket((prev) => {
            const existing = prev.find((i) => i.id === item.id);
            if (existing) {
                if (existing.quantity >= item.stock) return prev;
                return prev.map((i) =>
                    i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                );
            }
            return [...prev, { ...item, quantity: 1 }];
        });
    };

    const removeFromBasket = (id) => {
        setBasket((prev) => prev.filter((i) => i.id !== id));
    };

    const updateQuantity = (id, quantity, stock) => {
        if (quantity < 1) return;
        if (quantity > stock) return;
        setBasket((prev) =>
            prev.map((i) => (i.id === id ? { ...i, quantity } : i))
        );
    };

    const clearBasket = () => {
        setBasket([]);
    };

    // --- Derived Data ---
    const totalQuantity = basket.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = basket.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return (
        <BasketContext.Provider
            value={{
                basket,
                addToBasket,
                removeFromBasket,
                updateQuantity,
                clearBasket,
                totalQuantity,
                totalPrice
            }}
        >
            {children}
        </BasketContext.Provider>
    );
};

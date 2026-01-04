import React, { useState } from 'react';
import TopNavigation from './TopNavigation';
import BasketDrawer from './BasketDrawer';

const PageFrame = ({ children }) => {
    const [isBasketOpen, setIsBasketOpen] = useState(false);

    return (
        <>
            <TopNavigation onBasketClick={() => setIsBasketOpen(true)} />
            <BasketDrawer isOpen={isBasketOpen} onClose={() => setIsBasketOpen(false)} />
            <main className="container" style={{ marginTop: '2rem', marginBottom: '4rem' }}>
                {children}
            </main>
        </>
    );
};

export default PageFrame;

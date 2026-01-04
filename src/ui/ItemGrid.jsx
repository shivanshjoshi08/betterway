import React from 'react';
import { useInventory } from '../state/InventoryState';
import ItemCard from './ItemCard';
import styles from './ItemGrid.module.css';

const ItemGrid = () => {
    const { inventory, loading, error } = useInventory();

    if (loading) {
        return (
            <div className={styles.loadingState}>
                <div className={styles.spinner}></div>
                <p>Curating the best for you...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.errorState}>
                <p>Something went wrong: {error}</p>
                <button onClick={() => window.location.reload()} className="btn btn-primary">Try Again</button>
            </div>
        );
    }

    if (inventory.length === 0) {
        return (
            <div className={styles.emptyState}>
                <h3>We couldn't find anything</h3>
                <p>Maybe try searching for something else?</p>
            </div>
        );
    }

    return (
        <div className={styles.grid}>
            {inventory.map((item) => (
                <ItemCard key={item.id} product={item} />
            ))}
        </div>
    );
};

export default ItemGrid;

import React from 'react';
import { useBasket } from '../state/BasketState';
import styles from './ItemCard.module.css';

const ItemCard = ({ product }) => {
    // addToCart -> addToBasket, cart -> basket
    const { addToBasket, basket } = useBasket();

    const basketItem = basket.find(item => item.id === product.id);
    const currentQty = basketItem ? basketItem.quantity : 0;
    const isOutOfStock = product.stock === 0 || product.availabilityStatus === 'Out of Stock';
    const isFullyInBasket = currentQty >= product.stock;

    const handleAdd = () => {
        addToBasket(product);
    };

    return (
        <div className={styles.card}>
            <div className={styles.imageContainer}>
                <img loading="lazy" src={product.thumbnail} alt={product.title} className={styles.image} />
                {isOutOfStock && <span className={`${styles.badge} ${styles.outOfStock}`}>Gone for now</span>}
                {!isOutOfStock && product.stock < 5 && <span className={`${styles.badge} ${styles.lowStock}`}>Almost gone</span>}
            </div>

            <div className={styles.content}>
                <div className={styles.category}>{product.category}</div>
                <h3 className={styles.title} title={product.title}>{product.title}</h3>

                <div className={styles.footer}>
                    <span className={styles.price}>${product.price}</span>
                    <button
                        className={styles.addBtn}
                        onClick={handleAdd}
                        disabled={isOutOfStock || isFullyInBasket}
                    >
                        {isOutOfStock ? 'Sold Out' : isFullyInBasket ? 'Bag is full' : 'Grab it'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ItemCard;

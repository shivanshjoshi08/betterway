import React, { useEffect } from 'react';
import { useBasket } from '../state/BasketState';
import styles from './BasketDrawer.module.css';

const BasketDrawer = ({ isOpen, onClose }) => {
    // cart -> basket, removeFromCart -> removeFromBasket
    const { basket, removeFromBasket, updateQuantity, totalPrice } = useBasket();

    // Disable body scroll when basket is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => { document.body.style.overflow = 'auto'; };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <>
            <div className={styles.overlay} onClick={onClose}></div>
            <div className={styles.sidebar}>
                <div className={styles.header}>
                    <h2>Cart ({basket.length})</h2>
                    <button onClick={onClose} className={styles.closeBtn}>&times;</button>
                </div>

                <div className={styles.content}>
                    <div className={styles.items}>
                        {basket.length === 0 ? (
                            <div className={styles.emptyCart}>
                                <p>It's looking empty in here.</p>
                            </div>
                        ) : (
                            basket.map(item => (
                                <div key={item.id} className={styles.cartItem}>
                                    <div className={styles.itemImageContainer}>
                                        <img src={item.thumbnail} alt={item.title} className={styles.itemImage} />
                                    </div>
                                    <div className={styles.itemDetails}>
                                        <h4 className={styles.itemTitle}>{item.title}</h4>
                                        <span className={styles.itemPrice}>${item.price.toFixed(2)}</span>

                                        <div className={styles.quantityControls}>
                                            <button
                                                className={styles.qtyBtn}
                                                onClick={() => updateQuantity(item.id, item.quantity - 1, item.stock)}
                                                disabled={item.quantity <= 1}
                                            >
                                                -
                                            </button>
                                            <span className={styles.qtyValue}>{item.quantity}</span>
                                            <button
                                                className={styles.qtyBtn}
                                                onClick={() => updateQuantity(item.id, item.quantity + 1, item.stock)}
                                                disabled={item.quantity >= item.stock}
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                    <button
                                        className={styles.removeBtn}
                                        onClick={() => removeFromBasket(item.id)}
                                        aria-label="Remove item"
                                    >
                                        &times;
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                <div className={styles.footer}>
                    <div className={styles.totalRow}>
                        <span>Subtotal</span>
                        <span className={styles.totalPrice}>${totalPrice.toFixed(2)}</span>
                    </div>
                    <button className={`${styles.checkoutBtn} btn btn-primary`} disabled={basket.length === 0}>
                        Checkout
                    </button>
                </div>
            </div>
        </>
    );
};

export default BasketDrawer;

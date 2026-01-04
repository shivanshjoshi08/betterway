
import { useBasket } from '../state/BasketState';
import styles from './TopNavigation.module.css';

const TopNavigation = ({ onBasketClick }) => {
    const { totalQuantity } = useBasket();

    return (
        <header className={styles.header}>
            <div className={`container ${styles.container}`}>
                <div className={styles.logo}>
                    The Shop
                </div>
                <button className={styles.cartBtn} onClick={onBasketClick}>
                    Cart ({totalQuantity})
                </button>
            </div>
        </header>
    );
};

export default TopNavigation;

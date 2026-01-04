
import { useInventory } from '../state/InventoryState';
import styles from './SearchControls.module.css';

const SearchControls = () => {
    const {
        searchQuery, setSearchQuery,
        selectedCategory, setSelectedCategory,
        sortOrder, setSortOrder,
        categories
    } = useInventory();

    const handleClear = () => {
        setSearchQuery('');
        setSelectedCategory('');
        setSortOrder('');
    };

    return (
        <div className={styles.filterBar}>
            <div className={styles.searchWrapper}>
                <svg className={styles.searchIcon} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                <input
                    type="text"
                    placeholder="Find something..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={styles.searchInput}
                />
            </div>

            <div className={styles.controls}>
                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className={styles.select}
                >
                    <option value="">Everything</option>
                    {categories.map(cat => (
                        <option key={cat.slug || cat} value={cat.slug || cat}>
                            {cat.name || cat}
                        </option>
                    ))}
                </select>

                <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className={styles.select}
                >
                    <option value="">Sort by...</option>
                    <option value="asc">Price: Low to High</option>
                    <option value="desc">Price: High to Low</option>
                </select>

                {(searchQuery || selectedCategory || sortOrder) && (
                    <button onClick={handleClear} className={styles.clearBtn}>
                        Start over
                    </button>
                )}
            </div>
        </div>
    );
};

export default SearchControls;

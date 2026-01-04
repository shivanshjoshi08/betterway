
import { BasketProvider } from './state/BasketState';
import { InventoryProvider } from './state/InventoryState';
import PageFrame from './ui/PageFrame';
import SearchControls from './ui/SearchControls';
import ItemGrid from './ui/ItemGrid';

function Storefront() {
  return (
    <BasketProvider>
      <InventoryProvider>
        <PageFrame>
          <div style={{ marginBottom: '2rem' }}>
            <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>New Stuff</h1>
            <p style={{ color: 'var(--color-text-muted)' }}>Things we think you'll like.</p>
          </div>
          <SearchControls />
          <ItemGrid />
        </PageFrame>
      </InventoryProvider>
    </BasketProvider>
  );
}

export default Storefront;

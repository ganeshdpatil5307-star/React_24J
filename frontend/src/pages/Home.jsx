import { useEffect, useState } from 'react';
import { getProducts } from '../api';
import { useCart } from '../CartContext';
import ProductCard from '../components/ProductCard';
import Spinner from '../components/Spinner';

export default function Home() {
  const { add } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [addingId, setAddingId] = useState(null);

  useEffect(() => {
    let active = true;
    setLoading(true);
    getProducts()
      .then((data) => {
        if (active) setProducts(data || []);
      })
      .catch((err) => {
        if (active) setError(err.message || 'Failed to load products');
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  async function handleAdd(productId) {
    setAddingId(productId);
    try {
      await add(productId);
    } catch (err) {
      setError(err.message || 'Failed to add to cart');
    } finally {
      setAddingId(null);
    }
  }

  if (loading) return <Spinner label="Loading products..." />;

  return (
    <div>
      <h1 className="page-title">Products</h1>
      {error && <div className="alert alert-error">{error}</div>}
      {products.length === 0 ? (
        <p className="empty-message">No products available.</p>
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAdd={handleAdd}
              adding={addingId === product.id}
            />
          ))}
        </div>
      )}
    </div>
  );
}

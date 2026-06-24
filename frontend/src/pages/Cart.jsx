import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../CartContext';
import Spinner from '../components/Spinner';

export default function Cart() {
  const { items, total, refresh, add, remove } = useCart();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [busyId, setBusyId] = useState(null);

  useEffect(() => {
    let active = true;
    setLoading(true);
    refresh()
      .catch((err) => {
        if (active) setError(err.message || 'Failed to load cart');
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [refresh]);

  async function handleAdd(id) {
    setBusyId(id);
    try {
      await add(id);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusyId(null);
    }
  }

  async function handleRemove(id) {
    setBusyId(id);
    try {
      await remove(id);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusyId(null);
    }
  }

  if (loading) return <Spinner label="Loading cart..." />;

  return (
    <div>
      <h1 className="page-title">Your Cart</h1>
      {error && <div className="alert alert-error">{error}</div>}

      {items.length === 0 ? (
        <div className="empty-cart">
          <p className="empty-message">Your cart is empty.</p>
          <Link to="/" className="btn btn-primary">
            Browse Products
          </Link>
        </div>
      ) : (
        <>
          <div className="cart-list">
            {items.map(({ product, quantity }) => (
              <div className="cart-item" key={product.id}>
                <img className="cart-thumb" src={product.image} alt={product.name} />
                <div className="cart-info">
                  <h3>{product.name}</h3>
                  <p className="product-price">${product.price.toFixed(2)}</p>
                </div>
                <div className="qty-controls">
                  <button
                    className="btn btn-outline"
                    onClick={() => handleRemove(product.id)}
                    disabled={busyId === product.id}
                  >
                    -
                  </button>
                  <span className="qty">{quantity}</span>
                  <button
                    className="btn btn-outline"
                    onClick={() => handleAdd(product.id)}
                    disabled={busyId === product.id}
                  >
                    +
                  </button>
                </div>
                <div className="line-total">
                  ${(product.price * quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <span>Total</span>
            <strong>${total.toFixed(2)}</strong>
          </div>
        </>
      )}
    </div>
  );
}

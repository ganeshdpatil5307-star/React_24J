import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { useCart } from '../CartContext';

const APP_NAME = import.meta.env.VITE_APP_NAME || 'ReactStoreApp';

export default function Navbar() {
  const { username, logout } = useAuth();
  const { count } = useCart();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        {APP_NAME}
      </Link>

      <div className="navbar-actions">
        <Link to="/db-demo" className="cart-link">
          DB Demo
        </Link>
        <Link to="/cart" className="cart-link">
          Cart
          {count > 0 && <span className="cart-badge">{count}</span>}
        </Link>
        {username && <span className="navbar-user">Hi, {username}</span>}
        <button className="btn btn-outline" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}

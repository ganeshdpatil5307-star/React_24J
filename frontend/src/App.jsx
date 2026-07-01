import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext';
import { CartProvider } from './CartContext';
import Navbar from './components/Navbar';
import DbStatusBanner from './components/DbStatusBanner';
import Login from './pages/Login';
import Home from './pages/Home';
import Cart from './pages/Cart';

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function Layout({ children }) {
  const { isAuthenticated } = useAuth();
  return (
    <>
      <DbStatusBanner />
      {isAuthenticated && <Navbar />}
      <main className="container">{children}</main>
    </>
  );
}

function AppRoutes() {
  return (
    <Layout>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <AppRoutes />
      </CartProvider>
    </AuthProvider>
  );
}

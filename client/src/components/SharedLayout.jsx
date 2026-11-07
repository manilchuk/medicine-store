import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useLogout } from '../hooks/useLogout';

export default function SharedLayout() {
  const { user } = useAuth();
  const logout = useLogout();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout.mutate(undefined, {
      onSettled: () => navigate('/login', { replace: true }),
    });
  };

  return (
    <div>
      <header style={{ padding: 16, borderBottom: '1px solid #eee' }}>
        <strong>Medicine Store</strong> | {user?.email}
        <button onClick={handleLogout} style={{ marginLeft: 16 }}>
          Logout
        </button>
      </header>
      <nav style={{ padding: 16, borderRight: '1px solid #eee', width: 200 }}>
        <div>
          <Link to="/">Dashboard</Link>
        </div>
        <div>
          <Link to="/orders">Orders</Link>
        </div>
        <div>
          <Link to="/products">Products</Link>
        </div>
        <div>
          <Link to="/customers">Customers</Link>
        </div>
        <div>
          <Link to="/suppliers">Suppliers</Link>
        </div>
      </nav>
      <main style={{ padding: 24 }}>
        <Outlet />
      </main>
    </div>
  );
}

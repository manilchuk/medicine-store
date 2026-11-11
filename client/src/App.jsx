import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import SharedLayout from './components/layout/SharedLayout';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import AllOrdersPage from './pages/AllOrdersPage';
import AllProductsPage from './pages/AllProductsPage';
import AllSuppliersPage from './pages/AllSuppliersPage';
import CustomersDataPage from './pages/CustomersDataPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<SharedLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="orders" element={<AllOrdersPage />} />
            <Route path="products" element={<AllProductsPage />} />
            <Route path="suppliers" element={<AllSuppliersPage />} />
            <Route path="customers" element={<CustomersDataPage />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

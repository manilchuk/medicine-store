import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div style={{ padding: 40, textAlign: 'center' }}>
      <h1>404</h1>
      <p>Page not found</p>
      <Link to="/">Go to Dashboard</Link>
    </div>
  );
}

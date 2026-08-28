import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Link } from 'react-router-dom';
import NavigationBar from './components/Navbar';
import Preloader from './components/Preloader';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Order from './pages/Order';
import FlavorDetails from './pages/FlavorDetails';

function PageLoaderWrapper({ children }) {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      <Preloader loading={loading} />
      <div style={{ visibility: loading ? 'hidden' : 'visible' }}>
        {children}
      </div>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <PageLoaderWrapper>
        <div className="min-h-screen d-flex flex-column justify-content-between bg-golden-light">
          <div>
            <NavigationBar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/order" element={<Order />} />
              <Route path="/flavor-details" element={<FlavorDetails />} />
            </Routes>
          </div>

          <footer className="py-5 bg-white border-top border-golden mt-5 text-center">
            <div className="container">
              <div className="d-flex justify-content-center align-items-center gap-3 mb-3">
                <img 
                  src="/sophia-logo.jpeg" 
                  alt="Sophia's Signature Bakes" 
                  className="rounded-circle shadow-sm border border-golden"
                  style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                />
                <div className="text-start">
                  <h4 className="fw-bold text-golden-dark mb-0 lh-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Sophia's Signature Bakes
                  </h4>
                  <small className="text-golden-accent fst-italic">
                    refined sweetness, perfected
                  </small>
                </div>
              </div>

              <p className="text-muted small mb-3 max-w-md mx-auto">
                Handcrafted custom cakes, small chops platters, puff puff packs, milky doughnuts & artisan pastries for your celebrations.
              </p>

              <div className="d-flex justify-content-center align-items-center gap-2 mb-3">
                <span className="badge bg-golden-subtle text-golden-dark px-3 py-2 rounded-pill border border-golden">
                  📞 WhatsApp / Call: <strong>09118784051</strong>
                </span>
              </div>

              <div className="d-flex justify-content-center gap-3 mb-3 small flex-wrap">
                <Link to="/" className="text-golden text-decoration-none fw-medium">Home</Link>
                <span className="text-muted">•</span>
                <Link to="/menu" className="text-golden text-decoration-none fw-medium">Menu & Pricing</Link>
                <span className="text-muted">•</span>
                <Link to="/flavor-details" className="text-golden text-decoration-none fw-medium">Signature Flavors</Link>
                <span className="text-muted">•</span>
                <Link to="/order" className="text-golden text-decoration-none fw-medium">Order on WhatsApp</Link>
              </div>

              <small className="text-muted">
                © {new Date().getFullYear()} Sophia's Signature Bakes. All rights reserved.
              </small>
            </div>
          </footer>
        </div>
      </PageLoaderWrapper>
    </Router>
  );
}

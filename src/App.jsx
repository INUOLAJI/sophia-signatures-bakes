import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Link } from 'react-router-dom';
import NavigationBar from './components/Navbar';
import Preloader from './components/Preloader';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Order from './pages/Order';
import FlavorDetails from './pages/FlavorDetails';
import CustomOrder from './pages/CustomOrder';
import { CartProvider, useCart } from './context/CartContext';
import { BsCart3 } from 'react-icons/bs';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeUp, staggerContainer, pageTransition } from './animations';

function PageTransition({ children }) {
  return (
    <motion.div
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {children}
    </motion.div>
  );
}

function PageLoaderWrapper({ children }) {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 480);
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

function FloatingCartButton() {
  const { totalItemCount, subtotal } = useCart();
  const location = useLocation();

  if (totalItemCount === 0 || location.pathname === '/order') return null;

  return (
    <AnimatePresence>
      <motion.div
        key="floating-cart"
        initial={{ opacity: 0, scale: 0.7, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.7, y: 40 }}
        transition={{ type: 'spring', stiffness: 280, damping: 22 }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        style={{ position: 'fixed', bottom: '1.5rem', right: '1.5rem', zIndex: 9990 }}
      >
        <Link
          to="/order"
          className="p-3 bg-golden-dark text-white rounded-pill shadow-lg d-flex align-items-center gap-3 text-decoration-none border border-golden"
        >
          <div className="position-relative d-flex align-items-center justify-content-center">
            <BsCart3 size={24} />
            <AnimatePresence mode="wait">
              <motion.span
                key={totalItemCount}
                initial={{ scale: 0.4, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.4, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger border border-light"
              >
                {totalItemCount}
              </motion.span>
            </AnimatePresence>
          </div>
          <div className="d-none d-sm-block text-start lh-1">
            <div className="fw-bold small">View Cart & Order</div>
            <small className="opacity-75" style={{ fontSize: '0.75rem' }}>₦{subtotal.toLocaleString()}</small>
          </div>
        </Link>
      </motion.div>
    </AnimatePresence>
  );
}

function AppRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/menu" element={<PageTransition><Menu /></PageTransition>} />
        <Route path="/custom-order" element={<PageTransition><CustomOrder /></PageTransition>} />
        <Route path="/order" element={<PageTransition><Order /></PageTransition>} />
        <Route path="/flavor-details" element={<PageTransition><FlavorDetails /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <CartProvider>
      <Router>
        <PageLoaderWrapper>
          <div className="min-h-screen d-flex flex-column justify-content-between bg-golden-light">
            <div>
              <NavigationBar />
              <AppRoutes />
            </div>

            <FloatingCartButton />

            {/* Animated Footer */}
            <motion.footer
              className="py-5 bg-white border-top border-golden mt-5 text-center"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <div className="container">
                <motion.div variants={fadeUp} className="d-flex justify-content-center align-items-center gap-3 mb-3">
                  <motion.img
                    src="/sophia-logo.jpeg"
                    alt="Sophia's Signature Bakes"
                    className="rounded-circle shadow-sm border border-golden"
                    style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                    whileHover={{ rotate: 10, scale: 1.12 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 14 }}
                  />
                  <div className="text-start">
                    <h4 className="fw-bold text-golden-dark mb-0 lh-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                      Sophia's Signature Bakes
                    </h4>
                    <small className="text-golden-accent fst-italic">refined sweetness, perfected</small>
                  </div>
                </motion.div>

                <motion.p variants={fadeUp} className="text-muted small mb-3 max-w-md mx-auto">
                  Handcrafted custom cakes, small chops platters, puff puff packs, milky doughnuts & artisan pastries for your celebrations.
                </motion.p>

                <motion.div variants={fadeUp} className="d-flex justify-content-center align-items-center gap-2 mb-3">
                  <span className="badge bg-golden-subtle text-golden-dark px-3 py-2 rounded-pill border border-golden">
                    📞 WhatsApp / Call: <strong>09118784051</strong>
                  </span>
                </motion.div>

                <motion.div variants={fadeUp} className="d-flex justify-content-center gap-3 mb-3 small flex-wrap">
                  {['/', '/menu', '/custom-order', '/flavor-details', '/order'].map((path, i) => {
                    const labels = ['Home', 'Menu & Pricing', 'Custom Cake Studio', 'Signature Flavors', 'View Cart / Order'];
                    return (
                      <React.Fragment key={path}>
                        <Link to={path} className="text-golden text-decoration-none fw-medium">{labels[i]}</Link>
                        {i < 4 && <span className="text-muted">•</span>}
                      </React.Fragment>
                    );
                  })}
                </motion.div>

                <motion.small variants={fadeUp} className="text-muted">
                  © {new Date().getFullYear()} Sophia's Signature Bakes. All rights reserved.
                </motion.small>
              </div>
            </motion.footer>
          </div>
        </PageLoaderWrapper>
      </Router>
    </CartProvider>
  );
}

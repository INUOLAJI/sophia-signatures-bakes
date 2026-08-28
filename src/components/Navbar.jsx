import React, { useState } from 'react';
import { Navbar, Nav, Container, Button, Badge } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { BsCart3 } from 'react-icons/bs';
import { motion, AnimatePresence } from 'framer-motion';
import { slideDown, navItem } from '../animations';

export default function NavigationBar() {
  const [expanded, setExpanded] = useState(false);
  const location = useLocation();
  const { totalItemCount } = useCart();

  const handleNavClick = () => setExpanded(false);

  const links = [
    { to: '/', label: 'Home' },
    { to: '/menu', label: 'Menu & Pricing' },
    { to: '/custom-order', label: 'Custom Order', badge: 'Bespoke' },
    { to: '/flavor-details', label: 'Signature Flavors' },
  ];

  return (
    <motion.div variants={slideDown} initial="hidden" animate="visible">
      <Navbar
        bg="white"
        expand="lg"
        sticky="top"
        className="shadow-sm py-2 border-bottom border-golden"
        expanded={expanded}
        onToggle={(isExpanded) => setExpanded(isExpanded)}
      >
        <Container>
          <Navbar.Brand
            as={Link}
            to="/"
            onClick={handleNavClick}
            className="d-flex align-items-center gap-2 text-decoration-none"
          >
            <motion.img
              src="/sophia-logo.jpeg"
              alt="Sophia's Signature Bakes Logo"
              className="rounded-circle shadow-sm border border-golden"
              style={{ width: '48px', height: '48px', objectFit: 'cover' }}
              whileHover={{ rotate: 8, scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 15 }}
            />
            <div className="d-flex flex-column">
              <span className="fw-bold text-golden-dark fs-5 lh-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                Sophia's Signature Bakes
              </span>
              <small className="text-golden-accent" style={{ fontSize: '0.7rem', letterSpacing: '0.5px' }}>
                refined sweetness, perfected
              </small>
            </div>
          </Navbar.Brand>

          {/* Mobile cart */}
          <div className="d-flex align-items-center gap-2 d-lg-none ms-auto me-2">
            <motion.div whileTap={{ scale: 0.92 }} whileHover={{ scale: 1.05 }}>
              <Link
                to="/order"
                className="btn btn-golden rounded-pill px-3 py-1 d-flex align-items-center gap-2 position-relative"
                onClick={handleNavClick}
              >
                <BsCart3 size={20} />
                <AnimatePresence mode="wait">
                  <motion.span
                    key={totalItemCount}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    className="badge rounded-pill bg-white text-golden-dark fw-bold"
                  >
                    {totalItemCount}
                  </motion.span>
                </AnimatePresence>
              </Link>
            </motion.div>
          </div>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto align-items-lg-center gap-2 mt-3 mt-lg-0">
              {links.map((link, i) => (
                <motion.div key={link.to} custom={i} variants={navItem} initial="hidden" animate="visible">
                  <Nav.Link
                    as={Link}
                    to={link.to}
                    className={`d-flex align-items-center gap-1 ${location.pathname === link.to ? 'text-golden fw-bold' : 'text-dark fw-medium'}`}
                    onClick={handleNavClick}
                  >
                    <span>{link.label}</span>
                    {link.badge && (
                      <span className="badge badge-gold-accent rounded-pill px-2" style={{ fontSize: '0.65rem' }}>
                        {link.badge}
                      </span>
                    )}
                  </Nav.Link>
                </motion.div>
              ))}

              {/* Desktop Cart */}
              <motion.div custom={links.length} variants={navItem} initial="hidden" animate="visible" whileTap={{ scale: 0.93 }} whileHover={{ scale: 1.04 }}>
                <Button
                  as={Link}
                  to="/order"
                  className="btn-golden rounded-pill px-4 ms-lg-2 d-none d-lg-flex align-items-center gap-2 position-relative shadow-sm"
                  onClick={handleNavClick}
                >
                  <BsCart3 size={20} />
                  <span>Cart</span>
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={totalItemCount}
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.5, opacity: 0 }}
                      className="badge rounded-pill bg-white text-golden-dark fw-bold ms-1"
                      style={{ fontSize: '0.85rem' }}
                    >
                      {totalItemCount}
                    </motion.span>
                  </AnimatePresence>
                </Button>
              </motion.div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </motion.div>
  );
}

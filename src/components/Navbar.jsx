import React, { useState } from 'react';
import { Navbar, Nav, Container, Button, Badge } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function NavigationBar() {
  const [expanded, setExpanded] = useState(false);
  const location = useLocation();
  const { totalItemCount } = useCart();

  const handleNavClick = () => setExpanded(false);

  return (
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
          <img 
            src="/sophia-logo.jpeg" 
            alt="Sophia's Signature Bakes Logo" 
            className="rounded-circle shadow-sm border border-golden"
            style={{ width: '48px', height: '48px', objectFit: 'cover' }}
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

        {/* Mobile quick cart icon visible on small screens next to toggle */}
        <div className="d-flex align-items-center gap-2 d-lg-none ms-auto me-2">
          <Link 
            to="/order" 
            className="btn btn-golden rounded-pill px-3 py-1 d-flex align-items-center gap-2 position-relative"
            onClick={handleNavClick}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="8" cy="21" r="1"/>
              <circle cx="19" cy="21" r="1"/>
              <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
            </svg>
            <span className="badge rounded-pill bg-white text-golden-dark fw-bold">
              {totalItemCount}
            </span>
          </Link>
        </div>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-lg-center gap-2 mt-3 mt-lg-0">
            <Nav.Link 
              as={Link} 
              to="/" 
              className={location.pathname === '/' ? 'text-golden fw-bold' : 'text-dark fw-medium'}
              onClick={handleNavClick}
            >
              Home
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/menu" 
              className={location.pathname === '/menu' ? 'text-golden fw-bold' : 'text-dark fw-medium'}
              onClick={handleNavClick}
            >
              Menu & Pricing
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/custom-order" 
              className={`d-flex align-items-center gap-1 ${location.pathname === '/custom-order' ? 'text-golden fw-bold' : 'text-dark fw-medium'}`}
              onClick={handleNavClick}
            >
              <span>Custom Order</span>
              <span className="badge badge-gold-accent rounded-pill px-2 py-0.5" style={{ fontSize: '0.65rem' }}>Bespoke</span>
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/flavor-details" 
              className={location.pathname === '/flavor-details' ? 'text-golden fw-bold' : 'text-dark fw-medium'}
              onClick={handleNavClick}
            >
              Signature Flavors
            </Nav.Link>

            {/* Desktop Cart Button with live Badge */}
            <Button 
              as={Link} 
              to="/order" 
              className="btn-golden rounded-pill px-4 ms-lg-2 d-none d-lg-flex align-items-center gap-2 position-relative shadow-sm"
              onClick={handleNavClick}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="8" cy="21" r="1"/>
                <circle cx="19" cy="21" r="1"/>
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
              </svg>
              <span>Cart</span>
              <span className="badge rounded-pill bg-white text-golden-dark fw-bold ms-1" style={{ fontSize: '0.85rem' }}>
                {totalItemCount}
              </span>
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
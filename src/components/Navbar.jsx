import React, { useState } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

export default function NavigationBar() {
  const [expanded, setExpanded] = useState(false);
  const location = useLocation();

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
              to="/flavor-details" 
              className={location.pathname === '/flavor-details' ? 'text-golden fw-bold' : 'text-dark fw-medium'}
              onClick={handleNavClick}
            >
              Signature Flavors
            </Nav.Link>
            <Button 
              as={Link} 
              to="/order" 
              className="btn-golden rounded-pill px-4 ms-lg-2"
              onClick={handleNavClick}
            >
              Order Now
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
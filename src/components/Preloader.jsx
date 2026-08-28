import React from 'react';

export default function Preloader({ loading }) {
  if (!loading) return null;

  return (
    <div 
      className="position-fixed top-0 start-0 w-100 h-100 bg-golden-light d-flex flex-column justify-content-center align-items-center" 
      style={{ zIndex: 9999, transition: 'opacity 0.5s ease' }}
    >
      <div className="position-relative d-flex justify-content-center align-items-center mb-3">
        <div 
          className="spinner-border" 
          role="status" 
          style={{ width: '6.5rem', height: '6.5rem', color: '#C58B35', borderWidth: '3px' }}
        >
          <span className="visually-hidden">Loading...</span>
        </div>
        
        <div className="position-absolute">
          <img 
            src="/sophia-logo.jpeg" 
            alt="Sophia's Signature Bakes" 
            className="rounded-circle shadow"
            style={{ width: '64px', height: '64px', objectFit: 'cover' }}
          />
        </div>
      </div>
      
      <h4 className="fw-bold text-golden-dark tracking-wide mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
        Sophia's Signature Bakes
      </h4>
      <small className="text-golden-accent fst-italic">refined sweetness, perfected...</small>
    </div>
  );
}
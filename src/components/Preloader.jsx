import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader({ loading }) {
  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="preloader"
          className="position-fixed top-0 start-0 w-100 h-100 bg-golden-light d-flex flex-column justify-content-center align-items-center"
          style={{ zIndex: 9999 }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.45, ease: 'easeInOut' } }}
        >
          <div className="position-relative d-flex justify-content-center align-items-center mb-3">
            {/* Spinning ring */}
            <motion.div
              className="spinner-border"
              role="status"
              style={{ width: '6.5rem', height: '6.5rem', color: '#C58B35', borderWidth: '3px' }}
              animate={{ rotate: 360 }}
              transition={{ duration: 1.1, repeat: Infinity, ease: 'linear' }}
            >
              <span className="visually-hidden">Loading...</span>
            </motion.div>

            {/* Logo pulse */}
            <motion.div
              className="position-absolute"
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            >
              <img
                src="/sophia-logo.jpeg"
                alt="Sophia's Signature Bakes"
                className="rounded-circle shadow"
                style={{ width: '64px', height: '64px', objectFit: 'cover' }}
              />
            </motion.div>
          </div>

          <motion.h4
            className="fw-bold text-golden-dark tracking-wide mb-1"
            style={{ fontFamily: "'Playfair Display', serif" }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
          >
            Sophia's Signature Bakes
          </motion.h4>

          <motion.small
            className="text-golden-accent fst-italic"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0.6, 1] }}
            transition={{ delay: 0.3, duration: 1.8, repeat: Infinity }}
          >
            refined sweetness, perfected...
          </motion.small>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

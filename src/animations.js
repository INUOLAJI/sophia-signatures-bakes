// Shared Framer Motion animation variants

export const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 },
  }),
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: (i = 0) => ({
    opacity: 1,
    transition: { duration: 0.45, ease: 'easeOut', delay: i * 0.07 },
  }),
};

export const fadeLeft = {
  hidden: { opacity: 0, x: -44 },
  visible: (i = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: i * 0.07 },
  }),
};

export const fadeRight = {
  hidden: { opacity: 0, x: 44 },
  visible: (i = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: i * 0.07 },
  }),
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: (i = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.48, ease: [0.22, 1, 0.36, 1], delay: i * 0.07 },
  }),
};

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
};

export const navItem = {
  hidden: { opacity: 0, y: -10 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.38, ease: 'easeOut', delay: i * 0.06 },
  }),
};

export const slideDown = {
  hidden: { opacity: 0, y: -28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

export const popIn = {
  hidden: { opacity: 0, scale: 0.65 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', stiffness: 320, damping: 22 },
  },
};

export const floatAnimation = {
  animate: {
    y: [0, -9, 0],
    transition: { duration: 3.2, repeat: Infinity, ease: 'easeInOut' },
  },
};

export const cardHover = {
  rest: { scale: 1, y: 0, boxShadow: '0 4px 12px rgba(100,56,14,0.07)' },
  hover: {
    scale: 1.026,
    y: -5,
    boxShadow: '0 18px 38px rgba(100,56,14,0.16)',
    transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
  },
};

// Page transition — used in App.jsx per route
export const pageTransition = {
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -14, transition: { duration: 0.28, ease: 'easeIn' } },
};

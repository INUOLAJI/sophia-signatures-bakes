// Shared Framer Motion animation variants

export const fadeUp = {
  hidden: { opacity: 0, y: 40 },
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
    transition: { duration: 0.5, ease: 'easeOut', delay: i * 0.08 },
  }),
};

export const fadeLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export const fadeRight = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: (i = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: i * 0.07 },
  }),
};

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

export const navItem = {
  hidden: { opacity: 0, y: -12 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut', delay: i * 0.07 },
  }),
};

export const slideDown = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export const popIn = {
  hidden: { opacity: 0, scale: 0.6 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', stiffness: 300, damping: 20 },
  },
};

export const floatAnimation = {
  animate: {
    y: [0, -8, 0],
    transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
  },
};

export const shimmerPulse = {
  animate: {
    opacity: [1, 0.7, 1],
    transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
  },
};

export const cardHover = {
  rest: { scale: 1, y: 0, boxShadow: '0 4px 12px rgba(100,56,14,0.08)' },
  hover: {
    scale: 1.025,
    y: -6,
    boxShadow: '0 16px 36px rgba(100,56,14,0.18)',
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
  },
};

export const buttonTap = {
  whileTap: { scale: 0.95 },
  whileHover: { scale: 1.04 },
};

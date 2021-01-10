export const container = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const item = {
  hidden: { scaleX: 0.8, opacity: 0 },
  show: { scaleX: 1, opacity: 1 },
};

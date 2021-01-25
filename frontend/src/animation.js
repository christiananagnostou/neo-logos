export const container = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

export const item = {
  hidden: { scaleX: 0.8, opacity: 0 },
  show: { scaleX: 1, opacity: 1 },
};

export const accInfoAnim = {
  hidden: {
    transition: { duration: 0.25, ease: "linear" },
    top: "-40vh",
  },
  show: {
    transition: { duration: 0.25, ease: "linear" },
    top: "1vh",
  },
  exit: {
    transition: { duration: 0.25, ease: "linear" },
    top: "-40vh",
  },
};

export const wordFormAnim = {
  hidden: {
    transition: { duration: 0.25, ease: "linear" },
    bottom: "-50vh",
    opacity: 0,
  },
  show: {
    transition: { duration: 0.25, ease: "linear" },
    bottom: "0vh",
    opacity: 1,
  },
  exit: {
    transition: { duration: 0.25, ease: "linear" },
    bottom: "-50vh",
    opacity: 0,
  },
};

export const fade = {
  hidden: {
    opacity: 1,
  },
  show: {
    opacity: 1,
  },
  exit: {
    opacity: 1,
  },
};

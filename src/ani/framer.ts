const CustomAni = {
  initial: { x: '-100%', opacity: 0.5 },
  show: { x: '0%', opacity: 1, transition: { duration: 0.5, ease: 'easeInOut' } },
  exit: { x: '100%', opacity: 0, transition: { duration: 0.6, ease: 'easeInOut' }, backgroundColor: 'red' },
};

export default CustomAni;

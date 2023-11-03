import styles from './Overlay.module.scss';

function Overlay({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      // Close the overlay when the background is clicked
      onClose();
    }
  };

  return (
    <div
      className={styles.overlay}
      onClick={handleOverlayClick}>
      <div className={styles.modal}>{children}</div>
    </div>
  );
}

export default Overlay;

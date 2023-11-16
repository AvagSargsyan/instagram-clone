import styles from './WindowHeader.module.scss';

const WindowHeader = ({ prevBtnAction, nextBtnAction, children }) => {
  return (
    <header className={styles.header}>
      <button
        onClick={prevBtnAction}
        className={styles.prevBtn}>
        <img
          src="/icons/left_arrow.png"
          alt="Back"
        />
      </button>
      <h2 className={styles.heading}>{children[0]}</h2>
      <button
        className={styles.nextBtn}
        onClick={nextBtnAction}>
        {children[1]}
      </button>
    </header>
  );
};

export default WindowHeader;

import styles from './NavigationBtn.module.scss';

function PrevButton({ type, action, className }) {
  return (
    <button
      className={`${styles.prevButton} ${className}`}
      onClick={action}>
      {type === 'LEFT' ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24">
          <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24">
          <path d="M7.33 24l-2.83-2.829 9.339-9.175-9.339-9.167 2.83-2.829 12.17 11.996z" />
        </svg>
      )}
    </button>
  );
}

export default PrevButton;

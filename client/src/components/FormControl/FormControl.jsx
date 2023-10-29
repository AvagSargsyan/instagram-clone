import styles from './FormControl.module.scss';

function FormControl({ type, name, value, onChange, className, children }) {
  return (
    <div className={`${styles.formControl} ${className}`}>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className={styles.input}
      />
      <span
        className={value ? styles.label : styles.placeholder}>
        {children}
      </span>
    </div>
  );
}

export default FormControl;

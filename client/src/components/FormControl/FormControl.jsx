import { useRef } from 'react';
import styles from './FormControl.module.scss';

function FormControl({ type, name, value, onChange, className, children }) {

  const inputRef = useRef();

  const focusOnInput = () => {
    inputRef.current.focus();
  }

  return (
    <div className={`${styles.formControl} ${className}`}>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className={styles.input}
        ref={inputRef}
      />
      <span
        onClick={focusOnInput}
        className={value ? styles.label : styles.placeholder}>
        {children}
      </span>
    </div>
  );
}

export default FormControl;

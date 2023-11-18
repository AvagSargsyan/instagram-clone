import React from 'react';
import styles from './Spinner.module.scss';

const Spinner = ({ size }) => (
  <div className={`${styles.spinner} ${size === 'small' ? styles.small : ''}`}>
    {[...Array(12)].map((_, index) => (
      <div key={index} />
    ))}
  </div>
);

export default Spinner;

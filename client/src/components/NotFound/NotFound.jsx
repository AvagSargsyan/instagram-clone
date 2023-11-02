import GuestHeader from '../GuestHeader/GuestHeader';
import { Link } from 'react-router-dom';
import styles from './NotFound.module.scss';

function NotFound() {
  return (
    <div className={styles.container}>
      <GuestHeader className={styles.header} />
      <section className={styles.main}>
        <h2 className={styles.heading}>Sorry, this page isn't available.</h2>
        <p className={styles.info}>
          The link you followed may be broken, or the page may have been
          removed.{' '}
          <Link
            to="/login"
            className={styles.link}>
            Go back to Instagram.
          </Link>
        </p>
      </section>
    </div>
  );
}

export default NotFound;

import GuestHeader from '../GuestHeader/GuestHeader';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import UserHeader from '../UserHeader/UserHeader';
import styles from './NotFound.module.scss';

function NotFound() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className={styles.container}>
      {user ? <UserHeader /> : <GuestHeader className={styles.header} />}
      <section className={styles.main}>
        <h2 className={styles.heading}>Sorry, this page isn't available.</h2>
        <p className={styles.info}>
          The link you followed may be broken, or the page may have been
          removed.{' '}
          <Link
            to={user ? '/' : '/login'}
            className={styles.link}>
            Go back to Instagram.
          </Link>
        </p>
      </section>
    </div>
  );
}

export default NotFound;

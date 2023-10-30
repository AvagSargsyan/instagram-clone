import { Link } from 'react-router-dom';
import styles from './GuestHeader.module.scss';
import InstagramLogo from '../InstagramLogo/InstagramLogo';

function GuestHeader({ className }) {
  return (
    <header className={`${styles.container} ${className}`}>
      <nav>
        <Link
          to="/login"
          className={`${styles.link} ${styles.instagramLogoLink}`}>
          <InstagramLogo className={styles.logo} size='small' />
        </Link>
        <ul>
          <li>
            <Link
              to="/login"
              className={`${styles.loginBtn} btn-default`}>
              Log in
            </Link>
          </li>
          <li>
            <Link
              to="/register"
              className={styles.signupBtn}>
              Sign up
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default GuestHeader;

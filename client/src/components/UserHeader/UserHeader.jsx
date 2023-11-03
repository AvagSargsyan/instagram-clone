import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../../features/auth/auth.slice';
import InstagramLogo from '../InstagramLogo/InstagramLogo';
import styles from './UserHeader.module.scss';

function UserHeader() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/login');
  };

  return (
    <header className={styles.container}>
      <nav>
        <Link
          to="/"
          className={`${styles.link} ${styles.instagramLogoLink}`}>
          <InstagramLogo
            className={styles.logo}
            size="small"
          />
        </Link>
        <ul>
          <li>
            <Link
              to="/profile"
              className={styles.userName}>
              {user && user.name}
            </Link>
          </li>
          <li>
            <button
              className={`${styles.logoutBtn} btn-default`}
              onClick={onLogout}>
              Log out
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default UserHeader;

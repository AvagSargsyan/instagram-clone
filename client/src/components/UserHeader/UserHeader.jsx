import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../../features/auth/auth.slice';
import InstagramLogo from '../InstagramLogo/InstagramLogo';
import styles from './UserHeader.module.scss';
import { FiPlus } from 'react-icons/fi';
import { useState } from 'react';
import Overlay from '../Overlay/Overlay';
import CreatePost from '../CreatePost/CreatePost';

function UserHeader() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const [isCreatePostWindowOpen, setIsCreatePostWindowOpen] = useState(false);

  const openCreatePostWindow = () => {
    setIsCreatePostWindowOpen(true);
  };

  const closeCreatePostWindow = () => {
    setIsCreatePostWindowOpen(false);
  };

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
            <button onClick={openCreatePostWindow}>
              <FiPlus />
            </button>
          </li>
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
      <Overlay
        isOpen={isCreatePostWindowOpen}
        onClose={closeCreatePostWindow}>
        <CreatePost />
      </Overlay>
    </header>
  );
}

export default UserHeader;

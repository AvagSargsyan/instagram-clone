import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../../features/auth/auth.slice';
import InstagramLogo from '../InstagramLogo/InstagramLogo';
import styles from './UserHeader.module.scss';
import { useEffect, useState } from 'react';
import Overlay from '../Overlay/Overlay';
import CreatePost from '../CreatePost/CreatePost';

function UserHeader() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const [isCreatePostWindowOpen, setIsCreatePostWindowOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();

  const openCreatePostWindow = () => {
    setIsCreatePostWindowOpen(true);
  };

  const closeCreatePostWindow = () => {
    setIsCreatePostWindowOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
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
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <button
              onClick={openCreatePostWindow}
              className={styles.addPostBtn}>
              <img
                src="/logos/add_icon.png"
                alt="Create post"
                className={styles.addPostIcon}
              />
            </button>
          </li>
          <li className={styles.navItem}>
            <button
              onClick={toggleDropdown}
              className={`${styles.dropdownBtn} ${
                isDropdownOpen ? styles.open : ''
              }`}>
              {user && (
                <img
                  className={`${styles.userProfilePicture} ${
                    isDropdownOpen || location.pathname === '/profile' ? styles.open : ''
                  }`}
                  src={user.profilePictureSrc}
                  alt={`User ${user.fullName}`}
                />
              )}
            </button>
          </li>
          {isDropdownOpen && (
            <ul className={styles.dropdownMenu}>
              <li className={styles.dropdownItem}>
                <Link
                  to="/profile"
                  className={styles.link}>
                  <img
                    src="/logos/user_icon.png"
                    alt="Profile"
                    className={styles.linkIcon}
                  />
                  Profile
                </Link>
              </li>
              <li className={styles.dropdownItem}>
                <button
                  className={styles.logoutBtn}
                  onClick={onLogout}>
                  Log Out
                </button>
              </li>
            </ul>
          )}
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

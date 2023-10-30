import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/auth.slice';

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
    <header>
      <div className="logo">
        <Link to="/">Instagram Clone</Link>
      </div>
      <ul>
        <li>
          <Link to="/">{user.name}</Link>
        </li>
      </ul>
      <button onClick={onLogout}>Log out</button>
    </header>
  );
}

export default UserHeader;

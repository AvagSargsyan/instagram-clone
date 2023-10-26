import { Link } from 'react-router-dom';

function GuestHeader() {
  return (
    <header>
      <div className="logo">
        <Link to="/login">Instagram Clone</Link>
      </div>
      <ul>
        <li>
          <Link to="/login">Log in</Link>
        </li>
        <li>
          <Link to="/register">Sign up</Link>
        </li>
      </ul>
    </header>
  );
}

export default GuestHeader;

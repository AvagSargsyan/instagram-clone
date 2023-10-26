import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { register, reset } from '../features/auth/auth.slice';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    fullName: '',
    email: '',
    password: ''
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      // todo: Handle error
    }

    if (isSuccess || user) {
      navigate('/');
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const { name, fullName, email, password } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = { name, email, password };

    dispatch(register(userData));
  };

  return (
    <section>
      <div>
        <h1>Instagram Clone</h1>
        <p>Sign up to see photos and videos from your friends.</p>
        <a href="#">Log in with Facebook</a>
        <div>or</div>
      </div>

      <div>
        <form onSubmit={onSubmit}>
          <div>
            <input
              type="email"
              placeholder="Mobile number or email address"
              id="email"
              name="email"
              value={email}
              onChange={onChange}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Full Name"
              id="fullName"
              name="fullName"
              value={fullName}
              onChange={onChange}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Username"
              id="name"
              name="name"
              value={name}
              onChange={onChange}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              id="password"
              name="password"
              value={password}
              onChange={onChange}
            />
          </div>
          <div>
            <button type="submit">
              {/* todo: Add a loading spinner */}
              {isLoading ? 'Loading...' : 'Sign up'}
            </button>
          </div>
        </form>
        <div>
          Have an account? <Link to="/login">Log in</Link>
        </div>
      </div>
    </section>
  );
}

export default Register;

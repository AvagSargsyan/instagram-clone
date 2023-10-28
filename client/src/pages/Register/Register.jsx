import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { register, reset } from '../../features/auth/auth.slice';
import styles from './Register.module.scss';

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
    <section className={styles.container}>
      <div className={styles.formContainer}>
        <h1 className={`${styles.logo} instagram-logo`}>
          <img
            className="instagram-logo-img"
            src="/logos/instagram_logo.png"
            alt="Instagram"
          />
          <span>clone</span>
        </h1>
        <form
          onSubmit={onSubmit}
          className={styles.form}>
          <p className={styles.mainText}>
            Sign up to see photos and videos from your friends.
          </p>
          <a
            href="#"
            className={`${styles.facebookBtn} log-in-with-facebook-btn`}>
            <img
              src="/logos/facebook_logo.png"
              alt="Facebook"
            />
            <span>Log in with Facebook</span>
          </a>
          <div className={styles.or}>
            <div className={styles.line}></div>
            <div className={styles.orText}>or</div>
          </div>
          <div className={styles.formControl}>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={onChange}
              className={styles.input}
            />
            <span
              htmlFor="email"
              className={email ? styles.label : styles.placeholder}>
              Mobile number or email address
            </span>
          </div>
          <div className={styles.formControl}>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={fullName}
              onChange={onChange}
              className={styles.input}
            />
            <span
              htmlFor="email"
              className={fullName ? styles.label : styles.placeholder}>
              Full Name
            </span>
          </div>
          <div className={styles.formControl}>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={onChange}
              className={styles.input}
            />
            <span
              htmlFor="email"
              className={name ? styles.label : styles.placeholder}>
              Username
            </span>
          </div>
          <div className={styles.formControl}>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={onChange}
              className={styles.input}
            />
            <span
              htmlFor="email"
              className={password ? styles.label : styles.placeholder}>
              Password
            </span>
          </div>
          <button
            type="submit"
            className={`${styles.signupBtn} btn-default`}>
            {/* todo: Add a loading spinner */}
            {isLoading ? 'Loading...' : 'Sign up'}
          </button>
        </form>
      </div>
      <div className={styles.loginPrompt}>
        Have an account?&nbsp;
        <Link
          to="/login"
          className={styles.login}>
          Log in
        </Link>
      </div>
    </section>
  );
}

export default Register;

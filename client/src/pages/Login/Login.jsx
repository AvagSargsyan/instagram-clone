import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login, reset } from '../../features/auth/auth.slice';
import FormControl from '../../components/FormControl/FormControl';
import styles from './Login.module.scss';
import InstagramLogo from '../../components/InstagramLogo/InstagramLogo';
import Spinner from '../../components/Spinner/Spinner';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (user !== null) {
      navigate('/');
    }

    if (isError) {
      console.log(message);
    }

    dispatch(reset());
  }, [user, isError, message, navigate, dispatch]);

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email,
      password
    };

    dispatch(login(userData));
  };

  return (
    <div className={styles.pageWrapper}>
      <section className={styles.container}>
        <div className={styles.formContainer}>
          <InstagramLogo className={styles.logo} />
          <form
            onSubmit={onSubmit}
            className={styles.form}>
            <FormControl
              type="email"
              name="email"
              value={email}
              onChange={onChange}>
              Phone number, username or email address
            </FormControl>
            <FormControl
              type="password"
              name="password"
              value={password}
              onChange={onChange}>
              Password
            </FormControl>
            <button
              type="submit"
              className={`btn-default ${styles.loginBtn}`}>
              {isLoading ? <Spinner size="small" /> : 'Log in'}
            </button>
            <div className={styles.or}>
              <div className={styles.line}></div>
              <div className={styles.orText}>or</div>
            </div>
            <a
              href="#"
              className={styles.facebookBtn}>
              <img
                src="/icons/facebook_logo_blue.png"
                alt="Facebook"
              />
              <span>Log in with Facebook</span>
            </a>
            <a
              href="#"
              className={styles.forgotPwdLink}>
              Forgotten your password?
            </a>
          </form>
        </div>
        <div className={styles.signupPrompt}>
          Don't have an account?&nbsp;
          <Link
            to="/register"
            className={styles.signup}>
            Sign up
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Login;

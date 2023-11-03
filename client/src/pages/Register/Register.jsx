import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { register, reset } from '../../features/auth/auth.slice';
import styles from './Register.module.scss';
import InstagramLogo from '../../components/InstagramLogo/InstagramLogo';
import FormControl from '../../components/FormControl/FormControl';

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

  const { name, email, fullName, password } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = { name, email, fullName, password };

    dispatch(register(userData));
  };

  return (
    <section className={styles.container}>
      <div className={styles.formContainer}>
        <InstagramLogo className={styles.logo} />
        <form
          onSubmit={onSubmit}
          className={styles.form}>
          <p className={styles.mainText}>
            Sign up to see photos and videos from your friends.
          </p>
          <a
            href="#"
            className={`btn-default ${styles.facebookBtn}`}>
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
          <FormControl
            type="email"
            name="email"
            value={email}
            onChange={onChange}>
            Mobile number or email address
          </FormControl>
          <FormControl
            type="text"
            name="fullName"
            value={fullName}
            onChange={onChange}>
            Full Name
          </FormControl>
          <FormControl
            type="text"
            name="name"
            value={name}
            onChange={onChange}>
            Username
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
            className={`btn-default ${styles.signupBtn}`}>
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

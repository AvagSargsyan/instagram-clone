import { useState } from "react";
import { Link } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    // todo: Add the login logic
  };

  return (
    <section>
      <h1>Instagram Clone</h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Phone number, username or email address"
            className="form-control"
            id="email"
            name="email"
            value={email}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            className="form-control"
            id="password"
            name="password"
            value={password}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <button
            type="submit"
            className="btn btn-block">
            Log in
          </button>
        </div>
      </form>
      <div>
        <dir>or</dir>
        <a href="#">Log in with Facebook</a>
        <a href="#">Forgotten your password?</a>
      </div>
      <div>
        <span>Don't have an account?</span>
        <Link to="/register">Sign up</Link>
      </div>
    </section>
  );
}

export default Login;

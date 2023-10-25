import { useState } from 'react';
import { Link } from 'react-router-dom';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    fullName: '',
    email: '',
    password: ''
  });

  const { name, fullName, email, password } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
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
            <button type="submit">Sign up</button>
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

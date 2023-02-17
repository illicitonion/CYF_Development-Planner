import React, { useState } from "react";
import { Link } from "react-router-dom";

function Login({ setAuth }) {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const { email, password } = inputs;

  const handleChange = (e) => {
    if (e.target.name === "email") {
      setInputs({ ...inputs, email: e.target.value.toLowerCase() });
    } else {
      setInputs({ ...inputs, password: e.target.value });
    }
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { email, password };
      const response = await fetch("/authentication/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const parseRes = await response.json();
      if (parseRes.jwtToken) {
        localStorage.setItem("token", parseRes.jwtToken);

        setAuth(true);
      } else {
        setAuth(false);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <>
      <section>
        <form onSubmit={onSubmitForm} className="form">
          <h1>Login</h1>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={email.toLowerCase()}
            onChange={(e) => handleChange(e)}
          />
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => handleChange(e)}
          />
          <div className="buttons">
            <button>Login</button>
          </div>
          <Link to="/register" className="form-link">
            Sign Up
          </Link>
        </form>
      </section>
    </>
  );
}

export default Login;

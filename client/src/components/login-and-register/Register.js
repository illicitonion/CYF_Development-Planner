import React, { useState } from "react";
import { Link } from "react-router-dom";

function Register({ setAuth }) {
  const [inputs, setInputs] = useState({
    fname: "",
    lname: "",
    username: "",
    email: "",
    password: "",
    role: "",
  });

  const { fname, lname, username, email, password, role } = inputs;

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();

    try {
      const lowerEmail = email.toLowerCase();
      const body = {
        fname,
        lname,
        username,
        email: lowerEmail,
        password,
        role,
      };
      const response = await fetch("/authentication/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const parseRes = await response.json();
      localStorage.setItem("token", parseRes.jwtToken);

      setAuth(true);
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <>
      <section className="form-container">
        <h1>Signup</h1>
        <form onSubmit={onSubmitForm} className="form">
          <h1>Sign Up</h1>
          <label htmlFor="fname">First Name</label>
          <input
            id="fname"
            type="text"
            name="fname"
            value={fname}
            onChange={(e) => handleChange(e)}
            required
          />
          <label htmlFor="lname">last name</label>
          <input
            id="lname"
            type="text"
            name="lname"
            value={lname}
            onChange={(e) => handleChange(e)}
            required
          />
          <label htmlFor="username">username</label>
          <input
            id="username"
            type="text"
            name="username"
            value={username}
            onChange={(e) => handleChange(e)}
            required
            minLength="3"
          />
          <label htmlFor="password">password</label>
          <input
            id="password"
            type="password"
            name="password"
            value={password}
            onChange={(e) => handleChange(e)}
            required
            minLength="3"
          />

          <label htmlFor="email">email</label>
          <input
            id="email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => handleChange(e)}
            required
          />

          <fieldset>
            <legend>Your CYF role:</legend>

            <label htmlFor="student">
              trainee{" "}
              <input
                id="student"
                type="radio"
                name="role"
                value="student"
                onChange={(e) => handleChange(e)}
              />
            </label>

            <label htmlFor="mentor">
              mentor{" "}
              <input
                id="mentor"
                type="radio"
                name="role"
                value="mentor"
                onChange={(e) => handleChange(e)}
              ></input>
            </label>
          </fieldset>
          <div className="buttons">
            <button>submit</button>
          </div>
          <Link to="/login" className="form-link">
            Login
          </Link>
        </form>
      </section>
    </>
  );
}

export default Register;

import React from "react";
import "./LoginPage.css";

const LoginPage = () => {
  return (
    <div className="form-container">
      <h1>Login</h1>
      <form className="login-form">
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" required />

        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" required />

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;

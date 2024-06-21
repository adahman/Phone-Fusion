import React, { useState } from "react";
import "./RegisterPage.css";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
      const response = await fetch("http://localhost:8080/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });
      const result = await response.json();
      if (response.ok) {
        alert("Registration successful!");
      } else {
        alert(result.error || "Registration failed!");
      }
    } catch (error) {
      console.error("Error registering user:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="form-container">
      <h1>Register</h1>
      <form className="register-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          required
          onChange={handleChange}
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          required
          onChange={handleChange}
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          required
          onChange={handleChange}
        />

        <label htmlFor="confirm-password">Confirm Password:</label>
        <input
          type="password"
          id="confirm-password"
          name="confirmPassword"
          required
          onChange={handleChange}
        />

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;

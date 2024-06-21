import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AboutPage from "./pages/AboutPage";
import DefaultPhonePage from "./pages/DefaultPhonePage";
import CartPage from "./pages/CartPage";
import NavBar from "./components/NavBar";
import VideoModal from "./components/VideoModal";
import "./index.css";

const App = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const isFirstVisit = localStorage.getItem("firstVisit") === null;
    if (isFirstVisit) {
      setShowModal(true);
      localStorage.setItem("firstVisit", "no");
    }
  }, []);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <Router>
      <NavBar />
      <main>
        <Routes>
          <Route path="/" element={<DefaultPhonePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/phones" element={<DefaultPhonePage />} />
          <Route path="/cart" element={<CartPage />} />{" "}
        </Routes>
        {showModal && <VideoModal onClose={handleCloseModal} />}
      </main>
    </Router>
  );
};

export default App;

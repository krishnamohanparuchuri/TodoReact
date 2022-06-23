import React from "react";
import "./HomePage.css";
import logo from "../assets/todo.svg";
import { Link } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

const HomePage = () => {
  return (
    <>
      <Header />
      <section className="home-container">
        <div className="home-container__left">
          <img className="home-container__logo" src={logo} alt="todoimage" />
        </div>
        <div className="home-container__right">
          <h1 className="home-container__heading">
            Manage Your Daily Activities
          </h1>
          <p className="home-container__subheading">Register an Account</p>
          <div className="home-container__links">
            <p>
              Hi <Link to="/login">Sign In</Link> or{" "}
              <Link to="/register">Register</Link>{" "}
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default HomePage;

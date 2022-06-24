import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LoginPage.css";
import logo from "../assets/helpfulsignin.svg";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Loading from "../components/Loading/Loading";
import ErrorMessage from "../components/MessageToast/ErrorMessage";
import { LoginUserInfo } from "../types";

const LoginPage = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState<LoginUserInfo>();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [repeatPassword, setRepeatPassword] = useState<string>("");
  const [isLoading,setIsLoading]= useState<boolean>(false);

  if (localStorage.getItem("TODO_TOKEN_JWT") === null) {
    localStorage.setItem("TODO_TOKEN_JWT", "");
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.name === "userName") {
      setUserName(e.target.value);
    }
    if (e.target.name === "password") {
      setPassword(e.target.value);
    }
    if (e.target.name === "repeatPassword") {
      setRepeatPassword(e.target.value);
    }
  };

  const loginUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("button clicked");
    setIsLoading(true);
    const response = await fetch(
      `https://todowebapikrishna.azurewebsites.net/api/users/authenticate`,
      {
        method: "POST",
        body: JSON.stringify({
          userName,
          password,
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response);
    const data = await response.json();
    console.log(data);
    if (response.status === 200) {
      localStorage.setItem("TODO_TOKEN_JWT", JSON.stringify(data.token));
      setIsLoading(false);
      setUserName("");
      setPassword("");
      navigate(`/user-info/${data.id}`);
    } else {
      setIsLoading(false);
      setErrorMessage("somthing went wrong, Try again");
      setTimeout(() => {
        setErrorMessage("");
      }, 4000);
    }
  };
  useEffect(() => {}, []);
  return (
    <>
      <Header />
      <section className="loginpage-container">
        <div className="loginpage-container__left">
          <img
            className="loginpage-container__logo"
            src={logo}
            alt="accesslogo"
          />
        </div>
        {
          isLoading ? <Loading /> :(
        <div className="loginpage-container__right">
        <h2 className="loginpage-container__info">Login with Credentials</h2>
        {errorMessage && <ErrorMessage message={errorMessage} />}
        <form onSubmit={(e) => loginUser(e)} className="form-container">
          <label htmlFor="title" id="userName">
            UserName
          </label>
          <br />
          <input
            type="text"
            name="userName"
            value={userName}
            id="txtLoginUserName"
            placeholder="enter the username..."
            onChange={handleChange}
          />
          <br />
          <label htmlFor="password" id="password">
            Password
          </label>
          <br />
          <input
            type="password"
            name="password"
            value={password}
            placeholder="choose password ..."
            id="txtLoginPassword"
            onChange={handleChange}
          />
          <br />

          <label htmlFor="repeatPassword" id="repeatPassword">
            Repeat Password
          </label>
          <br />
          <input
            type="password"
            name="repeatPassword"
            value={repeatPassword}
            placeholder="Repeat password..."
            id="txtLoginRepeatPassword"
            onChange={handleChange}
          />
          <br />
          <button
            value="submit"
            id="btnAddTodo"
            className="form-button"
            disabled={!userName || !password || !repeatPassword}
          >
            Login
          </button>
          <Link
            to="/"
            className="form-link"
          >
            Home
          </Link>
        </form>
        </div>
        )}
      </section>
      <Footer />
    </>
  );
};

export default LoginPage;

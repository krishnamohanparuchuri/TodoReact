import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { Link,useNavigate } from "react-router-dom";
import "./RegisterPage.css";
import logo from "../assets/Login.svg";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Loading from "../components/Loading/Loading";
import ErrorMessage from "../components/MessageToast/ErrorMessage";
import SuccessMessage from "../components/MessageToast/SuccessMessage";
import { RegisterUserInfo } from "../types";

const RegisterPage = () => {
  const navigate = useNavigate();
  const initialState = {
    userName: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };
  const [newuser, setNewUser] = useState<RegisterUserInfo>(initialState);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading,setIsLoading]= useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setNewUser({ ...newuser, [name]: value });
  };

  const registerUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      newuser.email === "" ||
      newuser.userName === "" ||
      newuser.firstName === "" ||
      newuser.lastName === "" ||
      newuser.password === ""
    ) {
      return;
    }
    setIsLoading(true);
    const response = await fetch(
      `https://todowebapikrishna.azurewebsites.net/api/users/register`,
      {
        method: "POST",
        body: JSON.stringify(newuser),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data);
    if (response.status === 200) {
      setIsLoading(false);
      setSuccessMessage(`User account with ${data.userName}  been created`);
      setTimeout(() => {
        setSuccessMessage("");
        navigate('/login')
      },4000);
      setNewUser(initialState);
    } else {
      setIsLoading(false);
      setErrorMessage("somthing went wrong, Try again");
      setTimeout(() => {
        setErrorMessage("");
      });
    }
  };
  return (
    <>
      <Header />
      <section className="registerpage-container">
        <div className="registerpage-container__left">
          <img
            className="registerpage-container__logo"
            src={logo}
            alt="accesslogo"
          />
        </div>
        {
          isLoading ? <Loading /> : (
            <div className="registerpage-container__right">
        <h1 className="registerpage-container__info">Register Account</h1>

        {successMessage && <SuccessMessage message={successMessage} />}
        {errorMessage && <ErrorMessage message={errorMessage} />}
        <form onSubmit={(e) => registerUser(e)} className="form-container">
          <label htmlFor="title" id="userName">
            UserName
          </label>
          <br />
          <input
            type="text"
            name="userName"
            value={newuser.userName}
            id="txtUserUserName"
            placeholder="enter the username..."
            onChange={handleChange}
          />
          <br />
          <label htmlFor="firstName" id="firstName">
            FirstName
          </label>
          <br />
          <input
            type="text"
            name="firstName"
            value={newuser.firstName}
            placeholder="enter Firstname..."
            id="txtUserFirstName"
            onChange={handleChange}
          />
          <br />

          <label htmlFor="lastName" id="lastName">
            LastName
          </label>
          <br />
          <input
            type="text"
            name="lastName"
            value={newuser.lastName}
            placeholder="enter Lastname..."
            id="txtUserLastName"
            onChange={handleChange}
          />
          <br />

          <label htmlFor="email" id="email">
            Email
          </label>
          <br />
          <input
            type="email"
            name="email"
            value={newuser.email}
            placeholder="Enter email..."
            id="txtUserEmail"
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
            value={newuser.password}
            placeholder="Enter password..."
            id="txtUserPassword"
            onChange={handleChange}
          />
          <br />
          <button
            value="submit"
            id="btnAddTodo"
            className="form-button"
            disabled={
              !newuser.userName ||
              !newuser.firstName ||
              !newuser.lastName ||
              !newuser.email ||
              !newuser.password
            }
          >
            Register
          </button>
          <Link
            to="/"
            className="form-link"
          >
            Home
          </Link>
        </form>
        </div>
        )
        }
        
      </section>
      <Footer />
    </>
  );
};

export default RegisterPage;

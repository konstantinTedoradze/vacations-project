import { ChangeEvent } from "react";
import { useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import "./Register.css";
import { useDispatch } from "react-redux";
import { ActionType } from "../../redux/action-type";
import { setAuthToken } from "../../utils/constants";

export default function Register(): JSX.Element {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const history = useHistory();
  const dispatch = useDispatch();

  const onUserNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  const onPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const onUserFirstNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFirstName(event.target.value);
  };

  const onUserLastNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLastName(event.target.value);
  };

  const validateRequered = () => {
    if (
      userName === null ||
      userName === "" ||
      password === null ||
      password === "" ||
      firstName === null ||
      firstName === "" ||
      lastName === null ||
      lastName === ""
    ) {
      setErrorMessage("Please fill all  empty fields");
      return false;
    }
    setErrorMessage("");
    return true;
  };
  const validateLength = () => {
    if (
      (userName.length < 15 && userName.length > 5) &&
        (password.length < 15 && password.length > 5) &&
        (firstName.length < 15 && firstName.length > 5) &&
        (lastName.length < 15 && lastName.length > 5)
    ) {
      setErrorMessage("");
      return true;
    }
    setErrorMessage("Characters in each field min 5 And max 15");
    return false;
  };

  const onRegister = async (e: any) => {
    e.preventDefault();
    if (validateRequered() && validateLength()) {
      try {
        const response = await axios.post(
          "http://localhost:3001/users/register",
          { userName, password, firstName, lastName }
        );
        if (response.status === 200) {
          setAuthToken(response.data.token);
          localStorage.setItem("token", JSON.stringify(response.data.token));
          localStorage.setItem("user", JSON.stringify(response.data.userData));
          dispatch({
            type: ActionType.LoginUserDetails,
            payload: response.data,
          });
          history.push("/home");
        } else {
          throw new Error("Invalid userType");
        }
      } catch (error) {
        console.log(error);
        alert("Invalid userName or password");
      }
    }
  };

  return (
    <div className="register">
      <div className="registerContainer">
        <form onSubmit={onRegister}>
          <h2>Registration</h2>
          <label>*</label>
          <input
            type="text"
            name="userName"
            placeholder="Username"
            onChange={onUserNameChange}
          />
          <br />
          <label>*</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={onPasswordChange}
          />
          <br />
          <label>*</label>
          <input
            type="text"
            name="firstName"
            placeholder="Firstname"
            onChange={onUserFirstNameChange}
          />
          <br />
          <label>*</label>
          <input
            type="text"
            name="lastName"
            placeholder="Lastname"
            onChange={onUserLastNameChange}
          />
          <br />
          <div style={{ height: "30px", color: "red" }}>
            {errorMessage !== "" && <p>{errorMessage}</p>}
          </div>
          <button type="submit" name="submit">
            Register
          </button>
          <Link to="/login">Already User ? Login</Link>
        </form>
      </div>
    </div>
  );
}

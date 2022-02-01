import { ChangeEvent } from "react";
import { useState } from "react";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";
import "./Login.css";
import { useDispatch } from "react-redux";
import { ActionType } from "../../redux/action-type";
import { setAuthToken } from "../../utils/constants";

export default function Login(): JSX.Element {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const history = useHistory();
  const dispatch = useDispatch();

  const onUserNameChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  const onPasswordChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const validateReqmuered = () => {
    if (
      userName === null ||
      userName === "" ||
      password === null ||
      password === ""
    ) {
      setMessage("Please fill all  empty fields");
      return false;
    }
    setMessage("");
    return true;
  };
 

  const onLogin = async (event: any) => {
    event.preventDefault();
    
    if (validateReqmuered()) {
      try {
        const response = await axios.post("http://localhost:3001/users/login", {
          userName,
          password,
        });


        if (response.status === 200) {
          setAuthToken(response.data.token);
          localStorage.setItem("token", JSON.stringify(response.data.token));
          localStorage.setItem("user", JSON.stringify(response.data.userData));
          dispatch({
            type: ActionType.LoginUserDetails,
            payload: response.data,
          });
          history.push("/home");
        }
      } catch (e) {
        console.error(e);
        alert("Invalid userName or password");
      }
    }
  };

  return (
    <div className="login">
      <form onSubmit={onLogin}>
        <h1>Your Vacation Starts Here!</h1>
        <div className="loginContainer">
          <label>*</label>
          <input
            type="text"
            name="userName"
            placeholder="Username"
            onChange={onUserNameChanged}
          />
          <br />
          <label>*</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={onPasswordChanged}
          />
          <br />
          <div style={{ height: "30px", color: "red"}}>
            {message !== "" && <p>{message}</p>}
          </div>
          <button type="submit" name="submit">
            LOGIN
          </button>

          <Link to="/register">New User ? Register</Link>
        </div>
      </form>
    </div>
  );
}

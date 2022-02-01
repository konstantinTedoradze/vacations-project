import { useSelector, useDispatch } from "react-redux";
import { AppState } from "../../redux/app-state";
import { Link, useHistory } from "react-router-dom";
import "./Header.css";
import { FaHome } from "react-icons/fa";
import { ActionType } from "../../redux/action-type";

function Header() {
  const userDetails = useSelector((state: AppState) => state.userDetails);
  const dispatch = useDispatch();
  const history = useHistory();

  const onLogOut = () => {
    dispatch({ type: ActionType.LogOut });
    history.push("/login");
  };

  const userHeader = () => {
    return (
      <div className="header">
        <div className="userHeader">
          <Link to="/home">
            <FaHome className="obserVacation" />
          </Link>

          <div className="leftSide">
            <h4>Hello, {userDetails.first_name}!</h4>
            <button onClick={onLogOut}>Log out</button>
          </div>
        </div>
      </div>
    );
  };

  const adminHeader = () => {
    return (
      <div className="header">
        <div className="leftSide">
          <h4>Hello, Admin!</h4>
          <button className="logOut" onClick={onLogOut}>Log out</button>
        </div>

        <Link to="/home">
          <FaHome className="obserVacation" />
        </Link>

        <div className="rightSide">
          <Link to="/charts">
            <img
              src="https://icons-for-free.com/iconfiles/png/512/bar+chart+black+background+business+data+diagram+graph-1320086870657814851.png"
              alt="statistic chart"
            />
          </Link>

          <Link to="/addVacation">
            <button>Add Vacation</button>
          </Link>
        </div>
      </div>
    );
  };

  return (
    <div>
      {userDetails &&
        Object.keys(userDetails).length !== 0 &&
        userDetails.constructor === Object && (
          <div>
            {userDetails.user_type === "ADMIN" ? adminHeader() : userHeader()}
          </div>
        )}
    </div>
  );
}

export default Header;

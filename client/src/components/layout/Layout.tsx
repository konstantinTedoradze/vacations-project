import { Redirect, Route, Switch } from "react-router-dom";
import Login from "../login/Login";
import Register from "../register/Register";
import { VacationsContainer } from "../home/VacationsContainer";
import "./Layout.css";
import ManageVacations from "../admin/manageVacations/ManageVacations";
import Header from "../header/Header";
import BarChart from "../barChart/BarChart";
import { useEffect } from "react";
import { setAuthToken } from "../../utils/constants";
import { useDispatch } from "react-redux";
import { ActionType } from "../../redux/action-type";
import { useLocation } from "react-router-dom";
import EditProfile from "../editProfile/EditProfile";

function Layout() {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    // update redux with localstorage values on page load
    const existingToken = JSON.parse(localStorage.getItem("token") || "{}");
    const loggedUser = JSON.parse(localStorage.getItem("user") || "{}");
    if (existingToken && loggedUser) {
      setAuthToken(existingToken);
      const payload = {
        token: existingToken,
        userData: loggedUser,
      };
      dispatch({ type: ActionType.LoginUserDetails, payload: payload });
    }
  }, [location.pathname]);

  return (
    <>
      <Header />

      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/home">
          <VacationsContainer />
        </Route>
        <Route path="/addVacation">
          <ManageVacations />
        </Route>
        <Route path="/editVacation/:id">
          <ManageVacations />
        </Route>
        <Route path="/editProfile">
          <EditProfile />
        </Route>
        <Route path="/charts">
          <BarChart />
        </Route>
        <Redirect from="/*" to="/Login" exact/>
      </Switch>
    </>
  );
}

export default Layout;

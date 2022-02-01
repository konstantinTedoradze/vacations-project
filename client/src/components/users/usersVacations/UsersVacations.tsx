import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import UserCard, { IUserVacation } from "../userCard/UserCard";
import * as vacationsAction from "../../../redux/action";
import "./UsersVacations.css";
import { Link } from "react-router-dom";

const UsersVacations = (): JSX.Element => {
  const dispatch = useDispatch();
  const vacations = useSelector((state: RootState) => state.usersVacations);
  const user = useSelector((state: RootState) => state.userDetails);
  //   console.log(user);

  useEffect(() => {
    if (user) {
      dispatch(vacationsAction.getUserVacationsData());
    }
  }, [user]);

  return (
    <div className="adminPage">
      <h1>Obser Vacation</h1>
      <Link to="/editProfile">
         <button className="editProfileButton">Edit Profile</button>
      </Link>
      <div className="vacationsContainer">
        <div className="vacation">
          {vacations.map((vacation: IUserVacation) => (
            <UserCard
              key={vacation.id}
              id={vacation.id}
              description={vacation.description}
              destination={vacation.destination}
              picture={vacation.picture}
              from_date={vacation.from_date.split("T")[0]}
              to_date={vacation.to_date.split("T")[0]}
              price={vacation.price}
              followers={vacation.followers}
              status={vacation.status}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UsersVacations;

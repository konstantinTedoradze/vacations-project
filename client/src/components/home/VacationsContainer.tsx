import { useSelector } from "react-redux";
import { AppState } from "../../redux/app-state";
import AdminVacations from "../admin/adminVacations/AdminVacations";
import UsersVacations from "../users/usersVacations/UsersVacations";
import "./VacationsContainer.css";

export const VacationsContainer = (): JSX.Element => {
  const userDetails = useSelector((state: AppState) => state.userDetails);
  // console.log(userDetails.user_type, "userdetailssssssss");

  return (
    <div>
      {userDetails &&
      Object.keys(userDetails).length !== 0 &&
      userDetails.constructor === Object &&
      userDetails.user_type === "ADMIN" ? (
        <AdminVacations />
      ) : (
        <UsersVacations />
      )}
    </div>
  );
};

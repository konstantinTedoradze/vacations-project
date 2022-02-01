import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminCard, { IVacations } from "../adminCard/AdminCard";
import "./AdminVacations.css";
import * as vacationsAction from "../../../redux/action";
import { RootState } from "../../../redux/store";



function AdminVacations() {
  
  const dispatch = useDispatch();
  const vacations = useSelector((state: RootState) => state.vacations);

  useEffect(() => {
    dispatch(vacationsAction.getVacationsData());
  }, []);

  return (
    <div className="adminPage">
      
      <h1>Obser Vacation</h1>

      <div className="vacationsContainer">
        <div className="vacation">
          {vacations.map((vacation: IVacations) => (
            <AdminCard
              key={vacation.id}
              id={vacation.id}
              description={vacation.description}
              destination={vacation.destination}
              picture={vacation.picture}
              from_date={vacation.from_date.split("T")[0]}
              to_date={vacation.to_date.split("T")[0]}
              price={vacation.price}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminVacations;

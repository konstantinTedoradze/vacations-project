import "./UserCard.css";
import { FaHeart } from "react-icons/fa";
import { AppState } from "../../../redux/app-state";
import { useDispatch, useSelector } from "react-redux";
import * as vacationsAction from "../../../redux/action";
import axios from "axios";

export interface IUserVacation {
  id: number;
  description: string;
  destination: string;
  picture: string;
  from_date: string;
  to_date: string;
  price: number;
  followers: number;
  status: number;
}

function UserCard(props: IUserVacation): JSX.Element {
  const userDetails = useSelector((state: AppState) => state.userDetails);
  const dispatch = useDispatch();
  const url = 'http://localhost:3001/upload/';

  function formatDate(date: any) {
    var thisDate = date.split("-");
    var newDate = [thisDate[2], thisDate[1], thisDate[0]].join("/");
    return newDate;
  }


  const followVacation = async () => {
    const body = {
      // userId: userDetails.id,
      vacationId: props.id,
    };
    try {
      const response = await axios.post(
        `http://localhost:3001/userVacations/follow`,
        body
      );

      if (response.status === 200) {
        dispatch(vacationsAction.getUserVacationsData());
      }
    } catch (e) {
      console.error(e);
      alert("follow is Invalid");
    }
  };
  const unfollowVacation = async () => {
    const body = {
      // userId: userDetails.id,
      vacationId: props.id,
    };
    try {
      const response = await axios.post(
        `http://localhost:3001/userVacations/unfollow`,
        body
      );

      if (response.status === 200) {
        dispatch(vacationsAction.getUserVacationsData());
      }
    } catch (e) {
      console.error(e);
      alert("unfollow is Invalid");
    }
  };

  return (
    <div className="userCard">
      <h2>{props.destination}</h2>
      <img src={`${url}${props.picture}`} alt="vacation" />
      <p className="vacationDescription">{props.description}</p>
      <p>{formatDate(props.from_date)}</p>
      <p>{formatDate(props.to_date)}</p>
      <p>Price: {props.price}$</p>
      <p>
        <FaHeart
          className={props.status === 0 ? "iconStyle" : "followedIconStyle"}
          onClick={() =>
            props.status === 0 ? followVacation() : unfollowVacation()
          }
        />
      </p>
      <p className="followersNumber">{props.followers}</p>
    </div>
  );
}

export default UserCard;

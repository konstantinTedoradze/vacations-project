import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import "./EditProfile.css";
import * as editUserAction from "../../redux/action";
import axios from "axios";
import { useHistory } from "react-router-dom";

function EditProfile(): JSX.Element {
  const [userDetails, setUserDetails] = useState({
    username: "",
    first_name: "",
    last_name: "",
  });
  const [password, setPassword] = useState("");
  const [userUpdated, setUserUpdated] = useState(false);
  const [userUpdatedError, setUserUpdatedError] = useState(false);
  const [userDeletedError, setUserDeletedError] = useState(false);


  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.userEditDetails);

  const history = useHistory();

  const onInputChange = (event: any) => {
    const tempUser = {
      ...userDetails,
      [event.target.name]: event.target.value,
    };
    setUserDetails(tempUser);
  };

  const onSaveChanges = async () => {
    const detailsCopy = { ...userDetails, password };
    try {
      const response = await axios.put(
        `http://localhost:3001/users/user/update`,
        detailsCopy
      );
      if (response.status === 200) {
        setUserUpdated(true);
        setUserUpdatedError(false);
        setTimeout(() => {
          history.push("/home");
        }, 1200);
      }
    } catch (e) {
      console.error(e);
      setUserUpdated(false);
      setUserUpdatedError(true);
    }
  };
  const deleteUser = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:3001/users/user/delete`
      );
      if (response.status === 200) {
        setUserDeletedError(false);
        history.push("/login");
      }
    } catch (e) {
      console.error(e);
      setUserDeletedError(true);
    }
  };
  useEffect(() => {
    dispatch(editUserAction.getEditUserData());
  }, []);

  useEffect(() => {
    if (user) {
      setUserDetails(user);
    }
  }, [user]);

  return (
    <div className="container">
      <h1>Obser Vacation</h1>
      <div style={{ height: 40 }}>
        {userUpdated && <p className="successVisible">Successfully updated</p>}
        {userUpdated && <p className="successVisible">Redirecting...</p>}
        {(userUpdatedError || userDeletedError) && (
          <p className="errorVisible">Something went wrong</p>
        )}
      </div>

      <div className="profileContainer">
        <div className="editProfile">
          <h2>Edit Profile</h2>
          <input
            type="text"
            value={userDetails.username}
            name="username"
            placeholder="userName"
            onChange={onInputChange}
          />
          <input
            type="text"
            value={userDetails.first_name}
            name="first_name"
            placeholder="First name"
            onChange={onInputChange}
          />
          <input
            type="text"
            name="last_name"
            value={userDetails.last_name}
            placeholder="Last name"
            onChange={onInputChange}
          />

          <p>Insert your current password to apply changes</p>
          <input
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={onSaveChanges}>Save Changes</button>
          <button onClick={deleteUser}>Delete Account</button>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;

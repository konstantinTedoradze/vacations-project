import { ChangeEvent, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import * as vacationsAction from "../../../redux/action";
import { useHistory, useLocation, useParams } from "react-router-dom";
import "./ManageVacations.css";
import axios from "axios";

export default function ManageVacations() {
  // description,destination,picture,from_date,to_date,price
  const [newVacation, setNewVacation] = useState({
    description: "",
    destination: "",
    picture: "",
    from_date: "",
    to_date: "",
    price: 0,
  });


  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const params: any = useParams();


  const getVacationById = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/vacations/${params.id}`
      );

      if (response.status === 200) {
        const { description, destination, picture, from_date, to_date, price } =
          response.data;
        const formatedFromDate = from_date.split("T")[0];
        const formatedToDate = to_date.split("T")[0];

        const vacationById = {
          description,
          destination,
          picture,
          from_date: formatedFromDate,
          to_date: formatedToDate,
          price,
        };

        setNewVacation(vacationById);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (location.pathname === `/editVacation/${params.id}`) {
      // sendrequest to the server to receive details of one vacation
      // send params.id as id to identify which vacation details to receive
      getVacationById();
    } else {
      setNewVacation({
        description: "",
        destination: "",
        picture: "",
        from_date: "",
        to_date: "",
        price: 0,
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const onVacationChange = (event: ChangeEvent<any>) => {
    const tempVacation = {
      ...newVacation,
      [event.target.name]: event.target.value,
    };
    setNewVacation(tempVacation);
  };

  const onFileChange = async (event: ChangeEvent<any>) => {
    const tempVacation = {
      ...newVacation,
      picture: event.target.files[0].name,
    };
    setNewVacation(tempVacation);
    // setSelected(event.target.files[0])
    //save file in the upload folder on server
    const fd = new FormData();
    fd.append("image", event.target.files[0], event.target.files[0].name);
    try {
      const response = await axios.post(`http://localhost:3001/upload`, fd);

      if (response.status === 200) {
        alert("file successfully uploaded");
        // dispatch(vacationsAction.getUserVacationsData(userDetails.id));
      }
    } catch (e) {
      console.error(e);
      alert("error in uploading the file");
    }
  };

  const manageVacation = () => {
    // const vacationCopy = { ...newVacation };
    // const formatedFromDate = vacationCopy.from_date;
    // console.log(formatedFromDate, "formatedFromDate");
    if (vacationValidation() && vacationValidateLength()) {
      if (location.pathname === `/editVacation/${params.id}`) {
        dispatch(vacationsAction.editVacation(newVacation, params.id, history));
      } else {
        dispatch(vacationsAction.addNewVacation(newVacation, history));
      }
    }
  };
  const vacationValidateLength = () => {
    if (
      newVacation.destination.length > 200 ||
      newVacation.description.length > 200
    ) {
      setErrorMessage("Text must be less than 200 characters");
      return false;
    }
    return true;
  };
  const vacationValidation = () => {
    if (
      newVacation.destination === "" ||
      !newVacation.destination ||
      newVacation.description === "" ||
      !newVacation.description ||
      newVacation.picture === "" ||
      !newVacation.picture ||
      newVacation.from_date === "" ||
      !newVacation.from_date ||
      newVacation.to_date === "" ||
      !newVacation.to_date ||
      newVacation.price <= 0 ||
      !newVacation.to_date
    ) {
      setErrorMessage("All the fields are required!");
      return false;
    }
    return true;
  };

  function formatDate(dateToFormat: Date) {
    let d = dateToFormat.getDate();
    let m = dateToFormat.getMonth() + 1;
    let y = dateToFormat.getFullYear();
    
     return  y + "-" + (m<=9 ? '0' + m : m) + "-"+(d<=9 ? '0' + d : d);
  }



  return (
    <div className="manageVacations">
      <h1>
        {location.pathname === `/editVacation/${params.id}`
          ? "Edit Vacation"
          : "Add Vacation"}
      </h1>
      <label>*</label>
      <input
        type="text"
        placeholder="Enter destination"
        name="destination"
        value={newVacation.destination}
        onChange={onVacationChange}
      />{" "}
      <br />
      <div className="innerDiv">
        <label>*</label>
        <textarea
          placeholder="Enter description of the destination"
          name="description"
          value={newVacation.description}
          onChange={onVacationChange}
        ></textarea>
        <br />
      </div>
      <label>*</label>
      <input
        type="file"
        placeholder="Enter picture url"
        name="picture"
        // value={newVacation.picture}
        onChange={onFileChange}
        accept="image/png, .jpeg, .jpg, image/gif"
      />
      <br />
      <label>*</label>
      <input
        type="date"
        name="from_date"
        min={formatDate(new Date())}
        value={newVacation.from_date}
        onChange={onVacationChange}
      />{" "}
      <br />
      <label>*</label>
      <input
        type="date"
        name="to_date"
        min={newVacation.from_date}
        value={newVacation.to_date}
        onChange={onVacationChange}
      />
      <br />
      <label>*</label>
      <input
        type="number"
        name="price"
        value={newVacation.price}
        onChange={onVacationChange}
      />
      <div style={{ height: "30px", color: "red" }}>
        {errorMessage !== "" && <p>{errorMessage}</p>}
      </div>
      <button onClick={manageVacation}>
        {location.pathname === `/editVacation/${params.id}` ? "Edit" : "Add"}
      </button>
    </div>
  );
}

import { ActionType } from "./action-type";
import axios from 'axios'

export interface Action{
    type: ActionType;
    payload?: any
}

export const getEditUserData = () => async (dispatch: any) => {
  axios
  .get("http://localhost:3001/users/user")
  .then((response) => {
    let userInfo = response.data; 
      dispatch({type: ActionType.EditUserDetails, payload: userInfo})
    //  history.push('/cupons');
  })
  .catch((e) => {
    console.error(e);
    alert("Failed Customer data");
  });
}


export const getVacationsData = () => async (dispatch: any) => {
  axios
  .get("http://localhost:3001/vacations")
  .then((response) => {
    let vacationsArray = response.data; 
      dispatch({type: ActionType.GetAllVacations, payload: vacationsArray})
    //  history.push('/cupons');
  })
  .catch((e) => {
    console.error(e);
    alert("Failed Customer data");
  });
}

export const addNewVacation = (newVacation: any, history: any) => async (dispatch: any) => {
  axios
  .post("http://localhost:3001/vacations/addVacation", newVacation)
  .then((response) => {
      if(response.status === 200){
        history.push('/home')
      }
  })
  .catch((e) => {
    console.error(e);
    alert("Failed Customer data");
  });
}

export const editVacation = (vacation: any, id: number, history: any) => async (dispatch: any) => {
  axios
  .put(`http://localhost:3001/vacations/${id}`, vacation)
  .then((response) => {
      if(response.status === 200){
        history.push('/home')
      }
  })
  .catch((e) => {
    console.error(e);
    alert("Failed Customer data");
  });
}

export const getUserVacationsData = () => async (dispatch: any) => {
  axios
  .get(`http://localhost:3001/userVacations`)
  .then((response) => {
    let vacationsArray = response.data; 
      dispatch({type: ActionType.GetUserVacations, payload: vacationsArray})
    //  history.push('/cupons');
  })
  .catch((e) => {
    console.error(e);
    alert("Failed Customer data");
  });
}
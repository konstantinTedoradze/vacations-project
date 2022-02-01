import { IVacations } from "../components/admin/adminCard/AdminCard";
import { IUserVacation } from "../components/users/userCard/UserCard";


export interface IUserDetails {
  id: number,
  token: string,
  username: string,
  first_name: string,
  last_name: string,
  user_type: string

}


export interface IuserEditDetails {
  username: string,
  first_name: string,
  last_name: string
}

export class AppState{
  vacations: IVacations[] = [];
  deleteSuccess: boolean = false;
  userDetails!: IUserDetails;
  token!: string;
  usersVacations: IUserVacation[] = []; 
  userEditDetails!: IuserEditDetails;
}


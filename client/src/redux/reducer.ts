import { AppState } from "./app-state";
import { Action } from "./action";
import { ActionType } from "./action-type";

// This function is NOT called direcrtly by you
export function reducer(oldAppState: AppState = new AppState(), action: Action): AppState {
    // Cloning the oldState (creating a copy)
    let newAppState = { ...oldAppState };

    switch (action.type) {
        case ActionType.GetAllVacations:
            newAppState.vacations = action.payload;
            break;
        case ActionType.LoginUserDetails:
            newAppState.userDetails = action.payload.userData;
            newAppState.token = action.payload.token
            break;
        case ActionType.GetUserVacations:
            newAppState.usersVacations = action.payload;
            break;
        case ActionType.LogOut:
            newAppState =  new AppState()
            localStorage.clear()
            break;
        case ActionType.EditUserDetails:
            newAppState.userEditDetails = action.payload;
            break;
    }

    return newAppState;
}
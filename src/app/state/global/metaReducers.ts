import { Action, ActionReducer, INIT, MetaReducer } from "@ngrx/store";
import { AppState } from "../app.state";
import { logoutAction } from "./global.actions";

export function logout(reducer: ActionReducer<AppState, Action>) {

  return (state: AppState, action: Action) => {
    if (action != null && action.type === logoutAction.type) {
      return reducer(undefined, { type: INIT });
    }
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer[] = [logout];
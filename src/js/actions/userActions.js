import Reflux from "reflux";
const userActions = {
      login: Reflux.createAction(),
      logout: Reflux.createAction()
};
export const login = userActions.login;
export const logout = userActions.logout;
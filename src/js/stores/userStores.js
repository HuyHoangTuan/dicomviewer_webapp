import Reflux from "reflux";
import endpoints from "../utils/endpoints";
import * as userActions from "../actions/userActions";
import { login } from "../handlers/requestHandlers";
class userStores extends Reflux.Store
{
      constructor()
      {
            super();
            ///this.listenTo(userActions.login, this.login);
            this.listenables = [userActions];
            this._user = "";
            this._roles = [];
            this._token = "";

      }     
      onLogin(username, password)
      {
            login(
                  username, 
                  password, 
                  (error, data) => {
                        if(error)
                        {
                              this.trigger(
                                    {
                                          success: false,
                                          loginFailed: true
                                    }
                              );
                              return;
                        }
                        this._user = data.user;
                        this._roles = data.roles;
                        this._token = data.token;
                        console.log(data);
                  }
            );
      }
      
      onLogout()
      {

      }
}
const USERSTORES = new userStores();
export default USERSTORES;
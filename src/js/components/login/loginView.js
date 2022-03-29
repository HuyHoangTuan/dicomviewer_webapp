import React from "react";
import * as userActions from "../../actions/userActions";
import userStores from "../../stores/userStores";
class loginView extends React.Component
{
      constructor(props)
      {
            super(props);
      }
      componentDidMount()
      {
      }
      componentWillUnmount()
      {
      }
      render()
      {
            return (
                  <button 
                        style={{width: "100px", height: "100px"}}
                        onClick = {
                              () =>
                              {
                                    userActions.login("dicoogle","dicoogle");
                              }
                        }
                  >
                        login 
                  </button>
            )
      }
}

export default loginView;
import React from 'react'
import LoginView  from './components/login/loginView.js';
class App extends React.Component
{
      render()
      {
            return(
                  <div style={{width: "100px", height: "100px"}}>
                        <LoginView/>
                  </div>
                  
            );
      }
      
}
export default App
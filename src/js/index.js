import React from 'react';
import ReactDom from "react-dom";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import App from "./app";

import "../css/index.css"
const routingTable = (
      <Router>
            <Routes>
                  <Route exact path = "/" element = {<App/>}/>
            </Routes>
      </Router>
)
ReactDom.render(
      routingTable,
      document.getElementById('root')

)
module.hot.accept();
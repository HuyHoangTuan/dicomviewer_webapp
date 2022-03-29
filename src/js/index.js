import React from 'react';
import ReactDom from "react-dom";
import {Router, Route, hashHistory} from 'react-router';
import App from "./app";
import loginView from './components/login/loginView';
import SearchView from './components/search/searchView';
import PatientDetailView from './components/patient/patientDetailView';
import "../css/index.css"
import { browserHistory } from 'react-router'
const routingTable = (
      <Router history={browserHistory}>
            <Route exact path = "/" component= {App}/>
            <Route exact path = "/search" component={SearchView}/>
            <Route path = "/:uid/detail" component={PatientDetailView}/>
      </Router>
)
ReactDom.render(
      routingTable,
      document.getElementById('root')

)
module.hot.accept();
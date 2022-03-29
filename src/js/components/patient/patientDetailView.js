import React from "react";
import patientStores from "../../stores/patientStores";
import * as patientActions from "../../actions/patientActions";
import PatientInforView from "./patientInforView";
import PatientPicView from "./patientPicView";
import "../../../css/index.css"
import { Grid } from "@mui/material";
class patientDetailView extends React.Component
{
      constructor(props)
      {
            super(props);
            this._ref = React.createRef();
            this.state = {
                  data:{},
                  status: "loading",
            }
            this._uid = props.params.uid;
            this._data = {};
            this._isMouted = false;
            this.handleClick = this.handleClick.bind(this);
            this.onChange = this.onChange.bind(this);
            
      }
      componentDidUpdate(prevProps)
      {
            if(this.props.uid!=prevProps.uid)
            {
                  patientActions.detail(this.props.params.uid);
            }
      }
      componentDidMount()
      {
            this.unsubscribe = patientStores.listen(this.onChange);
            patientActions.detail(this.props.params.uid);
      }
      componentWillUnmount()
      {
            this._isMouted = true;
            this.unsubscribe();
      }
      onChange(event)
      {
            if(event.success === false)
            {
                  return;
            }                                 
            if(event.success === true && event.pic === false)                 
            {
                  this.setState({data: event.data});
            }
            if(event.success === true && event.pic === true)
            {
                  
                  this.setState({pic: event.data});
            }
      }
      handleClick(event)
      {
            
      }
      render()
      {
            return(
                  <div className='patient-detail'>
                        
                        <PatientPicView
                              data = {this.state.pic}
                              parentRef = {this._ref}
                        />
                        <dialog ref={this._ref}>
                              <PatientInforView
                                    data = {this.state.data}
                                    parentRef = {this._ref}
                              />
                        </dialog>
                        
                  </div>
            );
      }
}

export default patientDetailView;

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
            this._detail = React.createRef();

            this.state = {
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
                       
            if(event.success === true && event.info === true)                 
            {
                  this.setState({data: event.data});
                  ///return;
            }
            if(event.success === true && event.pic === true)
            {
                  
                  this.setState({pic: event.data, picUrl: event.url});
                  ///return;
            }
            /*if(event.success === true && event.dicom === true)
            {
                  this.setState({dicom: event.data});
                  ///return;
            }*/
            ///console.log(this.state.data +", "+this.state.pic+", "+this.state.dicom); 
            if(this.state.data !== undefined 
                  && this.state.pic !== undefined 
                  /*&& this.state.dicom !== undefined*/)
            {
                  console.log("Done!");
            }
            else console.log("loading");
      }
      handleClick(event)
      {
            
      }
      render()
      {
            return(
                  <div className='patient-detail'>
                        
                        <PatientPicView
                              data = {this.state.data}
                              pic = {this.state.pic}
                              url = {this.state.picUrl}
                              parentRef = {this._detail}
                        />
                        <dialog ref={this._detail}>
                              <PatientInforView
                                    data = {this.state.data}
                                    parentRef = {this._detail}
                              />
                        </dialog>
                        
                  </div>
            );
      }
}

export default patientDetailView;

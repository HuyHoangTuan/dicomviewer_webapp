import React from "react";
import "../../../css/index.css";
import SearchIcon from '@mui/icons-material/Search';
import FlipToBackIcon from '@mui/icons-material/FlipToBack';
import FlipToFrontIcon from '@mui/icons-material/FlipToFront';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import RotateRightIcon from '@mui/icons-material/RotateRight';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import PanToolAltIcon from '@mui/icons-material/PanToolAlt';
import { ThirtyFps } from "@mui/icons-material";
class patientPicView extends React.Component
{
      constructor(props)
      {
            super(props);
            this.handleDetailBtn = this.handleDetailBtn.bind(this);
            
      }
      componentDidMount()
      {

      }
      componentWillUnmount()
      {

      }
      handleDetailBtn(event)
      {
            console.log(this._ref.current);
            this._ref.current.showModal();
      }
      render()
      {
            var base64ImgageString;
            var srcValue;
            if(this.props.data)
            {
                  base64ImgageString = Buffer.from(this.props.data, 'binary').toString('base64');
                  srcValue = "data:img/png;base64,"+base64ImgageString;
            }
            this._ref =this.props.parentRef;
            return (
                  <div className="image-manipulator">
                        <div className="task-bar">
                              <div id ="btn-pan">
                                    <PanToolAltIcon color = "primary">

                                    </PanToolAltIcon>
                                    <span>
                                          Pan
                                    </span>

                              </div>
                              <div id="btn-zoom">
                                    <SearchIcon color="primary"></SearchIcon>
                                    <span>
                                          Zoom
                                    </span>
                              </div>
                              <div id="btn-flip-to-front">
                                    <FlipToFrontIcon color= "primary"></FlipToFrontIcon>
                                    <span>
                                          Flip to Front
                                    </span>
                              </div>
                              <div  id ="btn-flip-to-back">
                                    <FlipToBackIcon color= "primary"></FlipToBackIcon>
                                    <span>
                                          Flip to Back
                                    </span>
                              </div>
                              
                              <div id="btn-rotate-l">
                                    <RotateLeftIcon color = "primary">

                                    </RotateLeftIcon>
                                    <span>
                                          Rotate Left
                                    </span>
                              </div>
                              <div id="btn-rotate-r">
                                    <RotateRightIcon color = "primary">

                                    </RotateRightIcon>
                                    <span>
                                          Rotate Right
                                    </span>
                              </div>
                              <div id = "btn-detail" onClick={this.handleDetailBtn}>
                                    <MoreHorizIcon color = "primary">

                                    </MoreHorizIcon>
                                    <span>
                                          Detail
                                    </span>
                              </div>
                        </div>
                        <div className="patient-pic">
                              <img
                                    src={srcValue}
                              >
                              </img>
                        </div>
                        

                        
                  </div>
                  
            );
      }
}

export default patientPicView;
import React from "react";
import "../../../css/index.css";
import SearchIcon from '@mui/icons-material/Search';
import FlipIcon from '@mui/icons-material/Flip';
import FlipToBackIcon from '@mui/icons-material/FlipToBack';
import FlipToFrontIcon from '@mui/icons-material/FlipToFront';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import RotateRightIcon from '@mui/icons-material/RotateRight';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import PanToolAltIcon from '@mui/icons-material/PanToolAlt';
import * as cornerstone from 'cornerstone-core'
import * as cornerstoneWebImageLoader from "cornerstone-web-image-loader";
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore';
import InvertColorsIcon from '@mui/icons-material/InvertColors';
import LensBlurIcon from '@mui/icons-material/LensBlur';
import { useThemeWithoutDefault } from "@mui/system";


/// set-up loader for cornerstone - web image
cornerstoneWebImageLoader.external.cornerstone = cornerstone;


class patientPicView extends React.Component
{
      constructor(props)
      {
            super(props);
            this._defaultMoveLens = null;
            this._defaultScale = 1.0;
            this.handleDetailBtn = this.handleDetailBtn.bind(this);    
            this.handlePan = this.handlePan.bind(this);
            this.handleZoom = this.handleZoom.bind(this);
            this.handlePicMouseDown = this.handlePicMouseDown.bind(this);
            this.handleReset = this.handleReset.bind(this);
            this.handleMouseWheel = this.handleMouseWheel.bind(this);
            this.handleWindowResize = this.handleWindowResize.bind(this);
            this.handleInvert = this.handleInvert.bind(this);
            this.handleInterpolation = this.handleInterpolation.bind(this);
            this.handleRotateLeft = this.handleRotateLeft.bind(this);
            this.handleRotateRight = this.handleRotateRight.bind(this);
            this.handleVerticalFlip = this.handleVerticalFlip.bind(this);
            this.handleHorizontalFlip = this.handleHorizontalFlip.bind(this);

            this._dicomImg = React.createRef();
            this._zoom = React.createRef();
            this._pan = React.createRef();
            this._invert = React.createRef();
            this._reset = React.createRef();
            this._detail = React.createRef();
            this._interpolation = React.createRef();
            this._rotateRight = React.createRef();
            this._rotateLeft = React.createRef();
            this._vFlip = React.createRef();
            this._hFlip = React.createRef();

      }
      handleMouseWheel(event)
      {
            event.preventDefault();
            event.stopPropagation();
            try
            {
                  var viewPort = cornerstone.getViewport(this._dicomImg.current);
                  viewPort.sca
                  if(event.wheelDelta < 0 || event.detail > 0)
                  {
                        var newScale = viewPort.scale-0.15;
                        if(newScale>=this._defaultScale)
                        {
                              viewPort.scale = newScale;
                        }
                  }
                  else viewPort.scale +=0.15;
                  ///console.log(viewPort.scale);
                  cornerstone.setViewport(this._dicomImg.current, viewPort);
                  return false;
            }
            catch(err)
            {
                  ///console.log(err);
                  return false;
            }
      }
      handleWindowResize(event)
      {
            if(this.props.url)
            {
                  ///console.log(this._dicomImg.current.offsetWidth+", "+this._dicomImg.current.offsetHeight);
                  cornerstone.resize(this._dicomImg.current);
                  document.querySelector('.zoom-lens').style.backgroundSize=`${this._dicomImg.current.offsetWidth}px ${this._dicomImg.current.offsetHeight}px`;
                  /*cornerstone.enable(this._dicomImg.current);
                  cornerstone.loadImage(this.props.url).then((image) =>{
                        cornerstone.displayImage(this._dicomImg.current, image);
                  })*/
            }
      }
      componentDidMount()
      {
            window.addEventListener('resize',this.handleWindowResize);
            document.addEventListener('mousewheel',this.handleMouseWheel , {passive: false});
            this.handlePan();
      }
      componentWillUnmount()
      {
            window.removeEventListener('resize', this.handleWindowResize);
            document.removeEventListener('mousewheel', this.handleMouseWheel);
      }
      
      handleTurnOffToggle(object)
      {

            if(object!=this._pan)
            {
                  this._pan.current.classList.toggle("btn-active", false);
                  this._dicomImg.current.classList.toggle("patient-pic-pan-active", false);
            }

            if(object!=this._reset)
                  this._reset.current.classList.toggle("btn-active",false);
            else
            {
                  this._invert.current.classList.toggle("btn-active", false);
                  this._interpolation.current.classList.toggle("btn-active", false);
            }
            /*if(object!= this._invert)
                  this._invert.current.classList.toggle("btn-active", false);*/

            if(object!= this._detail)
                  this._detail.current.classList.toggle("btn-active", false);
            if(object != this._zoom)
            {
                  this._zoom.current.classList.toggle("btn-active", false);
                  document.querySelector(".zoom-lens").classList.toggle("zoom-lens-active", false);
                  document.querySelector(".zoom-lens").removeEventListener('mousemove', this._defaultMoveLens);
            }/*if(object != this._interpolation)
                  this._interpolation.current.classList.toggle("btn-active", false);*/

            /*if(object!= this._rotateLeft)
                  this._rotateLeft.current.classList.toggle("btn-active", false);

            if(object != this._rotateRight)
                  this._rotateRight.current.classList.toggle("btn-active", false);*/
      }
      
      handlePan(event)
      {
            this.handleTurnOffToggle(this._pan);

            this._pan.current.classList.toggle("btn-active", true);
            this._dicomImg.current.classList.toggle("patient-pic-pan-active",true);
      }

      /// have to finish 
      handleZoom(event)
      {
            this.handleTurnOffToggle(this._zoom);
            this._zoom.current.classList.toggle("btn-active", true);
            var zoomLens = document.querySelector(".zoom-lens");
            zoomLens.style.top = '0px';
            zoomLens.style.left = '0px';
            zoomLens.classList.toggle("zoom-lens-active", true);
            function getCursorPos(_event, image)
            {
                  var a, x=0, y=0;
                  _event = _event || window.event;
                  a = image.getBoundingClientRect();
                  /// get actual cordinate
                  x = _event.pageX - a.left;
                  y = _event.pageY - a.top;

                  /// page scrolling
                  x = x - window.pageXOffset;
                  y = y - window.pageYOffset;
                  return {x: x, y: y};
            }
            var moveLens = (_event) =>{
                  var pos, x, y;
                  event.preventDefault();
                  event.stopPropagation();
                  pos = getCursorPos(_event, this._dicomImg.current);
                  x = pos.x- (zoomLens.offsetWidth/2);
                  y = pos.y- (zoomLens.offsetHeight/2);
                  
                  /// prevent the lens from being positioned outside the image
                  if(x> this._dicomImg.current.offsetWidth - zoomLens.offsetWidth) x = this._dicomImg.current.offsetWidth - zoomLens.offsetWidth;
                  if(x<0) x= 0;
                  if(y > this._dicomImg.current.offsetHeight - zoomLens.offsetHeight) y = this._dicomImg.current.offsetHeight - zoomLens.offsetHeight;
                  if(y<0) y = 0;

                  zoomLens.style.left = x+'px';
                  zoomLens.style.top = y+'px';
                  zoomLens.style.backgroundPosition = `-${x}px -${y}px`;
            }
            this._defaultMoveLens = moveLens;
            this._dicomImg.current.addEventListener('mousemove', moveLens);
            zoomLens.addEventListener('mousemove', moveLens);
      }
      handlePicMouseDown(event)
      {
            if(this._pan.current.classList.contains("btn-active"))
            {
                  if(this._dicomImg.current.classList.contains("patient-pic-pan-active"))
                  {
                        var lastX = event.pageX;
                        var lastY = event.pageY;
                        var handleMouseMove = (_event) =>
                        {
                              var newX = _event.pageX;
                              var newY = _event.pageY;
                              const viewPort= cornerstone.getViewport(this._dicomImg.current);
                              viewPort.translation.x += (newX-lastX)/viewPort.scale;
                              viewPort.translation.y += (newY-lastY)/viewPort.scale;
                              lastX = newX;
                              lastY = newY;
                              ///console.log(lastX+", "+lastY);
                              cornerstone.setViewport(this._dicomImg.current, viewPort);
                        }
                        
                        var handleMouseUp = (_event) =>
                        {
                              document.removeEventListener('mousemove', handleMouseMove);
                              document.removeEventListener('mouseup', handleMouseUp);
                              ///document.removeEventListener('mouseup', handleMouseUp);
                        }
                        ///this._dicomImg.current.addEventListener('mouseup',handleMouseUp);
                        document.addEventListener('mousemove',handleMouseMove);
                        document.addEventListener('mouseup', handleMouseUp);
                  }
            }
            else
            {
            }
      }
      handleVerticalFlip(event)
      {
            var viewPort = cornerstone.getViewport(this._dicomImg.current);
            viewPort.vflip = !viewPort.vflip
            cornerstone.setViewport(this._dicomImg.current, viewPort);
      }
      handleHorizontalFlip(event)
      {
            var viewPort = cornerstone.getViewport(this._dicomImg.current);
            viewPort.hflip = !viewPort.hflip;
            cornerstone.setViewport(this._dicomImg.current, viewPort);
      }
      handleRotateLeft(event)
      {
            var viewPort = cornerstone.getViewport(this._dicomImg.current);
            viewPort.rotation-=90;
            cornerstone.setViewport(this._dicomImg.current, viewPort);
      }
      handleRotateRight(event)
      {
            var viewPort = cornerstone.getViewport(this._dicomImg.current);
            viewPort.rotation+=90;
            cornerstone.setViewport(this._dicomImg.current, viewPort);
            
      }
      handleInterpolation(event)
      {
            var viewPort = cornerstone.getViewport(this._dicomImg.current);
            if(!viewPort.pixelReplication)
                  this._interpolation.current.classList.toggle("btn-active", true);
            else
                  this._interpolation.current.classList.toggle("btn-active", false);
            viewPort.pixelReplication = !viewPort.pixelReplication;
            cornerstone.setViewport(this._dicomImg.current, viewPort);
      }
      handleInvert(event)
      {
            var viewPort = cornerstone.getViewport(this._dicomImg.current);
            if(!viewPort.invert)
                  this._invert.current.classList.toggle("btn-active", true);
            else
                  this._invert.current.classList.toggle("btn-active", false);
            
            viewPort.invert = !viewPort.invert;
            cornerstone.setViewport(this._dicomImg.current, viewPort);
      }
      handleReset(event)
      {
            this.handleTurnOffToggle(this._reset);
            cornerstone.reset(this._dicomImg.current);
            this._dicomImg.current.classList.toggle("patient-pic-pan-active",false);
            this.handlePan();
      }
      handleDetailBtn(event)
      {
            try
            {
                  this.handleTurnOffToggle(this._detail);
                  this._detail.current.classList.toggle("btn-active", true);
                  this._info.current.showModal();
            }
            catch(error)
            {
                  console.log(error);
                  return;
            }
            
      }
      render()
      {
            this._info =this.props.parentRef;

            /// png
            var base64ImgageString;
            var srcValue;
            if(this.props.data)
            {
                  base64ImgageString = Buffer.from(this.props.data, 'binary').toString('base64');
                  srcValue = "data:img/png;base64,"+base64ImgageString;
                  document.querySelector('.zoom-lens').style.backgroundImage = `url(${srcValue})`;

            }
            
            /// dicom
            var picUrl;
            if(this.props.url)
            {
                  picUrl = this.props.url;
                  cornerstone.enable(this._dicomImg.current);
                  cornerstone.loadImage(picUrl).then((image) => {
                        document.querySelector('.zoom-lens').style.backgroundSize = `${this._dicomImg.current.offsetWidth}px ${this._dicomImg.current.offsetHeight}px`;
                        cornerstone.displayImage(this._dicomImg.current, image);
                        this._defaultScale = cornerstone.getViewport(this._dicomImg.current).scale;
                        ///console.log(cornerstone.getViewport(this._dicomImg.current));
                  })
            }
            return (
                  <div className="image-manipulator">
                        <div className="task-bar"
                        >
                              <div id ="btn-pan" onClick={this.handlePan} ref = {this._pan}>
                                    <PanToolAltIcon color = "primary">

                                    </PanToolAltIcon>
                                    <span>
                                          Pan
                                    </span>

                              </div>
                              <div id="btn-zoom"
                                    onClick={this.handleZoom}
                                    ref  = {this._zoom}
                              >
                                    <SearchIcon color="primary"></SearchIcon>
                                    <span>
                                          Zoom
                                    </span>
                              </div>
                              <div id="btn-flip-to-front"
                                    onClick ={this.handleVerticalFlip}
                                    ref = {this._vFlip}
                              >
                                    <FlipIcon color = "primary">

                                    </FlipIcon>
                                    <span>
                                          Vertical Flip
                                    </span>
                              </div>
                              <div  id ="btn-flip-to-back"
                                    onClick={this.handleHorizontalFlip}
                                    ref  = {this._hFlip}
                              >
                                    <FlipToFrontIcon color= "primary"></FlipToFrontIcon>
                                    <span>
                                          Horizontal Flip
                                    </span>
                              </div>
                              
                              <div id="btn-rotate-l"
                                    onClick={this.handleRotateLeft}
                                    ref ={this._rotateLeft}
                              >
                                    <RotateLeftIcon color = "primary">

                                    </RotateLeftIcon>
                                    <span>
                                          Rotate Left
                                    </span>
                              </div>
                              <div id="btn-rotate-r"
                                    onClick={this.handleRotateRight}
                                    ref = {this._rotateRight}
                              >
                                    <RotateRightIcon color = "primary">

                                    </RotateRightIcon>
                                    <span>
                                          Rotate Right
                                    </span>
                              </div>
                              <div id = "btn-interpolation"
                                    onClick={this.handleInterpolation}
                                    ref = {this._interpolation}>
                                    <LensBlurIcon color = "primary">
                                    </LensBlurIcon>
                                    <span>
                                          Interpolation
                                    </span>
                              </div>
                              <div id="btn-invert-color"
                                    onClick={this.handleInvert}
                                    ref={this._invert}
                              >
                                    <InvertColorsIcon color = "primary">

                                    </InvertColorsIcon>
                                    <span>
                                          Invert
                                    </span>

                              </div>
                              <div id = "btn-reset" 
                                    onClick={this.handleReset}
                                    ref = {this._reset}
                              >
                                    <SettingsBackupRestoreIcon color = "primary">

                                    </SettingsBackupRestoreIcon>
                                    <span>
                                          Reset
                                    </span>
                              </div>
                              <div id = "btn-detail" 
                                    onClick={this.handleDetailBtn}
                                    ref = {this._detail}
                              >
                                    <MoreHorizIcon color = "primary">

                                    </MoreHorizIcon>
                                    <span>
                                          Detail
                                    </span>
                              </div>
                        </div>
                        <div 
                              className="patient-pic"
                              onContextMenu={() => {return false;}}
                              onMouseDown={this.handlePicMouseDown}
                              ref={this._dicomImg}
                              >
                              <div className="zoom-lens">

                              </div>
                              {/*<img
                                    src={srcValue}
                                    onContextMenu={() => {return false;}}
                              >
                              </img>*/}
                        </div>
                        {/*
                        <div className="pic-test"
                              style={{width:'256px', height:'256px'}}
                              ref={this._dicomImg}
                              onContextMenu = {() => {return false;}}
                              
                        >
                        </div>
                        */
                        }
                        
                  </div>
                  
            );
      }
}

export default patientPicView;
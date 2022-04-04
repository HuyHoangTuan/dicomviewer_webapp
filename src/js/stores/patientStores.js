import Reflux from "reflux";
import React from 'react';
import * as patientActions from '../actions/patientActions';
import { getPatient, getPatientPic, getPatientDicomFile, getPatientPicUrl } from "../handlers/requestHandlers";

class patientStores extends Reflux.Store
{
      constructor()
      {
            super();
            this._infor = {};
            this.listenables = [patientActions];
      }
      onDetail(SOPInstanceUID)
      {
            getPatient(
                  SOPInstanceUID,
                  (error, value) =>{
                        if(error)
                        {
                              this.trigger(
                                    {
                                          success: false,
                                    }
                              )
                              return;
                        }
                        if(value)
                        {
                              this._infor = value;
                              this.trigger(
                                    {
                                          success: true,
                                          info: true,
                                          data: value,
                                    }
                              )
                              return;
                        }
                  }
            )
            getPatientPic(
                  SOPInstanceUID,
                  (error, value) =>{
                        if(error)
                        {
                              this.trigger(
                                    {
                                          success:false,
                                    }
                              )
                              return;
                        }
                        if(value)
                        {
                              this.trigger(
                                    {
                                          success: true,
                                          pic: true,
                                          url: getPatientPicUrl(SOPInstanceUID),
                                          data: value,
                                    }
                              )
                              return;
                        }
                  }
            )
            /*getPatientDicomFile(
                  SOPInstanceUID,
                  (error, value) => {
                        if(error)
                        {
                              this.trigger(
                                    {
                                          success: false,
                                    }
                              )
                              return;
                        }
                        if(value)
                        {
                              this.trigger(
                                    {
                                          success: true,
                                          dicom: true,
                                          data: value,
                                    }
                              )
                              return;
                        }
                  }
            )*/
      }

}
const PATIENTSTORES = new patientStores();
export default PATIENTSTORES;
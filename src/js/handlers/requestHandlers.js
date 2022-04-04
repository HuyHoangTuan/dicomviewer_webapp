"use strict"
const util = require("../utils/util.js");
const socket = require("../utils/socket.js");
const endpoints = require("../utils/endpoints");

class PACS
{
      constructor()
      {
            this._protocol = "http:";
            this._host = "127.0.0.1:8080";
            this._socket = new socket.Socket(this._protocol+"//"+this._host);
      }
      baseURL()
      {
            return this._protocol+"//"+this._host;
      }
      login(username, password, callback)
      {
            return util.andCall(this._socket.login(username, password), callback);
      }
      searchDIM(searchOptions, callback)
      {
            const query = searchOptions.query;
            const provider = searchOptions.provider;
            const keyword  = typeof searchOptions.keyword === 'boolean' ? searchOptions.keyword : !!query.match(/[^\s\\]:\S/);
            const {psize, offset, depth} = searchOptions;
            return util.andCall(
                  this._socket.searchDIM(
                        {query, provider, keyword, psize, offset, depth}),
                        callback
                        );
      }
      detail(SOPInstanceUID, callback)
      {
            return util.andCall(
                  this._socket.dump(
                        {
                              uid: SOPInstanceUID
                        }
                  ),
                  callback
            );
      }
      pic(SOPInstanceUID, callback)
      {
            return util.andCall(
                  this._socket.dic2png({
                        SOPInstanceUID: SOPInstanceUID
                  }),
                  callback
            )
      }
      dicom(SOPInstanceUID, callback)
      {
            return util.andCall(
                  this._socket.dicom({SOPInstanceUID: SOPInstanceUID}),
                  callback
            )
      }

}

const PACS_SERVER = new PACS();

export function login(username, password, callback)
{
      console.log("LOGIN :", username," + ",password);
      return PACS_SERVER.login(username, password, callback);
}

export function getPatients(
      query, 
      isKeyword, 
      provider, 
      callback
)
{
      console.log("GET PATIENTS: ", query);
      if(query.length === 0 )
      {
            query = "*:*";
            isKeyword = true;
      }
      if(provider === "all")
      {
            provider = undefined;
      }
      
      const searchOptions = {
            query: query,
            keyword: isKeyword,
            provider: provider,
      }
      return PACS_SERVER.searchDIM(
            searchOptions, 
            callback)
}

export function getPatientPicUrl(
      SOPInstanceUID
)
{
      return PACS_SERVER.baseURL()+"/"+endpoints.DIC2PNG+"?"+"SOPInstanceUID"+"="+SOPInstanceUID;
}
export function getPatient(
      SOPInstanceUID,
      callback
)
{
      console.log("GET PATIENT:", SOPInstanceUID);
      return PACS_SERVER.detail(
            SOPInstanceUID,
            callback
      )
}

export function getPatientPic(
      SOPInstanceUID,
      callback
)
{
      console.log("GET PATIENT PIC:", SOPInstanceUID);
      return PACS_SERVER.pic(
            SOPInstanceUID,
            callback
      )
}
export function getPatientDicomFile(
      SOPInstanceUID,
      callback
)
{
      console.log("GET PATIENT DICOM:", SOPInstanceUID);
      return PACS_SERVER.dicom(
            SOPInstanceUID,
            callback
      )
}


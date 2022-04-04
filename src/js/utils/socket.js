"use strict";


exports.Socket = void 0;

const endpoints = require("./endpoints.js");
const axios = require("axios").default;

class Socket
{
      constructor(url = undefined)
      {
            this._url = url;
            this._token = null;
            this._roles = null;
            this._user = null;

            if( typeof url !== 'string')
            {
                  if(typeof window === 'object')
                  {
                        this._url= window.location.protocol+"//"+window.location.host;
                  }
                  else
                  {
                        throw new Error("Can not find URL for services");
                  }
            }
      }
      login(username, password)
      {
            let data = {
                  "username":username,
                  "password":password
            };
            let req = this.request(
                  'post',
                  endpoints.LOGIN,
                  undefined,
                  {'Content-Type':'application/x-www-form-urlencoded'},
                  data
            )
            return req.then( 
                  res => {
                        const data = res.data;
                        this._token = data.token;
                        this._user = data.user;
                        this._roles = data._roles;
                        return data;
                  }
            );
      }
      logout()
      {

      }
      searchDIM(params)
      {
            let req = this.request(
                  'get',
                  endpoints.SEARCHDIM,
                  params,
                  undefined,
                  undefined
            )
            return req.then(
                  res => {
                              ///console.log(res);
                              return res.data;
                  });
      }
      dump(params)
      {
            let req = this.request(
                  'get',
                  endpoints.DUMP,
                  params,
                  undefined,
                  undefined
            )
            return req.then(
                  res => {
                        return res.data;
                  }
            );
      }
      dic2png(params)
      {
            let req = this.request(
                  'get',
                  endpoints.DIC2PNG,
                  params,
                  undefined,
                  undefined,
                  'arraybuffer'
            )
            return req.then(
                  res =>{
                        return res.data;
                  }
            );
      }
      dicom(params)
      {
            let req = this.request(
                  'get',
                  endpoints.DICOM,
                  params,
                  undefined,
                  undefined,
                  undefined,
            )
            return req.then(
                  res=>{
                        return res.data;
                  }
            );
      }
      request(method, uri, params = null, header = null, data=null, responseType = 'json')
      {
            let baseURL = [this._url].concat(uri).join('/');
            let req_header ={
                  'Access-Control-Allow-Origin': '*'
            };
            if(header)
            {
                  Object.assign(req_header,header);
            }
            if(this._token)
            {
                  Object.assign(req_header,{"Authorization" : this._token});
            }
            console.log(baseURL+", "+responseType);
            const req = axios(
                  {
                        method: method,
                        url: baseURL,
                        params: params,
                        headers: req_header,
                        data: new URLSearchParams(data),
                        mode: 'cors',
                        withCredentials: true,
                        responseType: responseType
                  }
            )

            return req;  
      }
}
exports.Socket = Socket;
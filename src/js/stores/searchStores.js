import Reflux from 'reflux';
import React from 'react';
import * as searchActions from '../actions/searchActions';
import { getPatients } from '../handlers/requestHandlers';

class searchStores extends Reflux.Store
{
     constructor()
     {
            super();
            this.listenables = [searchActions];
     }
     onSearchDIM(query, provider)
     {
            getPatients(
                  query,
                  undefined,
                  provider,
                  (error, value) =>{
                        if(error)
                        {
                             this.trigger(
                                   {
                                         success: false
                                   }
                             );
                             return;
                        }
                        if(value)
                        {
                              console.log(value);
                        }
                  }
            )
     }
}
const SEATCHSTORES = new searchStores();
export default SEATCHSTORES;
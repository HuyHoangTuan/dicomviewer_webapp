
import React, {useEffect, useState} from 'react';
import "../../../css/index.css"
import CloseIcon from '@mui/icons-material/Close';
class patientInforView extends React.Component
{
      constructor(props)
      {
            super(props);
            this.handleClose = this.handleClose.bind(this);
            this._ref = this.props.parentRef;

      }
      componentDidMount()
      {

      }
      componentWillUnmount()
      {

      }
      handleClose(event)
      {
            this._ref.current.close();
      }
      render()
      {
            var fetchedData = this.props.data.DATA;
            var fields = {};
            if(fetchedData)
            {
                  fetchedData.map(
                        (data)=>{
                              if(data.results)
                              {
                                    if(data.results.fields)
                                    {
                                          fields = data.results.fields;
                                    }
                              }
                        }
                  );
            }
            var listItems = [];
            if(Object.keys(fields).length)
            {
                  for(const field in fields)
                  {
                        var temp = {};
                        temp[field] = fields[field];
                        listItems.push(temp);
                  }
            }
            var list = listItems.map((data) => {
                  const liList = [];
                  for( const key in data)
                  {
                        var value = data[key];
                        var _key = key.replaceAll(
                              /(?<!^)((?<!([A-Z\s]))[A-Z])/g,
                              (data)=>{
                                          var temp = ' '+data;
                                          return temp;
                                    }
                              )
                        var h2 = React.createElement('span',{key:`${key}`},_key);
                        var span = React.createElement('span',{key:`${value}`}, value);
                        liList.push(React.createElement('li',{key:`${key+value}`}, [h2,span]));
                  }
                  return liList;
            })
            return (
                  <div className='dialog'>
                        <div className = "dialog-bar">
                              Detail
                              <div className='dialog-cancel'>
                                    <div onClick={this.handleClose}>
                                          <CloseIcon >

                                          </CloseIcon>
                                    </div>
                                    
                              </div>
                        </div>
                        <ul className='patient-infor'>
                              {list}
                        </ul>
                        
                  </div>
                  
                  
            );
      }
}

export default patientInforView;
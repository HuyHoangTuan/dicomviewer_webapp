import React from 'react';
import * as searchActions from '../../actions/searchActions';
import searchStores from '../../stores/searchStores';

class searchView extends React.Component
{
      constructor(props)
      {
            super(props);
      }
      componentDidMount()
      {
            
      }
      componentWillUnmount()
      {

      }
      render()
      {
            return (
                  <div>
                        <button
                              onClick={
                                    () =>{
                                          searchActions.searchDIM('','all');
                                    }
                              }
                        >
                              search
                        </button>
                  </div>
            );
      }
      
}
export default searchView;
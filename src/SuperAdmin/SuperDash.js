import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './SuperDashStyle.css';
import { Link } from 'react-router-dom';
import SuperSidebar from './SuperSidebar';
import {useCenterContext} from './CenterContext';

function SuperDash() {

  const {centers} = useCenterContext();  

   return(
    <div>
     <SuperSidebar />
     
    <div className="pt-4 pb-4">
      <div className='center-dropdown'>
        <label htmlFor='centerSelect'></label>
            <select id='centerSelect'>
          <option value=''>All Centers</option>
          {centers.map((center,index)=> (
            <option key={index} value={center}>
              {center}
            </option>

          ))}

          </select>
        </div>
      </div>
    </div>
  ) 
}


export default SuperDash;
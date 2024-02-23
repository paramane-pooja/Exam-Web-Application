import React, { useState, useEffect } from 'react';
import './AddStyle.css';
import SuperSidebar from './SuperSidebar';
import { useCenterContext } from './CenterContext';

function AddCenter() {
  const { centers, addCenter, deleteCenter } = useCenterContext();
  const [newCenter, setNewCenter] = useState('');


  const handleInputChange = (e) => {
    setNewCenter(e.target.value);
  };

  const handleAddCenter = () => {
    if (newCenter.trim() !== '') {
      addCenter(newCenter);
      setNewCenter('');
    }
  };

  const handleDeleteCenter = (index) => {
    deleteCenter(index);
  };

  return (
    <div>
      <SuperSidebar />
      <div className="add-center-container">
        <h2>Centers List</h2>
        <table className="centers-table">
          <thead>
            <tr>
              <th>Center Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {centers.map((center, index) => (
              <tr key={index}>
                <td>{center}</td>
                <td className='delete-button'>
                  <button onClick={() => handleDeleteCenter(index)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="add-center-input">
          <input
            type="text"
            placeholder="Enter a new center"
            value={newCenter}
            onChange={handleInputChange}
          />
          <button onClick={handleAddCenter}>Add Center</button>
        </div>
      </div>
    </div>
  );
}

export default AddCenter;

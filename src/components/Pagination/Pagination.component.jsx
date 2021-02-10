import React from 'react';

import './Pagination.style.css';

const Pagination = ({contactsPerPage,totalContacts,paginate,currentPageNo}) => {

  const pageNumbers =[];

  for( let i=1; i <= Math.ceil(totalContacts/contactsPerPage);i++){
    pageNumbers.push(i);
  }
  
  return (
    <nav>
      <ul className="pagination">
        {
          pageNumbers.map((number) => (
        <li
            key={number}
            className={`page-item ${
              (number === currentPageNo) ? "current-page-item" :''}
              `}
          >
            <button onClick={()=> paginate(number)} className="page-link">
                 {number}
            </button>
        </li>
          ))
        }
      </ul>
      
    </nav>
  )
}

export default Pagination

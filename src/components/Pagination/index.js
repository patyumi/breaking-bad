import React from 'react';

// Folha de estilo CSS
import './index.css';

// Função recupera as páginas
const Pagination = ({ dataPerPage, totalData, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i<= Math.ceil(totalData / dataPerPage); i++){
    pageNumbers.push(i);
  }

  return (
      <ul>
        {pageNumbers.map(number => (
          <li key={number}>
            <button type="button" onClick={() => paginate(number)}>
              {number}
            </button>
          </li>
        ))}
      </ul>
  );
}

export default Pagination;

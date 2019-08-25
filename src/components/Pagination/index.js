import React, { useState, useEffect } from "react";

import "./index.css";
import { MdFirstPage, MdLastPage } from "react-icons/md";

// Componente principal do arquivo
const Pagination = props => {
  // Parâmetro armazena ID dos personagens para certa página
  const [offset, setOffset] = useState(0);

  // Armazena página atual
  const [page, setPage] = useState(1);

  // Seta o valor de offset para passar para o componente pai
  useEffect(() => {
    props.onClickCallback(offset, limit);
  }, [offset]);

  // Limite de dados que a consulta retornará
  const limit = 8;

  // Guarda a quantidade de páginas total de acordo com a quantidade de personagens
  const pageNumbers = [];

  // Total de dados no array (pode ser obtido no link api/characters)
  const totalCharacters = 57;

  // Soma a quantidade de páginas necessárias
  const totalPages = Math.round(totalCharacters / limit);

  // [totalPages] Seta os números das páginas no array
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  // Troca a página
  const changePage = n => {
    // Usuário na página inicial
    if (offset === 0) {
      setOffset(8 * (n - 1));
      setPage(n);
    }
    // Usuário tenta voltar a página
    if (n < page) {
      setOffset(offset - 8 * (page - n));
      setPage(n);
    }
    // Usuário tenta avançar a página
    if (n > page) {
      setOffset(offset + 8 * (n - page));
      setPage(n);
    }
  };

  return (
    <nav>
      <ul>
        <button
          type="button"
          onClick={() => {
            changePage(1);
          }}
          title="Ir à primeira página"
        >
          <MdFirstPage style={{ fontSize: "16px" }} />
        </button>
        {pageNumbers.map(n => (
          <li key={n}>
            {page === n ? (
              <button
                className="selected"
                type="button"
                onClick={() => changePage(n)}
              >
                {n}
              </button>
            ) : (
              <button type="button" onClick={() => changePage(n)}>
                {n}
              </button>
            )}
          </li>
        ))}
        <button
          type="button"
          onClick={() => changePage(7)}
          title="Ir à primeira página"
        >
          <MdLastPage style={{ fontSize: "16px" }} />
        </button>
      </ul>
    </nav>
  );
};

export default Pagination;

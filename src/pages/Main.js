import React, { useState, useEffect } from "react";

// Componentes
import Pagination from "../components/Pagination";
import Header from "../components/Header";
import Cards from "../components/Cards";

// Folhas de estilo CSS
import "../styles/main.css";

// Componente principal do arquivo
const Main = () => {
  // Armazena dados dos personagens
  const [data, setData] = useState([]);

  // Dados para buscar os personagens
  const [offset, setOffset] = useState();
  const [limit, setLimit] = useState();

  useEffect(() => {
    onClickData(data);
  }, [data]);

  // [Pagination] Seta os valores de offset e limit para linká-los com o componente filho
  const onClick = (offset, limit) => {
    setOffset(offset);
    setLimit(limit);
  };

  // [Header] Seta os valores de offset e limit para linká-los com o componente filho
  const onClickData = data => {
    setData(data);
  };

  return (
    <div className="background">
      <Header onClickCallback={data => onClickData(data)} />
      <Cards offset={offset} limit={limit} data={data} />

      {data.length !== 1 && (
        <Pagination
          onClickCallback={(offset, limit) => {
            onClick(offset, limit);
          }}
        />
      )}
    </div>
  );
};

export default Main;

import React, { useState, useEffect } from "react";

// Configuração do axios
import api from "../../services/api";

// Folhas de estilo / Ícones
import { MdStar } from "react-icons/md";
import "./index.css";

const Cards = props => {
  // Armazena dados dos personagens
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Recarrega dados quando a página é renderizada, ou quando o ID dos personagens muda
  useEffect(() => {
    getCharacters();
  }, [props.offset]);

  useEffect(() => {
    if (props.data !== 0) {
      setData(props.data);
    }
  }, [props.data]);

  // Busca personagens
  const getCharacters = async () => {
    const res = await api.get(
      `characters?limit=${props.limit}&offset=${props.offset}`
    );
    setData(res.data);
  };

  return (
    <div className="body">
      <header>
        {data.length === 1 ? (
          <>
            <h2>Você pesquisou por {data[0].name}</h2>
            <button type="button">Voltar</button>
          </>
        ) : (
          <h2>Personagens</h2>
        )}
      </header>

      <div className="card">
        {!loading ? (
          data.map(character => (
            <div
              key={character.char_id}
              style={{
                height: "480px",
                backgroundImage: `url('${character.img}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat"
              }}
            >
              <div className="card-body">
                <div className="card-header">
                  <div className="card-header-status">
                    {character.status === "Alive" ? (
                      <span style={{ background: "#2ECC71" }}>
                        {character.status}
                      </span>
                    ) : (
                      <span style={{ background: "#FF5733" }}>
                        {character.status}
                      </span>
                    )}
                  </div>
                  <div className="card-header-title">
                    <h2>{character.name}</h2>
                  </div>
                </div>

                <div className="card-footer">
                  <span className="birth">
                    <MdStar style={{ marginRight: "5px" }} />
                    {character.birthday}
                  </span>
                  <p>
                    {character.occupation.map(item => (
                      <span key={item}>{item}</span>
                    ))}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
    </div>
  );
};

export default Cards;

import React, { useState, useEffect } from "react";

// Configuração axios
import api from "../../services/api";

// Folhas de estilo CSS / Ícones / Logo
import "./index.css";
import { MdSearch } from "react-icons/md";
import logo from "../../assets/logo.png";

// Componente principal do arquivo
const Header = props => {
  // Armazena dados dos personagens
  const [data, setData] = useState([]);
  const [name, setName] = useState("");

  // Seta o valor de data para passar para o componente pai
  useEffect(() => {
    props.onClickCallback(data);
  }, [data]);

  // [name] Recupera valor digitado no input
  const onChange = evt => {
    setName(evt.target.value);
  };

  // Busca nome digitado pelo usuario
  const fetchCharacter = async(name) => {
    const res = await api.get(`characters?name=${name}`);
    setData(res.data);
    setName('');
  };

  return (
    <nav className="header">
      <img src={logo} alt="Breaking Bad" />
      <form>
        <input
          type="text"
          placeholder="Pesquise os personagens"
          value={name}
          onChange={onChange}
        />
        <button type="button" onClick={() => fetchCharacter(name)}>
          <MdSearch style={{ fontSize: "26px" }} />
        </button>
      </form>
    </nav>
  );
};

export default Header;

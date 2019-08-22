import React, { useEffect, useState } from 'react';

// Configuração axios
import api from '../services/api';

// Componentes
import Pagination from '../components/Pagination';

// Folhas de estilo CSS
import '../styles/global.css';
import '../styles/App.css';

// Ícones
import { MdSearch, MdStar } from 'react-icons/md';

// Imagem de logo
import logo from '../assets/logo.png';

// Componente principal do arquivo
const Main = () => {
  // HOOKS = useState
  const [name, setName] = useState('');
  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage, setDataPerPage] = useState(8);

  // HOOK = useEffect
  useEffect(() => {

    // Chama função para buscar os dados dos personagens
    fetchData();
  }, [])

    //Função busca os dados dos personagens
    const fetchData = async () => {
      setLoading(true);
      setName('');
      // Recupera dados através da api
      const res = await api.get('characters');
      setData(res.data);
      setLoading(false);
    }

  // Função de paginação
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Get current characters
  const indexOfLastPost = currentPage * dataPerPage;
  const indexOfFirstPost = indexOfLastPost - dataPerPage;
  const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost);

  // Controle do input de pesquisar nome do personagem
  const onChange = evt => {
    setName(evt.target.value);
  }

  // Função busca personagem pelo nome
  const fetchCharacter = name => {
    setLoading(true);
    api
      .get(`characters?name=${name}`)
      .then(res => {
        setData(res.data);
        setLoading(false);
      });
  }

  // Elementos do componente principal
  return (
    <div className="background">

      <nav class="header">
        <img src={logo} alt="Breaking Bad" onClick={() => fetchData()} />
        <form>
          <input type="text" placeholder="Pesquise os personagens" value={name} onChange={onChange} />
          <button type="button" onClick={() => fetchCharacter(name)}>
            <MdSearch style={{ fontSize: '26px'}} />
          </button>
        </form>
      </nav>

      <div className="body">
        <header>
          {(data.length === 1) ?
            <>
              <h2>Você pesquisou por "{name}"</h2>
              <button type="button" onClick={() => fetchData()}>Voltar</button>
            </>
            :
            <h2>Personagens</h2>
          }
        </header>

        <div className="card">

        { (!loading) ?
        (
          currentPosts.map(character => (
            <div key={character.char_id} style={{
              height: '480px',
              backgroundImage: `url('${character.img}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat"
            }}>
              <div className="card-body">
                <div className="card-header">
                  <div className="card-header-status">
                    {
                      (character.status === "Alive") ?
                      <span style={{ background: '#2ECC71'}}>{character.status}</span>
                      :
                      <span style={{ background: '#FF5733'}}>{character.status}</span>
                    }

                  </div>
                  <div className="card-header-title">
                    <h2>{character.name}</h2>
                  </div>
                </div>


                <div className="card-footer">
                  <span className="birth">
                    <MdStar style={{ marginRight: '5px'}}/>
                    {character.birthday}
                  </span>
                  <p>{character.occupation.map(item => <span>{item}</span>)}</p>
                </div>

              </div>
              </div>

          ))

        )
        :
        (<h1>Loading...</h1>)
        }

      </div>
      </div>
      <Pagination dataPerPage={dataPerPage} totalData={data.length} paginate={paginate} />
    </div>
  );
}

export default Main;

import React, { useEffect, useState } from 'react';
import api from './services/api';

// Componentes
import Pagination from './components/Pagination';

import './styles/global.css';
import './styles/App.css';
import { MdSearch, MdStar } from 'react-icons/md';
import logo from './assets/logo.png';

const App = () => {
  // HOOKS = useState
  const [name, setName] = useState('');
  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage, setDataPerPage] = useState(8);

  // Função
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const fetchData = async () => {
    setLoading(true);
    const res = await api.get('characters');
    setData(res.data);
    setLoading(false);
  }

  useEffect(() => {

    fetchData();
  }, [])

  // Get current posts
  const indexOfLastPost = currentPage * dataPerPage;
  const indexOfFirstPost = indexOfLastPost - dataPerPage;
  const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost);

  const onChange = evt => {
    setName(evt.target.value);
  }

  const fetchCharacter = name => {
    api
      .get(`characters?name=${name}`)
      .then(res => {
        setData(res.data);
        console.log('voce buscou', res.data);
      });
  }

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
            <h2>Você pesquisou por "{name}"</h2>
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
                  <p>{character.occupation.map(item => <span>{item} </span>)}</p>
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
      <Pagination postsPerPage={dataPerPage} totalPosts={data.length} paginate={paginate} />
    </div>
  );
}

export default App;

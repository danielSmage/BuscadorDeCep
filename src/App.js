import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import './styles.css';
import api from './services/api';

function App() {

  const [input, setInput] = useState('');
  const [cep, setCep] = useState({});


  async function handleSearch(){
    // 01001000/json/

    if(input === ''){
      alert('Campo não preenchido!')
      return;
    }

    try{
      const response = await api.get(`${input}/json`); //esperando a requisição
      setCep(response.data)
      setInput('');

    }catch{
      alert('Ops, ocorreu algum erro!');
      setInput('')
    }

  }

  return (
    <div className="container">
        <h2 className="title">CEP Buscador</h2>
        <p className='makeBy'>by DanyelS</p>

        <div className="container_input">
          <input 
          type="text"
          placeholder="Digite o CEP..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          />

          <button className="buttonSearch" onClick={handleSearch}>
            <FiSearch size={25} color='#FFF'/>
          </button>
        </div>

        {Object.keys(cep).length > 0 && (
        <main className='main'>
          <h2>CEP: {cep.cep}</h2>

          <span> Rua: {cep.logradouro} </span>
          <span> Bairro: {cep.bairro} </span>
          <span> {cep.localidade} - {cep.uf} </span>
        </main>          
        )}

    </div>
  );
}

export default App;

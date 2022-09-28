import { useState } from 'react';
import { FiSearch } from 'react-icons/fi'
import './services/api'
import api from './services/api';
import './styles.css'


function App() {
  const [Input , setInput]= useState('')
  const [cep, setCep] = useState([])

  async function handlesearch () {
    if(Input === '') {
      alert("Escreva seu CEP")
      return;
    }
      try{
        const response = await api.get(`${Input}/json`);
        setCep(response.data);
        setInput('')
      }catch{
        alert('OPS! Error')
        setInput('')
      }
    }
  


  return (
    <div className="container">
      <h1 className='title'>Buscador de Cep</h1>
    <div className="containerInput">
      <input
      type="text"
      placeholder="Digite seu cep..."
      value={Input}
      onChange={(e) => setInput(e.target.value)}
      />

      <button className='buttonsearch'>
        <FiSearch 
        onClick={handlesearch}
        size={25} color="#fff"
        />

      </button>
    </div>

   {Object.keys(cep).length > 0 && (
       <main className='main'>
       <h2>CEP:{cep.cep}</h2>

       <span>Rua: {cep.logradouro}</span>
       <span>Complemento: {cep.complemento}</span>
       <span>Bairro: {cep.bairro}</span>
       <span>{cep.localidade} - {cep.uf}</span>
     </main>
   )}
       
    </div>

  );
}

export default App;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './PokemanCard.css';
import Cookies from 'js-cookie'; 

const PokemonCard = () => {
  const [pokemon, setPokemon] = useState([]);
  // const [selectedPokemon, setSelectedPokemon] = useState(null);
  // const [loadingDetails, setLoadingDetails] = useState(false);
 //for search 
  const[searchTerm,setSearchTerm]=useState("");
  const[filterTerm,setFilterTerm]=useState("");

  const[offset,setOffset]=useState(0); 

  const limit=21;

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`)
      .then((res) => res.json())
      .then((data) => {
        setPokemon(data.results);
      });
  }, [offset]);

const userName = JSON.parse(localStorage.getItem("user"))?.name;//who is logged in

const Next = () => {
    setOffset((prev) => prev + limit);
    window.scrollTo({ top: 0, behavior: 'smooth' });   
  };

  const Prev = () => {
    setOffset((prev) => Math.max(prev - limit,0)); 
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

const handleLogout = () => {
  Cookies.remove('auth_token'); // Remove the auth cookie
    localStorage.removeItem("currentUser"); // clear user details
    navigate("/login");   
  };

  const handleCardClick = async (id) => 
    {
    // console.log("ID:", id);
    // setLoadingDetails(true);
    // try {
    //   const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    //   const data = await res.json();
    //   console.log("Data Fetched:", data);
    //   setSelectedPokemon(data);
    // } catch (error) {
    //   alert("Failed to load details.");
    // }
    // finally {
    //   setLoadingDetails(false);
    // }
    navigate(`/pokemon/${id}`);
  };

  // const closeModel = () => {
  //   setSelectedPokemon(null);
  // };

  const handleSearchClick = () => {
    setFilterTerm(searchTerm);
  };
  
  const filteredPokemon = pokemon.filter(poke =>
    poke.name.toLowerCase().includes(filterTerm.toLowerCase())
  );

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearchClick();
    }
  };

  return (
    <div className="main-wrapper">
      <nav className="navbar">
        <h2>Pokemon Go</h2>

        <div className="search-box">
          <input type="text"
          placeholder='Search Pokemon'
          value={searchTerm}
          onChange={(e)=>setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown} />
          <button onClick={handleSearchClick} className='btn-search'>Search</button>
        </div>
         
        <div className="nav-right">
          <span>Welcome, {userName}</span>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      </nav>

    <div className="container">
      <h1>Pokeman Card</h1>
      <div className="grid">

        {filteredPokemon.length > 0 ? (
            filteredPokemon.map((poke) => {
              const id = poke.url.split('/').filter(Boolean).pop();
              const imgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
          return (
            <div key={poke.name} className="card" onClick={() => handleCardClick(id)} >
              <div className="image-container" >
                <img src={imgUrl} alt={poke.name} />
              </div>

              <div className="info">
                {/* <span className="number">{id}.</span> */}
                <h3>{poke.name}</h3>
              </div>
            </div>
          );
        })
        ) : (
          <p>No Pokemon found.</p>
        )}
      </div>

      <div className="pagination">
          <button 
            className="page-btn" 
            onClick={Prev} 
            disabled={offset === 0} //no previous if on first page
          >
            &laquo; Previous
          </button>
          
          <button className="page-btn" onClick={Next}>
            Next &raquo;
          </button>
        </div>


      {/* Model render*/}
      {/* {selectedPokemon && (
        <div className="modal" onClick={closeModel}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closeModel}>&times;</button>
            <h2>{selectedPokemon.name.toUpperCase()}</h2>
            <img src={`${selectedPokemon.sprites.other.dream_world.front_default}`}
              alt={selectedPokemon.name}
              className='poke-img' />
            <div className="stats">
              <div className="stat-items">
                <strong>Height:</strong> {selectedPokemon.height}cm
              </div>
              <div className="stat-items">
                <strong>Weight:</strong> {selectedPokemon.weight}kg
              </div>
              <div className="stat-items">
                <strong>Abilties:</strong> {selectedPokemon?.abilities
                  ?.map(a => a.ability.name)
                  .join(', ')
                }
              </div>
            </div>
          </div>
        </div>)}
      {loadingDetails && !selectedPokemon && (
        <div className="modal-overlay">
          <h2 style={{ color: 'white' }}>Loading Details...</h2>
        </div>
      )}*/}
    </div>
    </div> 
  );
};

export default PokemonCard;


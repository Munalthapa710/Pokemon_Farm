import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './PokemanCard.css'; 

const PokemonDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then(res => res.json())
      .then(data => {
        setPokemon(data);
        setLoading(false);
      })
      .catch(() => navigate('/pokemon')); // go back if error
  }, [id, navigate]);

 if (loading) return <h2>Loading...</h2>;

  return (
    <div className="main-wrapper">
      <nav className="navbar">
        <button onClick={() => navigate("/pokemon")} className="logout-btn">
          &laquo; Back
        </button>
        <h2>#{pokemon.id} {pokemon.name.toUpperCase()}</h2>
      </nav>

      <div className="detail-container">
        <div className="detail-card">
          
          
          <img 
            src={`${pokemon.sprites.other.dream_world.front_default}`}
            alt={pokemon.name}
            className="detail-main-img"
          />

    
          <div className="stats">
            <div className="stat-box">
              <h3>Type</h3>
              <p>{pokemon.types.map(t => t.type.name).join(', ')}</p>
            </div>
            
            <div className="stat-box">
              <h3>Height</h3>
              <p>{pokemon.height * 10} cm</p>
            </div>

            <div className="stat-box">
              <h3>Weight</h3>
              <p>{pokemon.weight / 10} kg</p>
            </div>
            <div className="stat-box">
              <h3>Ability</h3>
              <p>{pokemon.abilities.map(a => a.ability.name).join(', ')}</p>
            </div>
            <div className="stat-box">
              <h3>Base Experience</h3>
              <p>{pokemon.base_experience}</p>
            </div>
            {/*<div className="stat-box">
              <h3>Stats</h3>
              {pokemon.stats.map(s => (
                <p key={s.stat.name}>
                  {s.stat.name}: {s.base_stat}
                </p>
              ))}
            </div>*/}
          </div>

        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;
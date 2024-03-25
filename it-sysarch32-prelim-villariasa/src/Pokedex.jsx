import { useEffect, useState } from "react";
import Pokemon from "./Pokemon";

function Pokedex() {
  const [pokemons, setPokemons] = useState([]);
  const [language, setLanguage] = useState("english");
  const [current, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true); // Set loading to true before starting the fetch
    fetch(`https://us-central1-it-sysarch32.cloudfunctions.net/pagination?page=${current}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setPokemons(data.data);
        setCurrentPage(data.currentPage);
        setTotalPages(data.totalPages);
        setLoading(false); // Set loading to false after fetching data
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false); // Set loading to false even in case of error
      });
  }, [current]);

  const handleLanguageChange = (diffLanguage) => {
    setLanguage(diffLanguage);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleBackPage = () => {
    if (current > 1) {
      setCurrentPage(current - 1); // Go back one page
    }
  };
  
  const isFirstPage = current === 1;

  const isLastPage = current === totalPages;
  

  const handleNextPage = () => {
    if (current < totalPages) {
      setCurrentPage(current + 1); // Go forward one page
    }
  };

  return (
    <div className="pokedex">
      {/* Language buttons */}
      <div className="language-buttons">
        <button onClick={() => handleLanguageChange("english")}>English</button>
        <button onClick={() => handleLanguageChange("japanese")}>Japanese</button>
        <button onClick={() => handleLanguageChange("chinese")}>Chinese</button>
        <button onClick={() => handleLanguageChange("french")}>French</button>
      </div>
      <div className="num-buttons">
      <button onClick={handleBackPage} className={isFirstPage ? 'disabled-button' : ''} disabled={isFirstPage || loading}>Back</button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
          <button key={pageNumber} onClick={() => handlePageChange(pageNumber)} disabled={loading}>{pageNumber}</button>
        ))}
        <button onClick={handleNextPage} className={isLastPage || loading ? 'disabled-button' : ''} disabled={isLastPage || loading}>Next</button> 
      </div>
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="pokemon-list">
          {pokemons.map((pokemon) => (
            <Pokemon 
              key={pokemon.id} 
              id={pokemon.id} 
              name={pokemon.name} 
              pokemon={pokemon} 
              language={language} 
              image={pokemon.image}
              HP={pokemon.base.HP}
              Speed={pokemon.base.Speed}
              Defense={pokemon.base.Defense}
              SPAttack={pokemon.base["Sp. Attack"]}
              attack={pokemon.base.Attack}
              SPDef={pokemon.base["Sp. Defense"]} 
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Pokedex;
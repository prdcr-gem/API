import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [films, setFilms] = useState([]);
  const [currentFilm, setCurrentFilm] = useState(null);
  const [banList, setBanList] = useState([]);

  const fetchFilms = async () => {
    const res = await fetch('https://ghibliapi.vercel.app/films');
    const data = await res.json();
    setFilms(data);
  };

  const getRandomFilm = () => {
    const availableFilms = films.filter(
      (film) =>
        !banList.includes(film.title) &&
        !banList.includes(film.director) &&
        !banList.includes(film.producer)
    );

    if (availableFilms.length === 0) {
      alert("Everything is banned! Try unbanning something.");
      return;
    }

    const randomIndex = Math.floor(Math.random() * availableFilms.length);
    setCurrentFilm(availableFilms[randomIndex]);
  };

  const toggleBan = (value) => {
    setBanList((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  useEffect(() => {
    fetchFilms();
  }, []);

  useEffect(() => {
    if (films.length > 0) getRandomFilm();
  }, [films]);

  return (
    <div className="App">
      <h1>🎥 Studio Ghibli Discover</h1>
      <p>Click Discover to explore Ghibli films. Ban directors or titles you don’t want to see!</p>

      {currentFilm && (
        <div className="card">
          <h2>{currentFilm.title}</h2>
          <img
            src={currentFilm.image}
            alt={currentFilm.title}
            style={{ maxWidth: '300px', borderRadius: '12px', margin: '1em auto' }}
          />

          <div className="attribute-buttons">
            <button onClick={() => toggleBan(currentFilm.title)}>
              {currentFilm.title}
            </button>
            <button onClick={() => toggleBan(currentFilm.director)}>
              {currentFilm.director}
            </button>
            <button onClick={() => toggleBan(currentFilm.producer)}>
              {currentFilm.producer}
            </button>
            <button disabled>{currentFilm.release_date}</button>
          </div>

          <p style={{ padding: '1em' }}>{currentFilm.description}</p>
        </div>
      )}

      <button onClick={getRandomFilm}>🌿 Discover</button>

      <div className="ban-list">
        <h3>🚫 Ban List</h3>
        {banList.length === 0 && <p>No items banned!</p>}
        {banList.map((item) => (
          <button
            key={item}
            onClick={() => toggleBan(item)}
            style={{
              backgroundColor: '#f87171',
              color: 'white',
              padding: '5px 10px',
              borderRadius: '8px',
              margin: '4px',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;

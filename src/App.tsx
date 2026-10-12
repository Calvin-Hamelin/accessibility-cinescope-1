import { useMemo, useState } from "react";
import posterAube from "./assets/aube.svg";
import posterMemoire from "./assets/memoire.svg";
import posterOrbite from "./assets/orbite.svg";

const films = [
  {
    id: 1,
    title: "Après l’aube",
    genre: "Drame",
    time: "18 h 10",
    available: true,
    poster: posterAube,
  },
  {
    id: 2,
    title: "La mémoire des murs",
    genre: "Documentaire",
    time: "19 h 30",
    available: false,
    poster: posterMemoire,
  },
  {
    id: 3,
    title: "Orbite 9",
    genre: "Science-fiction",
    time: "21 h 00",
    available: true,
    poster: posterOrbite,
  },
];

export default function App() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);
  const filteredFilms = useMemo(
    () =>
      films.filter((film) =>
        film.title.toLowerCase().includes(query.toLowerCase()),
      ),
    [query],
  );

  const toggleFavorite = (id: number) => {
    setFavorites((items) =>
      items.includes(id) ? items.filter((item) => item !== id) : [...items, id],
    );
  };

  return (
    <>
      <header className="topbar">
        <button type="button" className="brand" onClick={() => setQuery("")}>
          CinéScope
        </button>
        <nav className="menu" aria-label="Navigation principale">
          <a href="#programme">Programme</a>
          <a href="#infos">Informations</a>
        </nav>
      </header>

      <main className="page">
        <h1>Films à l’affiche</h1>
        <p className="intro">Découvrez la programmation de cette semaine.</p>
        <label className="sr-only" htmlFor="film-search">
          Rechercher un film
        </label>
        <input
          id="film-search"
          className="search"
          type="search"
          placeholder="Rechercher un film"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />

        <div id="programme" className="film-grid">
          {filteredFilms.map((film) => (
            <article className="film-card" key={film.id}>
              <img src={film.poster} alt="" />
              <div className="film-content">
                <div
                  className={
                    film.available
                      ? "availability available"
                      : "availability unavailable"
                  }
                  aria-hidden="true"
                />
                <h2>{film.title}</h2>
                <p>
                  {film.genre} · {film.time}
                </p>
                <span className="sr-only">
                  {film.available ? "Disponible" : "Indisponible"}
                </span>
                <button
                  type="button"
                  className="film-select"
                  onClick={() => setSelected(film.title)}
                  aria-label={`Sélectionner ${film.title}`}
                />
                <button
                  type="button"
                  className="favorite"
                  onClick={() => toggleFavorite(film.id)}
                  aria-label={`${favorites.includes(film.id) ? "Retirer" : "Ajouter"} ${film.title} ${favorites.includes(film.id) ? "des" : "aux"} favoris`}
                  aria-pressed={favorites.includes(film.id)}
                >
                  <span aria-hidden="true">
                    {favorites.includes(film.id) ? "★" : "☆"}
                  </span>
                </button>
              </div>
            </article>
          ))}
        </div>

        {selected && (
          <p className="selection" role="status">
            Film sélectionné : {selected}
          </p>
        )}
      </main>
    </>
  );
}

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import "../styles/Home.css";

const API_KEY = "3d89e03b";

function Home() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("spider");

  const navigate = useNavigate();

  const fetchMovies = async (query = "", type = "movie" , year = "") => {
    const res = await fetch(
      `https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}&type=${type}&year=${year}`
    );

    const data = await res.json();

    if (data.Search) {
      setMovies(data.Search);
    } else {
      setMovies([]);
    }
  };

  useEffect(() => {
    fetchMovies("spider", "movie");
  }, []);

  return (
    <div className="home">
      <Header
        onMoviesClick={() => fetchMovies("spider", "movie")}
        onTvClick={() => fetchMovies("friends", "series")}
      />


      <section className="hero">
        <div className="hero-content">
          <h1>Welcome.</h1>

          <h2>
            Millions of movies, TV shows and people to discover. Explore now.
          </h2>

          <div className="hero-search">
            <input
              type="text"
              placeholder="Search for a movie, tv show, person......"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <button onClick={() => fetchMovies(search, "movie")}>
              Search
            </button>
          </div>
        </div>
      </section>

      <section className="trending">
        <div className="trending-title">
          <h2>Trending</h2>

          <div className="toggle">
            <button
              className="active"
              onClick={() => fetchMovies("marvel", "movie")}
            >
              Today
            </button>

            <button onClick={() => fetchMovies("batman","movie","1995")}>
              This Week
            </button>
          </div>
        </div>

        <div className="movie-row">
          {movies.map((movie) => (
            <div
              className="movie-card"
              key={movie.imdbID}
              onClick={() => navigate(`/movie/${movie.imdbID}`)}
            >

              <img
                src={
                  movie.Poster !== "N/A"
                    ? movie.Poster
                    : "https://via.placeholder.com/300x450?text=No+Image"
                }
                alt={movie.Title}
              />

              <h3>{movie.Title}</h3>
              <p>{movie.Year}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
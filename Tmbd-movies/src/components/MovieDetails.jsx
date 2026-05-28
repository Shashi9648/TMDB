import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";
import "../styles/MovieDetails.css";

const API_KEY = "3d89e03b";

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const res = await fetch(
        `https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}&plot=full`
      );

      const data = await res.json();
      setMovie(data);
    };

    fetchMovieDetails();
  }, [id]);

  if (!movie) return <h2>Loading...</h2>;

  return (
    <div>
      <Header />

      <div className="details-page">
        <div className="poster-box">
          <img
            src={
              movie.Poster !== "N/A"
                ? movie.Poster
                : "https://via.placeholder.com/300x450?text=No+Image"
            }
            alt={movie.Title}
          />
        </div>

        <div className="details-info">
          <h1>{movie.Title}</h1>

          <p className="sub-info">
            {movie.Year} • {movie.Rated} • {movie.Runtime}
          </p>

          <p className="genre">{movie.Genre}</p>

          <div className="rating-box">
            <div>
              <h3>IMDb</h3>
              <p>{movie.imdbRating}/10</p>
            </div>

            <div>
              <h3>Votes</h3>
              <p>{movie.imdbVotes}</p>
            </div>

            <div>
              <h3>Metascore</h3>
              <p>{movie.Metascore}</p>
            </div>
          </div>

          <h2>Overview</h2>
          <p className="plot">{movie.Plot}</p>

          <div className="info-grid">
            <p><b>Released:</b> {movie.Released}</p>
            <p><b>Director:</b> {movie.Director}</p>
            <p><b>Writer:</b> {movie.Writer}</p>
            <p><b>Actors:</b> {movie.Actors}</p>
            <p><b>Language:</b> {movie.Language}</p>
            <p><b>Country:</b> {movie.Country}</p>
            <p><b>Awards:</b> {movie.Awards}</p>
            <p><b>Box Office:</b> {movie.BoxOffice}</p>
            <p><b>Type:</b> {movie.Type}</p>
            <p><b>IMDb ID:</b> {movie.imdbID}</p>
          </div>

          <h2>Ratings</h2>

          <div className="ratings-list">
            {movie.Ratings?.map((rate, index) => (
              <div className="rating-card" key={index}>
                <h4>{rate.Source}</h4>
                <p>{rate.Value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
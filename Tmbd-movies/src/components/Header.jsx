import { useNavigate } from "react-router-dom";
import "../styles/Header.css";

function Header({ onMoviesClick, onTvClick }) {
  const navigate = useNavigate();

  const storedCandidate = localStorage.getItem("Candidate");
  const token = localStorage.getItem("token");

  let candidate = null;

  try {
    candidate =
      storedCandidate && storedCandidate !== "undefined"
        ? JSON.parse(storedCandidate)
        : null;
  } catch {
    candidate = null;
  }

  const isLoggedIn = token && candidate;

  const handleLogout = () => {
    localStorage.removeItem("Candidate");
    localStorage.removeItem("token");
    navigate("/home");
  };

  return (
    <header className="header">
      <div className="left-header">
        <div className="logo" onClick={() => navigate("/home")}>
          TMDB <span></span>
        </div>

        <nav>
          <button onClick={onMoviesClick}>Movies</button>
          <button onClick={onTvClick}>TV Shows</button>
        </nav>
      </div>

      <div className="right-header">
        {isLoggedIn ? (
          <>
            <button className="auth" onClick={() => navigate("/profile")}>
              Hi, {candidate.name}
            </button>

            <button className="auth" onClick={handleLogout}>
              Logout
            </button>

          </>
        ) : (
          <>
            <button className="auth" onClick={() => navigate("/login")}>
              Login
            </button>

            <button className="auth" onClick={() => navigate("/signup")}>
              Signup
            </button>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
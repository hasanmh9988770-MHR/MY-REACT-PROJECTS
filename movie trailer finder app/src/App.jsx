import { useState } from "react";
import "./App.css";
import ReactPlayer from "react-player";
import movieTrailer from "movie-trailer";

function App() {
  const [movie, setMovie] = useState("Inception");

  const [videoURL, setVideoURL] = useState(
    "https://www.youtube.com/watch?v=YoHD9XEInc0"
  );

  const [loading, setLoading] = useState(false);

  async function handleSearch() {
    if (!movie.trim()) {
      alert("Please enter a movie or TV show name.");
      return;
    }

    setLoading(true);

    try {
      const trailerURL = await movieTrailer(movie);

      if (trailerURL) {
        setVideoURL(trailerURL);
      } else {
        alert("Trailer not found.");
      }
    } catch (error) {
      console.error("Error finding trailer:", error);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      handleSearch();
    }
  }

  return (
    <div className="App">
      <h1>🎬 Movie Trailer App</h1>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search for a movie or TV show..."
          value={movie}
          onChange={(e) => setMovie(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        <button onClick={handleSearch}>
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      <div className="player-container">
        <ReactPlayer
          src={videoURL}
          controls
          width="100%"
          height="100%"
        />
      </div>
    </div>
  );
}

export default App;
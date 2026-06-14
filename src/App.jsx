import { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  const [memes, setMemes] = useState([]);
  const [meme, setMeme] = useState({
    topText: "",
    bottomText: "",
    randomImg: ""
  });

  // Fetch memes once
  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((data) => setMemes(data.data.memes))
      .catch((err) => console.error("Error fetching memes:", err));
  }, []);

  // Handle input
  function handleChange(e) {
    const { name, value } = e.target;
    setMeme((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  // Generate meme
  function generateMeme(e) {
    e.preventDefault();

    if (memes.length === 0) return;

    const randomIndex = Math.floor(Math.random() * memes.length);
    const url = memes[randomIndex].url;

    setMeme((prev) => ({
      ...prev,
      randomImg: url
    }));
  }

  return (
    <div className="app">
      <h1>🔥 Meme Generator</h1>

      <form className="form" onSubmit={generateMeme}>
        <input
          type="text"
          placeholder="Top text"
          name="topText"
          value={meme.topText}
          onChange={handleChange}
        />

        <input
          type="text"
          placeholder="Bottom text"
          name="bottomText"
          value={meme.bottomText}
          onChange={handleChange}
        />

        <button type="submit">Generate Meme 🚀</button>
      </form>

      <div className="meme">
        {meme.randomImg && (
          <>
            <img src={meme.randomImg} alt="meme" />

            <h2 className="top">{meme.topText}</h2>
            <h2 className="bottom">{meme.bottomText}</h2>
          </>
        )}
      </div>
    </div>
  );
}
import React, { useState, useEffect, useMemo, useCallback } from "react";
import { getAll } from "@divyanshu013/inspirational-quotes";
import "./App.css";

export default function App() {
  const [quotes, setQuotes] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    try {
      const quotesData = getAll();
      setQuotes(Array.isArray(quotesData) ? quotesData : []);
    } catch (error) {
      console.error("Failed to load quotes:", error);
      setQuotes([]);
    }
  }, []);

  const backgroundColors = useMemo(
    () => [
      "#8cc084",
      "#b7ebc3",
      "#ffb37e",
      "#7fa8d7",
      "#d8b4fe",
      "#fca5a5",
    ],
    []
  );

  const currentQuote = quotes[currentIndex] || null;

  const currentBackgroundColor = useMemo(() => {
    return backgroundColors[currentIndex % backgroundColors.length];
  }, [currentIndex, backgroundColors]);

  const handleNextClick = useCallback(() => {
    if (!quotes.length) return;
    setCurrentIndex((prev) => (prev + 1) % quotes.length);
  }, [quotes]);

  const handlePreviousClick = useCallback(() => {
    if (!quotes.length) return;
    setCurrentIndex((prev) =>
      prev === 0 ? quotes.length - 1 : prev - 1
    );
  }, [quotes]);

  return (
    <div
      className="content"
      style={{ backgroundColor: currentBackgroundColor }}
    >
      <h1 id="top">Quote Generator</h1>

      <h2>Inspirational Quotes</h2>

      {currentQuote ? (
        <>
          <blockquote>
            <p>"{currentQuote.quote}"</p>
          </blockquote>

          <h3>— {currentQuote.author}</h3>

          {currentQuote.source && (
            <p className="source">{currentQuote.source}</p>
          )}
        </>
      ) : (
        <p>Loading quotes...</p>
      )}

      <div className="button-container">
        <button onClick={handlePreviousClick}>Previous</button>
        <button onClick={handleNextClick}>Next</button>

        <button
          onClick={() =>
            window.open(
              `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                window.location.href
              )}`,
              "_blank"
            )
          }
        >
          Share on Facebook
        </button>
      </div>
    </div>
  );
}
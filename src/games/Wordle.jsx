import React, { useState, useEffect } from 'react';
import '../pages/GrainArticle.css';

const WORD_LENGTH = 5;
const MAX_GUESSES = 6;

// Themed answers
const THEMED_SOLUTIONS = [
  "AGORA", "POLIS", "WHEAT", "CIVIC", "DEMOS", 
  "ETHOS", "LOGOS", "MYTHS", "DRACH", "OLIVE", 
  "SLAVE", "TRADE", "SHIPS", "ATTIC", "SOLON",
  "MONEY", "GRAIN", "GREEK", "POWER", "OATHS"
];

// URL for a standard 5-letter word dictionary (commonly used for Wordle clones)
const DICTIONARY_URL = 'https://raw.githubusercontent.com/tabatkins/wordle-list/main/words';

function Wordle() {
  const [solution, setSolution] = useState("");
  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [gameStatus, setGameStatus] = useState('loading'); // loading, playing, won, lost
  const [shake, setShake] = useState(false);
  const [message, setMessage] = useState("");
  const [validWords, setValidWords] = useState(new Set());

  // Initialize Game
  useEffect(() => {
    const initGame = async () => {
      // 1. Pick a solution
      const randomWord = THEMED_SOLUTIONS[Math.floor(Math.random() * THEMED_SOLUTIONS.length)];
      setSolution(randomWord);

      // 2. Fetch dictionary for validation
      try {
        const response = await fetch(DICTIONARY_URL);
        const text = await response.text();
        const wordList = new Set(text.split('\n').map(w => w.toUpperCase().trim()));
        
        // Ensure our themed words are considered valid too
        THEMED_SOLUTIONS.forEach(w => wordList.add(w));
        
        setValidWords(wordList);
        setGameStatus('playing');
      } catch (error) {
        console.error("Failed to load dictionary", error);
        // Fallback: minimal set if fetch fails + themed words
        setValidWords(new Set(THEMED_SOLUTIONS)); 
        setGameStatus('playing');
      }
    };

    initGame();
  }, []);

  // Handle Input
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (gameStatus !== 'playing') return;

      const key = e.key.toUpperCase();

      if (key === 'ENTER') {
        handleSubmit();
      } else if (key === 'BACKSPACE') {
        setCurrentGuess(prev => prev.slice(0, -1));
      } else if (/^[A-Z]$/.test(key)) {
        if (currentGuess.length < WORD_LENGTH) {
          setCurrentGuess(prev => prev + key);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentGuess, gameStatus, validWords]); // Added validWords dep

  const handleSubmit = () => {
    if (currentGuess.length !== WORD_LENGTH) {
      triggerShake("Not enough letters");
      return;
    }

    // Validation Check
    if (!validWords.has(currentGuess)) {
      triggerShake("Not in word list");
      return;
    }

    const newGuesses = [...guesses, currentGuess];
    setGuesses(newGuesses);
    setCurrentGuess("");

    if (currentGuess === solution) {
      setGameStatus('won');
      showMessage("Magnificent!");
    } else if (newGuesses.length >= MAX_GUESSES) {
      setGameStatus('lost');
      showMessage(`The word was ${solution}`);
    }
  };

  const triggerShake = (msg) => {
    setMessage(msg);
    setShake(true);
    setTimeout(() => {
      setShake(false);
      setMessage("");
    }, 1000);
  };

  const showMessage = (msg) => {
    setMessage(msg);
  };

  const handleReset = () => {
    const randomWord = THEMED_SOLUTIONS[Math.floor(Math.random() * THEMED_SOLUTIONS.length)];
    setSolution(randomWord);
    setGuesses([]);
    setCurrentGuess("");
    setGameStatus('playing');
    setMessage("");
  };

  // --- LOGIC: Advanced Coloring (Green Priority + Count check) ---
  const getGuessStyles = (guess) => {
    const solutionChars = solution.split('');
    const guessChars = guess.split('');
    const status = Array(WORD_LENGTH).fill('absent');

    // Pass 1: Find Greens (Correct Position)
    // We must do this first so they "consume" the letter in the solution
    guessChars.forEach((char, i) => {
      if (char === solutionChars[i]) {
        status[i] = 'correct';
        solutionChars[i] = null; // Mark this specific letter instance as used
      }
    });

    // Pass 2: Find Yellows (Present but Wrong Position)
    guessChars.forEach((char, i) => {
      if (status[i] !== 'correct') {
        const indexInSolution = solutionChars.indexOf(char);
        if (indexInSolution > -1) {
          status[i] = 'present';
          solutionChars[indexInSolution] = null; // Mark this instance as used
        }
      }
    });

    return status;
  };

  // --- LOGIC: Keyboard Coloring ---
  const getKeyStatus = (key) => {
    let bestStatus = 'default';

    for (const guess of guesses) {
      const styles = getGuessStyles(guess); // Recalculate styles for accuracy
      for (let i = 0; i < WORD_LENGTH; i++) {
        if (guess[i] === key) {
          const currentStyle = styles[i];
          
          if (currentStyle === 'correct') {
            return 'correct'; // Green beats everything
          }
          if (currentStyle === 'present' && bestStatus !== 'correct') {
            bestStatus = 'present';
          }
          if (currentStyle === 'absent' && bestStatus === 'default') {
            bestStatus = 'absent';
          }
        }
      }
    }
    return bestStatus;
  };

  const onKeyClick = (key) => {
    if (gameStatus !== 'playing') return;
    if (key === 'ENTER') handleSubmit();
    else if (key === '⌫') setCurrentGuess(prev => prev.slice(0, -1));
    else if (currentGuess.length < WORD_LENGTH) setCurrentGuess(prev => prev + key);
  };

  return (
    <div className="grain-article-page" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
      <style>{`
        .wordle-container {
          max-width: 500px;
          width: 100%;
          padding: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .grid-container {
          display: grid;
          grid-template-rows: repeat(6, 1fr);
          gap: 5px;
          margin-bottom: 30px;
        }

        .row {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 5px;
        }

        .tile {
          width: 52px;
          height: 52px;
          border: 2px solid #D2B48C;
          background: rgba(249, 243, 232, 0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Inter', sans-serif;
          font-weight: 800;
          font-size: 1.5rem;
          color: #3d2817;
          text-transform: uppercase;
          user-select: none;
        }

        .tile.active {
          border-color: #3d2817;
          animation: pop 0.1s;
        }

        @keyframes pop {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }

        .tile.correct { background-color: #65a30d; border-color: #65a30d; color: white; }
        .tile.present { background-color: #eab308; border-color: #eab308; color: white; }
        .tile.absent { background-color: #787c7e; border-color: #787c7e; color: white; }

        .row.revealed .tile {
          animation: flip 0.5s ease forwards;
        }
        
        .row.revealed .tile:nth-child(2) { animation-delay: 0.1s; }
        .row.revealed .tile:nth-child(3) { animation-delay: 0.2s; }
        .row.revealed .tile:nth-child(4) { animation-delay: 0.3s; }
        .row.revealed .tile:nth-child(5) { animation-delay: 0.4s; }

        @keyframes flip {
          0% { transform: rotateX(0); }
          50% { transform: rotateX(90deg); }
          100% { transform: rotateX(0); }
        }

        .shake { animation: shake 0.5s; }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }

        .keyboard {
          display: flex;
          flex-direction: column;
          gap: 8px;
          width: 100%;
        }

        .kb-row {
          display: flex;
          justify-content: center;
          gap: 6px;
        }

        .kb-key {
          font-family: 'Inter', sans-serif;
          font-weight: 600;
          height: 50px;
          border-radius: 4px;
          border: none;
          background: #d3c6b4;
          color: #3d2817;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          text-transform: uppercase;
          flex: 1;
          min-width: 30px;
          max-width: 45px;
          user-select: none;
        }

        .kb-key.wide { flex: 1.5; max-width: 70px; font-size: 0.8rem; }
        .kb-key.correct { background: #65a30d; color: white; }
        .kb-key.present { background: #eab308; color: white; }
        .kb-key.absent { background: #787c7e; color: white; }

        .message-toast {
          position: fixed;
          top: 15%;
          left: 50%;
          transform: translateX(-50%);
          background: #3d2817;
          color: #f4e8d0;
          padding: 15px 25px;
          border-radius: 4px;
          font-weight: bold;
          z-index: 100;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }

        .btn-reset {
          margin-top: 20px;
          padding: 10px 20px;
          background: #3d2817;
          color: #f4e8d0;
          border: none;
          border-radius: 20px;
          cursor: pointer;
          font-weight: bold;
        }

        @media (max-width: 500px) {
          .tile { width: 45px; height: 45px; }
          .kb-key { height: 45px; font-size: 0.9rem; }
        }
      `}</style>

      {/* Header */}
      <div className="article-header" style={{ width: '100%', maxWidth: '900px', borderBottom: 'none', marginBottom: '10px' }}>
        <h1>The Athenian Wordle</h1>
        <div className="article-meta">Guess the 5-letter word associated with ancient Greece</div>
      </div>

      <div className="wordle-container">
        
        {message && <div className="message-toast">{message}</div>}

        {gameStatus === 'loading' ? (
          <div>Loading Dictionary...</div>
        ) : (
          <>
            <div className="grid-container">
              {/* Previous Guesses */}
              {guesses.map((guess, i) => {
                const styles = getGuessStyles(guess);
                return (
                  <div key={i} className="row revealed">
                    {Array.from({ length: WORD_LENGTH }).map((_, j) => (
                      <div key={j} className={`tile ${styles[j]}`}>
                        {guess[j]}
                      </div>
                    ))}
                  </div>
                );
              })}

              {/* Current Guess */}
              {gameStatus === 'playing' && guesses.length < MAX_GUESSES && (
                <div className={`row ${shake ? 'shake' : ''}`}>
                  {Array.from({ length: WORD_LENGTH }).map((_, j) => {
                    const char = currentGuess[j];
                    return (
                      <div key={j} className={`tile ${char ? 'active' : ''}`}>
                        {char}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Empty Rows */}
              {Array.from({ length: MAX_GUESSES - 1 - guesses.length }).map((_, i) => (
                <div key={i + guesses.length + 1} className="row">
                  {Array.from({ length: WORD_LENGTH }).map((_, j) => (
                    <div key={j} className="tile"></div>
                  ))}
                </div>
              ))}
            </div>

            {/* Keyboard */}
            <div className="keyboard">
              <div className="kb-row">
                {['Q','W','E','R','T','Y','U','I','O','P'].map(key => (
                  <button key={key} className={`kb-key ${getKeyStatus(key)}`} onClick={() => onKeyClick(key)}>{key}</button>
                ))}
              </div>
              <div className="kb-row">
                {['A','S','D','F','G','H','J','K','L'].map(key => (
                  <button key={key} className={`kb-key ${getKeyStatus(key)}`} onClick={() => onKeyClick(key)}>{key}</button>
                ))}
              </div>
              <div className="kb-row">
                <button className="kb-key wide" onClick={() => onKeyClick('ENTER')}>ENTER</button>
                {['Z','X','C','V','B','N','M'].map(key => (
                  <button key={key} className={`kb-key ${getKeyStatus(key)}`} onClick={() => onKeyClick(key)}>{key}</button>
                ))}
                <button className="kb-key wide" onClick={() => onKeyClick('⌫')}>⌫</button>
              </div>
            </div>

            {gameStatus !== 'playing' && (
              <button className="btn-reset" onClick={handleReset}>Play Again</button>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Wordle;
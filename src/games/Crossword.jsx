import React, { useState, useRef, useEffect } from 'react';
import '../pages/GrainArticle.css';

// --- Configuration & Data ---

// 15x15 Grid to accommodate the larger layout
// Legend: '.' = Black Square, Letters = Answer
const INITIAL_GRID = [
  ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
  ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', 'W', 'A', 'L', 'L', '.'],
  ['.', '.', '.', 'A', 'M', 'P', 'H', 'O', 'R', 'A', '.', 'G', '.', '.', '.'],
  ['.', '.', '.', '.', 'E', '.', '.', '.', '.', '.', '.', 'O', '.', '.', '.'],
  ['.', '.', '.', '.', 'D', '.', '.', '.', '.', '.', '.', 'R', '.', 'D', '.'],
  ['.', '.', '.', 'S', 'I', 'T', 'O', 'P', 'H', 'Y', 'L', 'A', 'K', 'E', 'S'],
  ['.', '.', '.', '.', 'T', '.', '.', '.', '.', '.', '.', '.', '.', 'L', '.'],
  ['.', '.', '.', '.', 'E', '.', '.', '.', '.', '.', '.', '.', '.', 'O', '.'],
  ['.', '.', '.', 'C', 'R', 'I', 'M', 'E', 'A', '.', '.', '.', '.', 'S', '.'],
  ['.', '.', '.', '.', 'R', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
  ['A', 'L', 'E', 'X', 'A', 'N', 'D', 'E', 'R', '.', '.', '.', '.', '.', '.'],
  ['.', '.', '.', '.', 'N', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
  ['.', '.', '.', '.', 'E', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
  ['.', '.', '.', '.', 'A', 'R', 'I', 'S', 'T', 'O', 'T', 'L', 'E', '.', '.'],
  ['.', '.', '.', '.', 'N', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.']
];

const CLUES = {
  across: [
    { number: 1, text: "A lousy leader promised to build one for his city" },
    { number: 3, text: "Where oil is best kept" },
    { number: 6, text: "They keep grain safe" },
    { number: 7, text: "We import lots of grains from this northern area" },
    { number: 8, text: "The greatest" },
    { number: 9, text: "He did not write our constitution" },
  ],
  down: [
    { number: 2, text: "Where you may find the best grain" },
    { number: 4, text: "Our sea" },
    { number: 5, text: "The best book keeping in all of Hellenistic Greece" },
  ]
};

// Map coordinates "row-col" to clue numbers
const CELL_NUMBERS = {
  "1-10": 1, 
  "1-11": 2, // 'A' in WALL starts AGORA
  "2-3": 3,
  "2-4": 4,  // 'M' in AMPHORA starts MEDITERRANEAN
  "4-13": 5, // 'D' starts DELOS
  "5-3": 6,
  "8-3": 7,
  "10-0": 8,
  "13-4": 9, // 'A' starts ARISTOTLE (intersects MEDITERRANEAN)
};

function AthenianCrossword() {
  const [userGrid, setUserGrid] = useState(
    Array(15).fill(null).map(() => Array(15).fill(""))
  );
  const [focus, setFocus] = useState({ row: 1, col: 10 }); // Start at first clue
  const [direction, setDirection] = useState("across"); 
  const [isWon, setIsWon] = useState(false);
  const inputRefs = useRef([]);

  // Check Win Condition
  useEffect(() => {
    let correct = true;
    for (let r = 0; r < 15; r++) {
      for (let c = 0; c < 15; c++) {
        if (INITIAL_GRID[r][c] !== '.') {
          if (userGrid[r][c].toUpperCase() !== INITIAL_GRID[r][c]) {
            correct = false;
          }
        }
      }
    }
    if (correct && !isWon) setIsWon(true);
  }, [userGrid, isWon]);

  // Input Handling
  const handleKeyDown = (e, row, col) => {
    if (isWon) return;

    const key = e.key.toUpperCase();
    const isLetter = /^[A-Z]$/.test(key);

    if (isLetter) {
      const newGrid = [...userGrid];
      newGrid[row][col] = key;
      setUserGrid(newGrid);
      moveFocus(row, col, 1);
    } else if (key === 'BACKSPACE') {
      const newGrid = [...userGrid];
      newGrid[row][col] = "";
      setUserGrid(newGrid);
      moveFocus(row, col, -1);
    } else if (key === 'ARROWRIGHT') {
      setDirection('across');
      moveFocus(row, col, 1, 'across');
    } else if (key === 'ARROWLEFT') {
      setDirection('across');
      moveFocus(row, col, -1, 'across');
    } else if (key === 'ARROWDOWN') {
      setDirection('down');
      moveFocus(row, col, 1, 'down');
    } else if (key === 'ARROWUP') {
      setDirection('down');
      moveFocus(row, col, -1, 'down');
    }
  };

  const moveFocus = (row, col, step, overrideDir = null) => {
    const dir = overrideDir || direction;
    let nextRow = row;
    let nextCol = col;

    if (dir === 'across') {
      nextCol += step;
      // Wrap around logic for 15x15
      if (nextCol > 14) { nextCol = 0; nextRow++; }
      if (nextCol < 0) { nextCol = 14; nextRow--; }
    } else {
      nextRow += step;
      if (nextRow > 14) { nextRow = 0; nextCol++; }
      if (nextRow < 0) { nextRow = 14; nextCol--; }
    }

    if (nextRow >= 0 && nextRow < 15 && nextCol >= 0 && nextCol < 15) {
      // Recursively skip black squares
      if (INITIAL_GRID[nextRow][nextCol] === '.') {
        moveFocus(nextRow, nextCol, step, dir);
      } else {
        setFocus({ row: nextRow, col: nextCol });
        inputRefs.current[`${nextRow}-${nextCol}`]?.focus();
      }
    }
  };

  const handleCellClick = (row, col) => {
    if (INITIAL_GRID[row][col] === '.') return;
    if (focus.row === row && focus.col === col) {
      setDirection(direction === 'across' ? 'down' : 'across');
    } else {
      setFocus({ row, col });
    }
  };

  const isHighlighted = (r, c) => {
    if (INITIAL_GRID[r][c] === '.') return false;
    if (r === focus.row && c === focus.col) return true;
    if (direction === 'across' && r === focus.row) return INITIAL_GRID[r][c] !== '.';
    if (direction === 'down' && c === focus.col) return INITIAL_GRID[r][c] !== '.';
    return false;
  };

  return (
    <div className="grain-article-page" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
      <style>{`
        .crossword-wrapper {
          max-width: 900px;
          width: 100%;
          padding: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .game-layout {
          display: flex;
          flex-wrap: wrap;
          gap: 40px;
          justify-content: center;
          margin-top: 20px;
          width: 100%;
        }

        /* Grid Styling - Adjusted for larger grid */
        .grid {
          display: grid;
          /* 15 columns, using REM to scale naturally */
          grid-template-columns: repeat(15, 2.2rem);
          grid-template-rows: repeat(15, 2.2rem);
          gap: 2px;
          background: transparent;
        }

        .cell {
          width: 2.2rem;
          height: 2.2rem;
          background: rgba(249, 243, 232, 0.9);
          border: 1px solid #D2B48C;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Inter', sans-serif;
          font-weight: 700;
          font-size: 1rem;
          color: #3d2817;
          cursor: pointer;
          user-select: none;
        }

        .cell.black {
          background-color: transparent;
          border-color: transparent;
          pointer-events: none;
        }

        /* Highlight Logic */
        .cell.highlight {
          background-color: #e8dcc5;
        }

        .cell.focused {
          border-color: #3d2817;
          background-color: #eab308;
          color: white;
        }

        .cell input {
          width: 100%;
          height: 100%;
          border: none;
          background: transparent;
          text-align: center;
          font-family: inherit;
          font-size: inherit;
          font-weight: inherit;
          color: inherit;
          text-transform: uppercase;
          outline: none;
          cursor: pointer;
          padding: 0;
          margin: 0;
          caret-color: transparent;
        }

        .cell-number {
          position: absolute;
          top: 1px;
          left: 1px;
          font-size: 0.5rem;
          font-weight: 600;
          color: #3d2817;
          opacity: 0.8;
          pointer-events: none;
          line-height: 1;
        }
        
        .cell.focused .cell-number {
          color: white;
          opacity: 1;
        }

        /* Clues Styling */
        .clues-section {
          display: flex;
          gap: 40px;
          max-width: 800px;
          width: 100%;
          background: rgba(255,255,255,0.6);
          padding: 25px;
          border-radius: 8px;
          border: 1px solid #d3c6b4;
        }

        .clue-column {
          flex: 1;
          min-width: 200px;
        }

        .clue-column h3 {
          font-family: 'Inter', sans-serif;
          font-size: 1rem;
          text-transform: uppercase;
          border-bottom: 2px solid #3d2817;
          margin-bottom: 15px;
          padding-bottom: 5px;
          color: #3d2817;
          letter-spacing: 0.05em;
        }

        .clue-item {
          font-family: 'Inter', sans-serif;
          font-size: 0.9rem;
          margin-bottom: 10px;
          line-height: 1.4;
          color: #5c4033;
        }

        .clue-item strong {
          color: #3d2817;
          font-weight: 800;
          margin-right: 6px;
        }

        .congrats-modal {
          margin-top: 30px;
          padding: 15px 30px;
          background: #65a30d;
          color: white;
          border-radius: 20px;
          font-weight: bold;
          font-family: 'Inter', sans-serif;
          animation: pop 0.3s ease;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }

        @media (max-width: 768px) {
          .game-layout {
            flex-direction: column;
            align-items: center;
          }
          .grid {
            /* Shrink slightly for mobile */
            grid-template-columns: repeat(15, 1.4rem);
            grid-template-rows: repeat(15, 1.4rem);
          }
          .cell {
            width: 1.4rem;
            height: 1.4rem;
            font-size: 0.7rem;
          }
          .cell-number {
            font-size: 0.35rem;
          }
          .clues-section {
            flex-direction: column;
            gap: 20px;
          }
        }
      `}</style>

      {/* Header */}
      <div className="article-header" style={{ width: '100%', maxWidth: '900px', borderBottom: 'none', marginBottom: '10px' }}>
        <h1>The Athenian Mini</h1>
        <div className="article-meta">A puzzle on the Ancient Economy</div>
      </div>

      <div className="crossword-wrapper">
        <div className="game-layout">
          
          {/* Grid */}
          <div className="grid">
            {INITIAL_GRID.map((rowArr, r) => (
              rowArr.map((cellType, c) => {
                const isBlack = cellType === '.';
                const cellNum = CELL_NUMBERS[`${r}-${c}`];
                const active = !isBlack && focus.row === r && focus.col === c;
                const highlighted = !isBlack && isHighlighted(r, c);

                return (
                  <div 
                    key={`${r}-${c}`} 
                    className={`cell ${isBlack ? 'black' : ''} ${active ? 'focused' : ''} ${highlighted && !active ? 'highlight' : ''}`}
                    onClick={() => handleCellClick(r, c)}
                  >
                    {cellNum && <span className="cell-number">{cellNum}</span>}
                    {!isBlack && (
                      <input
                        ref={el => inputRefs.current[`${r}-${c}`] = el}
                        value={userGrid[r][c]}
                        onChange={() => {}} 
                        onKeyDown={(e) => handleKeyDown(e, r, c)}
                        maxLength={1}
                        autoComplete="off"
                      />
                    )}
                  </div>
                );
              })
            ))}
          </div>

          {/* Clues */}
          <div className="clues-section">
            <div className="clue-column">
              <h3>Across</h3>
              {CLUES.across.map(clue => (
                <div key={clue.number} className="clue-item">
                  <strong>{clue.number}</strong> {clue.text}
                </div>
              ))}
            </div>
            <div className="clue-column">
              <h3>Down</h3>
              {CLUES.down.map(clue => (
                <div key={clue.number} className="clue-item">
                  <strong>{clue.number}</strong> {clue.text}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {isWon && <div className="congrats-modal">Kudos! The grid is complete.</div>}
      </div>
    </div>
  );
}

export default AthenianCrossword;
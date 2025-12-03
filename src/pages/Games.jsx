import React from 'react'
import './Home.css' // Reusing main CSS for consistency

function Games() {
  const games = [
    {
      title: "Athenian Wordle",
      description: "A daily ritual of deduction. Guess the five-letter word in six tries or less.",
      icon: "🔠",
      url: "/wordle",
      color: "#65a30d" // Green for success
    },
    {
      title: "Athenian Connections",
      description: "Find the hidden threads that bind four distinct groups together. Order from chaos.",
      icon: "🔗",
      url: "/connections",
      color: "#d97706" // Gold/Yellow
    },
    {
      title: "Athenian Crossword",
      description: "The ultimate test of lexicon and lore. Fill the grid with knowledge.",
      icon: "📝",
      url: "/crossword",
      color: "#2563eb" // Blue
    }
  ]

  return (
    <div className="games-page" style={{ padding: '40px 20px', maxWidth: '1000px', margin: '0 auto' }}>
      
      {/* --- Page Header --- */}
      <header style={{ 
        borderBottom: '2px solid #8B7355', 
        paddingBottom: '20px', 
        marginBottom: '40px',
        textAlign: 'center'
      }}>
        <h1 style={{ fontFamily: 'serif', color: '#5A4A35', margin: '0 0 10px 0', fontSize: '3rem' }}>
          Daily Diversions
        </h1>
        <p style={{ color: '#8B7355', fontStyle: 'italic', fontSize: '1.1rem' }}>
          Mental Gymnastics for the Cultured Citizen
        </p>
      </header>

      {/* --- Games Grid --- */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '30px' 
      }}>
        {games.map((game, index) => (
          <a 
            key={index} 
            href={game.url}
            // Removed target="_blank" to open in same tab
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <div 
              className="game-card" 
              style={{ 
                backgroundColor: '#fff', 
                border: '1px solid #D2B48C', 
                borderRadius: '8px', 
                padding: '30px',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                transition: 'transform 0.2s, box-shadow 0.2s',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)'
                e.currentTarget.style.boxShadow = '0 10px 15px rgba(0,0,0,0.1)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              {/* Icon */}
              <div style={{ 
                fontSize: '48px', 
                marginBottom: '20px',
                backgroundColor: '#fdfbf7',
                width: '80px',
                height: '80px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%',
                border: `2px solid ${game.color}`
              }}>
                {game.icon}
              </div>

              {/* Title */}
              <h2 style={{ 
                fontFamily: 'serif', 
                color: '#2c2c2c', 
                margin: '0 0 15px 0',
                fontSize: '1.5rem'
              }}>
                {game.title}
              </h2>

              {/* Description */}
              <p style={{ 
                color: '#666', 
                lineHeight: '1.6', 
                marginBottom: '25px',
                flexGrow: 1
              }}>
                {game.description}
              </p>

              {/* Button */}
              <span style={{ 
                display: 'inline-block', 
                backgroundColor: '#8B7355', 
                color: '#fff', 
                padding: '10px 25px', 
                borderRadius: '4px', 
                fontSize: '0.9rem', 
                fontWeight: 'bold', 
                letterSpacing: '0.5px'
              }}>
                Play Now
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}

export default Games
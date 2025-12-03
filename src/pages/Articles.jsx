import React from 'react'
import { Link } from 'react-router-dom'
import delosImg from '../Images/Delos.jpg'
import './Home.css' // Reusing main CSS for consistency, plus inline styles for specific layout

function Articles() {
  return (
    <div className="articles-page" style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      
      {/* --- Page Header --- */}
      <header style={{ 
        borderBottom: '2px solid #8B7355', 
        paddingBottom: '15px', 
        marginBottom: '30px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline'
      }}>
        <h1 style={{ fontFamily: 'serif', color: '#5A4A35', margin: 0 }}>Market News & Analysis</h1>
        <span style={{ color: '#8B7355', fontStyle: 'italic' }}>The Athenian Daily</span>
      </header>

      {/* --- Main Content Grid (Yahoo Finance Style Layout) --- */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px' }}>
        
        {/* === Left Column: Hero Article (Grain Trade) === */}
        <div className="hero-section">
          <Link to="/grain" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="hero-card" style={{ cursor: 'pointer' }}>
              
              {/* Hero Image */}
              <div style={{ 
                width: '100%', 
                height: '400px', 
                backgroundColor: '#e6dec8', 
                marginBottom: '20px',
                borderRadius: '4px',
                overflow: 'hidden',
                border: '1px solid #D2B48C',
                position: 'relative'
              }}>
                <img 
                  src={delosImg} 
                  alt="Busy port of Delos" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{
                  position: 'absolute',
                  bottom: '0',
                  left: '0',
                  backgroundColor: '#8B7355',
                  color: '#fff',
                  padding: '5px 10px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  textTransform: 'uppercase'
                }}>
                  Market Spotlight
                </div>
              </div>

              {/* Hero Content */}
              <div className="hero-content">
                <div style={{ display: 'flex', gap: '10px', marginBottom: '10px', fontSize: '12px', color: '#666' }}>
                  <span style={{ color: '#d97706', fontWeight: 'bold' }}>WHT-ARC +0.42%</span>
                  <span>•</span>
                  <span>4 hours ago</span>
                </div>
                
                <h2 style={{ 
                  fontSize: '32px', 
                  fontFamily: 'serif', 
                  color: '#2c2c2c', 
                  margin: '0 0 15px 0',
                  lineHeight: '1.2'
                }}>
                  Navigating the Grain Trade: A Citizen’s Guide to the Agora
                </h2>
                
                <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#4a4a4a', marginBottom: '20px' }}>
                  With volatility in the Aegean shipping lanes, merchants are scrambling to secure stock. 
                  Our special report dives into the common scams at the Piraeus docks, new import regulations, 
                  and how to spot quality barley before you buy.
                </p>
                
                <span style={{ 
                  display: 'inline-block', 
                  borderBottom: '2px solid #8B7355', 
                  paddingBottom: '2px', 
                  fontWeight: 'bold', 
                  color: '#8B7355' 
                }}>
                  Read Full Column →
                </span>
              </div>
            </div>
          </Link>
        </div>

        {/* === Right Column: Sidebar / "Latest" === */}
        <div className="sidebar-section">
          <h3 style={{ 
            fontSize: '18px', 
            borderBottom: '1px solid #D2B48C', 
            paddingBottom: '10px', 
            margin: '0 0 20px 0',
            color: '#8B7355',
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}>
            Latest Analysis
          </h3>

          {/* Sidebar Article 1: Fair Price */}
          <Link to="/justprice" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="sidebar-card" style={{ 
              marginBottom: '25px', 
              paddingBottom: '25px', 
              borderBottom: '1px solid #e5e5e5',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              cursor: 'pointer'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <span style={{ fontSize: '11px', color: '#d97706', fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>
                    OVERVIEW
                  </span>
                  <h4 style={{ 
                    fontSize: '18px', 
                    fontFamily: 'serif', 
                    margin: '0 0 8px 0', 
                    color: '#2c2c2c',
                    lineHeight: '1.3'
                  }}>
                    The Moral Economy: What is a "Fair Price"?
                  </h4>
                </div>
                {/* Thumbnail placeholder */}
                <div style={{ 
                  width: '80px', 
                  height: '80px', 
                  backgroundColor: '#D2B48C', 
                  flexShrink: 0, 
                  marginLeft: '15px',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontSize: '24px'
                }}>
                  ⚖️
                </div>
              </div>
              
              <p style={{ fontSize: '14px', color: '#666', margin: 0, lineHeight: '1.5' }}>
                Are current wheat prices a result of natural scarcity or moral failing? 
                We present the opinions of this matter over the centuries.
              </p>
              
              <div style={{ fontSize: '11px', color: '#999', marginTop: '5px' }}>
                By Varying • 20 min ago
              </div>
            </div>
          </Link>

          {/* Sidebar Article 2: Lending Guide (REPLACED THE FAKE OLIVE OIL ARTICLE) */}
          <Link to="/lending" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="sidebar-card" style={{ 
              marginBottom: '25px', 
              paddingBottom: '25px', 
              borderBottom: '1px solid #e5e5e5',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              cursor: 'pointer'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <span style={{ fontSize: '11px', color: '#65a30d', fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>
                    FINANCE
                  </span>
                  <h4 style={{ 
                    fontSize: '18px', 
                    fontFamily: 'serif', 
                    margin: '0 0 8px 0', 
                    color: '#2c2c2c',
                    lineHeight: '1.3'
                  }}>
                    Lending Options: A Practical Guide for Borrowers
                  </h4>
                </div>
                {/* Thumbnail placeholder */}
                <div style={{ 
                  width: '80px', 
                  height: '80px', 
                  backgroundColor: '#8B7355', // Different color for distinction
                  flexShrink: 0, 
                  marginLeft: '15px',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontSize: '24px'
                }}>
                  🏛️
                </div>
              </div>
              
              <p style={{ fontSize: '14px', color: '#666', margin: 0, lineHeight: '1.5' }}>
                Need capital for a voyage or a landed loan? Compare rates between banks, temples, and private lenders.
              </p>
              
              <div style={{ fontSize: '11px', color: '#999', marginTop: '5px' }}>
                By Editor • 1 hr ago
              </div>
            </div>
          </Link>

          {/* Sidebar Article 3: Fake Filler (Kept for visual balance) */}
          <div className="sidebar-card" style={{ opacity: 0.6 }}>
            <span style={{ fontSize: '11px', color: '#dc2626', fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>
              WARNING
            </span>
            <h4 style={{ fontSize: '16px', fontFamily: 'serif', margin: '0 0 5px 0', color: '#2c2c2c' }}>
              Spartan currency devaluation: What it means for you
            </h4>
            <div style={{ fontSize: '11px', color: '#999' }}>Associated Press • 3 hrs ago</div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Articles
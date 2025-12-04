import React, { useState } from 'react';
import { Ruler, Scale, Coins, Milk, HelpCircle, CheckCircle, XCircle, BookOpen } from 'lucide-react';
import './GrainArticle.css';

const measurementData = {
  attic: {
    title: "Attic Measures (Athens)",
    icon: <Milk size={24} />,
    sections: [
      {
        subtitle: "Liquid Measures",
        rows: [
          { unit: "Kotulē", value: "0.27 liter" },
          { unit: "Chous (12 kotulai)", value: "3.28 liters" },
          { unit: "Metrētēs (12 choes)", value: "39.39 liters" }
        ]
      },
      {
        subtitle: "Dry Measures",
        rows: [
          { unit: "Kotulē", value: "0.27 liter" },
          { unit: "Choinix (4 kotulai)", value: "1.09 liters" },
          { unit: "Medimnos (48 choinikes)", value: "52.53 liters" },
          { unit: "— Weight (Barley)", value: "ca. 27 kg" },
          { unit: "— Weight (Wheat)", value: "ca. 31 kg" }
        ]
      },
      {
        subtitle: "Length & Area",
        rows: [
          { unit: "Foot", value: "0.296 meter" },
          { unit: "Plethron (Length)", value: "29.6 meters (100 feet)" },
          { unit: "Stadion", value: "177.6 meters" },
          { unit: "Plethron (Area)", value: "ca. 0.09 hectare" }
        ]
      }
    ]
  },
  currency: {
    title: "Currency & Weights",
    icon: <Coins size={24} />,
    sections: [
      {
        subtitle: "Currency Units (Silver Standard)",
        note: "These are units of account and monetary value.",
        rows: [
          { unit: "Obol (Silver)", value: "0.72 gram" },
          { unit: "Drachm (6 obols)", value: "4.33 grams" },
          { unit: "Mina (100 drachms)", value: "433 grams" },
          { unit: "Talent (60 minai)", value: "25.98 kg" }
        ]
      },
      {
        subtitle: "Commercial Weight Units",
        note: "Note: Commercial weights were slightly heavier than their currency counterparts.",
        rows: [
          { unit: "Drachm", value: "4.54 grams" },
          { unit: "Mina (100 drachms)", value: "454 grams" },
          { unit: "Talent (60 minai)", value: "27.279 kg" }
        ]
      }
    ]
  },
  foreign: {
    title: "Ptolemaic & Roman",
    icon: <Scale size={24} />,
    sections: [
      {
        subtitle: "Ptolemaic Measure Units",
        rows: [
          { unit: "Artaba (Dry)", value: "39.4 liters (uncertain value)" }
        ]
      },
      {
        subtitle: "Roman Measure Units (Simplified)",
        rows: [
          { unit: "Amphora (Liquid)", value: "ca. 26 liters" },
          { unit: "Modius (Dry)", value: "ca. 8.75 liters" },
          { unit: "Uncia (Weight)", value: "27 grams" },
          { unit: "Libra (Weight)", value: "324 grams (8 unciae)" }
        ]
      }
    ]
  }
};

const quizQuestions = [
  {
    question: "How many Obols make up one Silver Drachm?",
    options: ["4", "6", "12", "100"],
    correct: 1 
  },
  {
    question: "Which represents a larger volume?",
    options: ["Attic Medimnos", "Roman Amphora", "Ptolemaic Artaba", "Attic Metrētēs"],
    correct: 0 
  },
  {
    question: "True or False: A 'Talent' of silver currency weighed exactly the same as a 'Talent' used for commercial weight.",
    options: ["True", "False"],
    correct: 1 
  }
];

function Measurements() {
  const [activeTab, setActiveTab] = useState('attic');
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const activeData = measurementData[activeTab];

  const handleQuizAnswer = (optionIndex) => {
    setSelectedOption(optionIndex);
    const correct = optionIndex === quizQuestions[quizIndex].correct;
    
    setTimeout(() => {
      if (correct) setQuizScore(s => s + 1);
      
      if (quizIndex < quizQuestions.length - 1) {
        setQuizIndex(i => i + 1);
        setSelectedOption(null);
      } else {
        setShowScore(true);
      }
    }, 1500);
  };

  const resetQuiz = () => {
    setQuizIndex(0);
    setQuizScore(0);
    setShowScore(false);
    setSelectedOption(null);
  };

  return (
    <div className="grain-article-page">
      <style>{`
        /* Custom Scrollbar to match theme */
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #f4e8d0; 
        }
        ::-webkit-scrollbar-thumb {
          background: #8B7355; 
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #654321; 
        }

        /* Animations */
        .fade-in {
          animation: fadeIn 0.5s ease-in-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* Custom Tab System styling */
        .tab-grid {
          display: flex;
          gap: 15px;
          margin-bottom: 30px;
          flex-wrap: wrap;
        }

        .tab-button {
          flex: 1;
          display: flex;
          align-items: center;
          gap: 15px;
          padding: 15px;
          background: rgba(244, 232, 208, 0.5);
          border: 2px solid #D2B48C;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
          text-align: left;
          min-width: 200px;
        }

        .tab-button:hover {
          border-color: #8B4513;
          background: rgba(244, 232, 208, 0.8);
        }

        .tab-button.active {
          background: rgba(139, 115, 85, 0.15);
          border-color: #8B4513;
          box-shadow: 0 4px 6px rgba(0,0,0,0.05);
        }

        .tab-info h3 {
          margin: 0;
          color: #654321;
          font-family: 'Georgia', serif;
          font-size: 1.1em;
        }

        .active-source-header {
            display: flex;
            align-items: center;
            gap: 20px;
            margin-bottom: 25px;
            padding-bottom: 20px;
            border-bottom: 2px solid #D2B48C;
        }

        /* Measurement Table Specifics */
        .measurement-section {
          margin-bottom: 25px;
        }
        .section-title {
          color: #8B4513;
          font-size: 1.2em;
          margin-bottom: 15px;
          border-left: 4px solid #D2B48C;
          padding-left: 10px;
          font-family: 'Georgia', serif;
        }
        .note {
          font-size: 0.9em;
          font-style: italic;
          color: #666;
          margin-bottom: 10px;
        }
        .data-row {
          display: flex;
          justify-content: space-between;
          padding: 10px 0;
          border-bottom: 1px dashed #D2B48C;
        }
        .data-row:last-child {
          border-bottom: none;
        }
        .unit-name {
          font-weight: bold;
          color: #3d2817;
        }
        .unit-val {
          color: #654321;
        }

        /* Quiz Specifics */
        .options-grid {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        @media (max-width: 768px) {
            .tab-grid {
                flex-direction: column;
            }
        }
      `}</style>

      <div className="article-container">
        
        <header className="article-header">
          <h1>Ancient Standards & Measurements</h1>
          <div className="article-meta" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <Ruler size={18} />
                <span>Reference Data</span>
            </div>
            <span style={{ fontSize: '0.8em', fontStyle: 'italic', color: '#8B4513' }}>
                Based on: The Making of the Ancient Greek Economy
            </span>
          </div>
        </header>

        <div className="article-content">
          
          {/* Interactive Source Switcher */}
          <section id="measurements-app">
            
            <div className="tab-grid">
              {Object.entries(measurementData).map(([key, data]) => (
                <button 
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`tab-button ${activeTab === key ? 'active' : ''}`}
                >
                  <div style={{ padding: '8px', borderRadius: '50%', background: '#fff', border: '1px solid #D2B48C' }}>
                    {data.icon}
                  </div>
                  <div className="tab-info">
                    <h3>{data.title}</h3>
                  </div>
                </button>
              ))}
            </div>

            <div className="scam-section" style={{ background: 'rgba(244, 232, 208, 0.6)', minHeight: '400px' }}>
              <div key={activeTab} className="fade-in">
                
                <div className="active-source-header">
                  {activeData.icon}
                  <div>
                    <h2 style={{ margin: 0, fontSize: '1.8em', color: '#654321' }}>
                        {activeData.title}
                    </h2>
                  </div>
                </div>
                
                <div style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#3d2817' }}>
                   {activeData.sections.map((section, idx) => (
                    <div key={idx} className="measurement-section">
                        <h3 className="section-title">{section.subtitle}</h3>
                        {section.note && <p className="note">{section.note}</p>}
                        
                        <div className="measurement-table">
                            {section.rows.map((row, rIdx) => (
                            <div key={rIdx} className="data-row">
                                <span className="unit-name">{row.unit}</span>
                                <span className="unit-val">{row.value}</span>
                            </div>
                            ))}
                        </div>
                    </div>
                   ))}
                </div>

              </div>
            </div>

          </section>

          {/* Quiz Section */}
          <section id="quiz-app" style={{ marginTop: '40px' }}>
             <div className="scam-section" style={{ background: '#fff', border: '2px solid #8B7355' }}>
                <div className="active-source-header" style={{ justifyContent: 'center', border: 'none' }}>
                    <HelpCircle size={28} color="#8B4513" />
                    <h2 style={{ margin: 0, color: '#654321' }}>Knowledge Check</h2>
                </div>

                {showScore ? (
                    <div style={{ textAlign: 'center', padding: '20px' }}>
                    <h3 style={{ fontSize: '1.5em', color: '#654321' }}>You scored {quizScore} out of {quizQuestions.length}</h3>
                    <p style={{ color: '#8B4513', marginBottom: '20px' }}>
                        {quizScore === quizQuestions.length ? "Excellent! A true Agoranomos." : "Keep studying the tablets!"}
                    </p>
                    <button className="tab-button active" onClick={resetQuiz} style={{ display: 'inline-flex', width: 'auto', justifyContent: 'center' }}>
                        Retake Quiz
                    </button>
                    </div>
                ) : (
                    <div>
                    <p style={{ fontSize: '1.2em', marginBottom: '20px', textAlign: 'center', color: '#3d2817' }}>
                        Question {quizIndex + 1}/{quizQuestions.length}:<br/>
                        <strong>{quizQuestions[quizIndex].question}</strong>
                    </p>
                    
                    <div className="options-grid">
                        {quizQuestions[quizIndex].options.map((opt, i) => {
                        let btnStyle = {};
                        if (selectedOption !== null) {
                            if (i === quizQuestions[quizIndex].correct) {
                                btnStyle = { background: '#d4edda', borderColor: '#28a745', color: '#155724' };
                            } else if (i === selectedOption) {
                                btnStyle = { background: '#f8d7da', borderColor: '#dc3545', color: '#721c24' };
                            }
                        }

                        return (
                            <button 
                            key={i} 
                            className="tab-button"
                            style={{ ...btnStyle, justifyContent: 'space-between', marginBottom: '10px' }} 
                            onClick={() => !selectedOption && handleQuizAnswer(i)}
                            disabled={selectedOption !== null}
                            >
                            {opt}
                            {selectedOption !== null && i === quizQuestions[quizIndex].correct && <CheckCircle size={16} />}
                            {selectedOption !== null && i === selectedOption && i !== quizQuestions[quizIndex].correct && <XCircle size={16} />}
                            </button>
                        )
                        })}
                    </div>
                    </div>
                )}
             </div>
          </section>

        </div>
        

      </div>
    </div>
  )
}

export default Measurements;
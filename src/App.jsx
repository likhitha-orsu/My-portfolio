import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Plot from 'react-plotly.js';

// Custom Components
import BlurText from './BlurText';
import ScrollReveal from './ScrollReveal';

// Styles
import './index.css';

const BentoCard = ({ children, className = "" }) => {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left; 
    const y = e.clientY - rect.top;  
    cardRef.current.style.setProperty('--mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <div ref={cardRef} className={`bento-card ${className}`} onMouseMove={handleMouseMove}>
      {children}
    </div>
  );
};

function App() {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [isClicking, setIsClicking] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);

  // Welcome Screen Timer
  useEffect(() => {
    const welcomeTimer = setTimeout(() => {
      setShowWelcome(false);
    }, 3500);
    return () => clearTimeout(welcomeTimer);
  }, []);

  // Mouse tracking and Data fetching
  useEffect(() => {
    const updateMousePosition = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    axios.get('/api/data')
      .then(response => { setChartData(response.data); setLoading(false); })
      .catch(err => { console.error("Error fetching data:", err); setLoading(false); });

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <>
      {/* 1. WELCOME SCREEN */}
      {showWelcome && (
        <div className="welcome-screen">
          <h1 className="welcome-text">✨ Welcome to my portfolio</h1>
        </div>
      )}

      {/* 2. ABOUT ME MODAL */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setIsModalOpen(false)}>✕</button>
            <img 
              src="/profile.jpeg" 
              alt="Likhitha" 
              style={{ width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--accent-lt)', display: 'block', margin: '0 auto 1.5rem', boxShadow: '0 0 20px rgba(237, 147, 177, 0.4)' }}
              onError={(e) => { e.target.src = 'https://via.placeholder.com/150/ED93B1/17080D?text=L' }} 
            />
            <h2 style={{ color: 'var(--accent)', textAlign: 'center', marginBottom: '1.5rem', fontSize: '2rem' }}>About Me</h2>
            
            <BlurText
              text="Hi, I’m Likhitha, a passionate Full Stack and Python Developer focused on building modern, responsive, and user-friendly web applications. I enjoy transforming ideas into real-world digital solutions using clean code, creative design, and efficient problem-solving."
              delay={50}
              className="blur-description"
            />
            <BlurText
              text="I am deeply interested in Artificial Intelligence and continuously explore innovative technologies to improve my skills and develop impactful projects. My goal is to create smart, meaningful, and visually engaging digital experiences that make a difference."
              delay={400}
              className="blur-description"
            />
          </div>
        </div>
      )}

      <div className="portfolio-container">
        
        {/* 3. HEADER SECTION */}
        <header className="profile-header" style={{ border: '1px solid rgba(237, 147, 177, 0.4)' }}>
          <img 
            src="/profile.jpeg" 
            alt="Likhitha" 
            className="profile-img" 
            onError={(e) => { e.target.src = 'https://via.placeholder.com/220/ED93B1/17080D?text=L' }} 
          />
          <div className="profile-title">
            <h1 className="shiny-text">✨ Likhitha</h1>
            <h2 style={{ color: 'var(--accent)', fontWeight: '600', marginBottom: '1rem' }}>Computer Science Under Graduate & Full-Stack Developer</h2>
            
            <button 
              onClick={() => setIsModalOpen(true)}
              style={{
                background: 'linear-gradient(135deg, var(--accent), var(--accent-lt))', padding: '12px 28px',
                borderRadius: '30px', border: 'none', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer',
                boxShadow: '0 5px 15px rgba(212, 83, 126, 0.3)', transition: 'transform 0.2s ease, box-shadow 0.2s ease', marginTop: '0.5rem'
              }}
              onMouseOver={(e) => { e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = '0 8px 20px rgba(212, 83, 126, 0.4)'; }}
              onMouseOut={(e) => { e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = '0 5px 15px rgba(212, 83, 126, 0.3)'; }}
            >
              ✨ ABOUT ME
            </button>
            
            <div style={{ marginTop: '2rem', display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
              <a href="mailto:Likhithaorsu@gmail.com" style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: 'bold', fontSize: '1.1rem' }}>📧 Email</a>
              <a href="https://github.com/likhitha-orsu" target="_blank" rel="noreferrer" style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: 'bold', fontSize: '1.1rem' }}>💻 GitHub</a>
              <a href="https://www.linkedin.com/in/likhitha-orsu-5b2887311" target="_blank" rel="noreferrer" style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: 'bold', fontSize: '1.1rem' }}>🔗 LinkedIn</a>
            </div>
          </div>
        </header>

        {/* 4. MAIN STACKED CONTENT */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          
          <section>
            <ScrollReveal baseOpacity={0.1} enableBlur={true} baseRotation={3} blurStrength={4}>
              <BentoCard>
                <h3 style={{ color: 'var(--accent)', borderBottomColor: 'rgba(237, 147, 177, 0.4)' }}>🎓 Education</h3>
                <div style={{ marginTop: '1rem' }}>
                  <h4 style={{ color: 'var(--accent)', fontSize: '1.2rem', margin: '0 0 8px 0' }}>B.Tech in Computer Science</h4>
                  <p style={{ color: 'var(--text)', margin: '8px 0', fontSize: '1.1rem', fontWeight: '500' }}>Anantha Laksmi Institute of Technology and Sciences</p>
                  <p style={{ color: 'var(--accent-lt)', fontSize: '1rem', margin: '5px 0', fontWeight: 'bold' }}>Graduation: 2027 | CGPA: 8.41</p>
                  <p style={{ color: 'var(--text)', opacity: 0.7, fontSize: '0.9rem' }}>Anantapur, Andhra Pradesh</p>
                </div>
              </BentoCard>
            </ScrollReveal>
          </section>

          <section>
            <ScrollReveal baseOpacity={0.1} enableBlur={true} baseRotation={3} blurStrength={4}>
              <BentoCard>
                <h3 style={{ color: 'var(--accent)', borderBottomColor: 'rgba(237, 147, 177, 0.4)' }}>🛠️ Core Technologies</h3>
                <ul className="skills-list" style={{ marginTop: '1rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '10px' }}>
                  <li><strong style={{ color: 'var(--accent)' }}>Languages:</strong> Java, Python, JavaScript</li>
                  <li><strong style={{ color: 'var(--accent)' }}>Frontend:</strong> React, Three.js, HTML/CSS</li>
                  <li><strong style={{ color: 'var(--accent)' }}>Backend:</strong> Node/FastAPI, MySQL, MongoDB, PostgreSQL</li>
                  <li><strong style={{ color: 'var(--accent)' }}>Concepts:</strong> OOPS, DSA, Authentication</li>
                </ul>
              </BentoCard>
            </ScrollReveal>
          </section>

          <section>
            <ScrollReveal baseOpacity={0.1} enableBlur={true} baseRotation={3} blurStrength={4}>
              <BentoCard>
                <h3 style={{ color: 'var(--accent)', borderBottomColor: 'rgba(237, 147, 177, 0.4)' }}>🚀 Featured Innovations</h3>
                <div className="projects-grid" style={{ marginTop: '1.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                  <div style={{ background: 'rgba(23, 8, 13, 0.03)', border: '1px solid rgba(237, 147, 177, 0.2)', padding: '1.5rem', borderRadius: '15px' }}>
                    <h4 className="project-title" style={{ color: 'var(--accent)' }}>AI Image Generation</h4>
                    <p style={{ color: 'var(--text)', opacity: 0.85, fontSize: '0.95rem', lineHeight: '1.5' }}>Web app utilizing AI APIs with JWT authentication. Integrated secure API calls with a responsive React UI.</p>
                  </div>
                  <div style={{ background: 'rgba(23, 8, 13, 0.03)', border: '1px solid rgba(237, 147, 177, 0.2)', padding: '1.5rem', borderRadius: '15px' }}>
                    <h4 className="project-title" style={{ color: 'var(--accent)' }}> LocalSite Pro</h4>
                    <p style={{ color: 'var(--text)', opacity: 0.85, fontSize: '0.95rem', lineHeight: '1.5' }}>
                       A professional, conversion-focused website built for a real local business that showcases their services, builds trust with customers online, and includes a contact form and Google Maps integration to drive foot traffic and inquiries.</p>
                  </div>
                  <div style={{ background: 'rgba(23, 8, 13, 0.03)', border: '1px solid rgba(237, 147, 177, 0.2)', padding: '1.5rem', borderRadius: '15px' }}>
                    <h4 className="project-title" style={{ color: 'var(--accent)' }}>Word Art Generator</h4>
                    <p style={{ color: 'var(--text)', opacity: 0.85, fontSize: '0.95rem', lineHeight: '1.5' }}>Creative frontend tool blending typography and design using dynamic HTML/CSS/JavaScript inputs.</p>
                  </div>
                  <div style={{ background: 'rgba(23, 8, 13, 0.03)', border: '1px solid rgba(237, 147, 177, 0.2)', padding: '1.5rem', borderRadius: '15px' }}>
                    <h4 className="project-title" style={{ color: 'var(--accent)' }}>Predictive Nifty Analyzer</h4>
                    <p style={{ color: 'var(--text)', opacity: 0.85, fontSize: '0.95rem', lineHeight: '1.5' }}>Intelligent market dashboard designed to analyze Nifty options data and provide real-time insights for smarter trading decisions.</p>
                  </div>
                  <div style={{ background: 'rgba(23, 8, 13, 0.03)', border: '1px solid rgba(237, 147, 177, 0.2)', padding: '1.5rem', borderRadius: '15px' }}>
                    <h4 className="project-title" style={{ color: 'var(--accent)' }}>LeadFlow CRM</h4>
                    <p style={{ color: 'var(--text)', opacity: 0.85, fontSize: '0.95rem', lineHeight: '1.5' }}>A lightweight client lead management system that lets admins capture, track, and follow up on leads from website contact forms — with status pipelines (New → Contacted → Converted) and per-lead notes.</p>
                  </div>

                </div>
              </BentoCard>
            </ScrollReveal>
          </section>

          <section>
            <ScrollReveal baseOpacity={0.1} enableBlur={true} baseRotation={3} blurStrength={4}>
              <BentoCard>
                <h3 style={{ color: 'var(--accent)', borderBottomColor: 'rgba(237, 147, 177, 0.4)' }}>💼 Experience & Fellowships</h3>
                <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  
                  <div style={{ paddingLeft: '1.2rem', borderLeft: '2px solid var(--accent-lt)' }}>
                    <h4 style={{ color: 'var(--accent)', fontSize: '1.15rem', margin: '0 0 5px 0' }}>Full-Stack Developer (Local Business Project)</h4>
                    <p style={{ color: 'var(--accent-lt)', fontSize: '0.95rem', margin: '0 0 8px 0', fontWeight: 'bold' }}>2026</p>
                    <p style={{ color: 'var(--text)', opacity: 0.85, fontSize: '0.95rem', lineHeight: '1.6', margin: 0 }}>
                      Architected and developed a comprehensive modular platform for a local business. Designed a responsive frontend using React, supported by a robust Python FastAPI and PostgreSQL backend infrastructure.
                    </p>
                  </div>

                  <div style={{ paddingLeft: '1.2rem', borderLeft: '2px solid var(--accent-lt)' }}>
                    <h4 style={{ color: 'var(--accent)', fontSize: '1.15rem', margin: '0 0 5px 0' }}>APSCHE Virtual Internship Program Participant</h4>
                    <p style={{ color: 'var(--accent-lt)', fontSize: '0.95rem', margin: '0 0 8px 0', fontWeight: 'bold' }}>Summer 2026</p>
                    <p style={{ color: 'var(--text)', opacity: 0.85, fontSize: '0.95rem', lineHeight: '1.6', margin: 0 }}>
                      Selected for the APSCHE Short-Term Virtual Internship Program conducted by SmartBridge. Participating in industry-oriented virtual training focused on practical skills, professional development, and hands-on learning in technology and software-related domains. Gaining exposure to real-world project workflows, collaborative learning, and emerging technologies.
                    </p>
                  </div>

                </div>
              </BentoCard>
            </ScrollReveal>
          </section>

        </div>
      </div>
    </>
  );
}

export default App;
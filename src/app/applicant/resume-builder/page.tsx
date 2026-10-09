'use client';

import React, { useState } from 'react';

export default function ResumeBuilder() {
  const [personalInfo, setPersonalInfo] = useState({ name: '', email: '', phone: '', linkedin: '' });
  const [skills, setSkills] = useState('');
  const [experience, setExperience] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ feedback: string, latex: string } | null>(null);
  
  const handleGenerate = async () => {
    if (!personalInfo.name || !skills || !experience) {
      alert('Please fill out your Name, Skills, and Experience.');
      return;
    }
    
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch('/api/generate-resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...personalInfo, skills, experience })
      });
      const data = await res.json();
      
      if (res.ok) {
        setResult(data);
      } else {
        alert('Error: ' + data.error);
      }
    } catch (error) {
      alert('Network error occurred.');
    }
    setLoading(false);
  };

  return (
    <div className="container" style={{ padding: '60px 24px', minHeight: '100vh' }}>
      <div style={{ marginBottom: '40px' }}>
        <a href="/" style={{ color: 'var(--accent-color)', textDecoration: 'none', fontWeight: 600 }}>&larr; Back to Siftly</a>
      </div>
      
      <h1 style={{ marginBottom: '16px' }}>Applicant Portal: Siftly Resume Builder</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '40px', maxWidth: '600px', fontSize: '1.125rem' }}>
        Input your details below. Our Gemini AI will automatically format this into a highly professional, ATS-friendly LaTeX document and provide actionable gap-analysis feedback.
      </p>

      <div className="grid" style={{ marginBottom: '40px' }}>
        <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h3 style={{ borderBottom: '1px solid var(--glass-border)', paddingBottom: '12px' }}>Personal Details</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Full Name</label>
            <input 
              type="text" 
              placeholder="John Doe"
              style={inputStyle}
              value={personalInfo.name}
              onChange={(e) => setPersonalInfo({...personalInfo, name: e.target.value})}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Email</label>
            <input 
              type="email" 
              placeholder="john@example.com"
              style={inputStyle}
              value={personalInfo.email}
              onChange={(e) => setPersonalInfo({...personalInfo, email: e.target.value})}
            />
          </div>
        </div>

        <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h3 style={{ borderBottom: '1px solid var(--glass-border)', paddingBottom: '12px' }}>Professional Profile</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Top Skills (Comma separated)</label>
            <textarea 
              placeholder="React, Python, Machine Learning, UI/UX"
              style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }}
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Experience & Projects</label>
            <textarea 
              placeholder="Describe your recent roles and major projects..."
              style={{ ...inputStyle, minHeight: '120px', resize: 'vertical' }}
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <button 
          className="btn-primary" 
          onClick={handleGenerate} 
          disabled={loading}
          style={{ padding: '16px 40px', fontSize: '1.25rem', opacity: loading ? 0.7 : 1 }}
        >
          {loading ? 'AI is Processing...' : 'Generate AI Feedback & LaTeX Resume'}
        </button>
      </div>

      {result && (
        <div className="glass-panel" style={{ marginBottom: '80px', background: '#ffffff', borderColor: 'var(--accent-color)' }}>
          <h2 style={{ color: 'var(--accent-color)', marginBottom: '24px' }}>Results & AI Feedback</h2>
          
          <div style={{ background: '#f8fafc', padding: '24px', borderRadius: '12px', borderLeft: '4px solid var(--warning)', marginBottom: '32px' }}>
            <h4 style={{ marginBottom: '12px', color: 'var(--text-primary)' }}>Gap Analysis & Interview Prep</h4>
            <p style={{ whiteSpace: 'pre-wrap', color: 'var(--text-secondary)' }}>{result.feedback}</p>
          </div>

          <div>
            <h4 style={{ marginBottom: '12px' }}>LaTeX Source Code</h4>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '12px' }}>Copy this code and paste it into Overleaf or any LaTeX compiler to generate your PDF.</p>
            <pre style={{ background: '#0f172a', color: '#f8fafc', padding: '24px', borderRadius: '12px', overflowX: 'auto', fontSize: '0.875rem', fontFamily: 'monospace' }}>
              {result.latex}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}

const inputStyle = {
  padding: '14px',
  borderRadius: '8px',
  border: '1px solid #cbd5e1',
  background: '#ffffff',
  color: 'var(--text-primary)',
  fontFamily: 'inherit',
  fontSize: '1rem',
  outline: 'none',
  transition: 'border-color 0.2s ease, box-shadow 0.2s ease'
};

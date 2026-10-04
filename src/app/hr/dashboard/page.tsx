'use client';

import React, { useState, useRef } from 'react';

export default function HRDashboard() {
  const [jobDescription, setJobDescription] = useState('');
  const [candidates, setCandidates] = useState<{name: string, score: number, reason: string}[]>([]);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setLoading(true);
    
    try {
      // Read all txt files
      const fileReadPromises = Array.from(files).map((file, idx) => {
        return new Promise<{name: string, content: string}>((resolve) => {
          const reader = new FileReader();
          reader.onload = (event) => {
            resolve({
              name: `Candidate ${idx + 1} (${file.name})`,
              content: event.target?.result as string || ''
            });
          };
          reader.readAsText(file);
        });
      });

      const parsedCandidates = await Promise.all(fileReadPromises);

      // Send to AI Screening API
      const res = await fetch('/api/screen-resumes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobDescription, candidates: parsedCandidates })
      });

      const data = await res.json();
      
      if (res.ok) {
        setCandidates(data.results);
      } else {
        alert('Error: ' + data.error);
      }
    } catch (error) {
      console.error(error);
      alert('Failed to process resumes.');
    }

    setLoading(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleScreenResumes = () => {
    if (!jobDescription) {
      alert("Please enter a Job Description first so the AI knows what to match against.");
      return;
    }
    fileInputRef.current?.click();
  };

  return (
    <div className="container" style={{ padding: '60px 24px', minHeight: '100vh' }}>
      <div style={{ marginBottom: '40px' }}>
        <a href="/" style={{ color: 'var(--accent-color)', textDecoration: 'none', fontWeight: 600 }}>&larr; Back to Home</a>
      </div>

      <h1 style={{ marginBottom: '16px' }}>HR AI Screening Dashboard</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '40px', maxWidth: '700px', fontSize: '1.125rem' }}>
        Upload bulk resumes (.txt for demo). Our Gemini AI will strip out demographic, university, and gender biases, 
        and rank candidates purely based on their skill and experience compatibility with your Job Description.
      </p>

      <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))' }}>
        {/* Left Column: Job Description & Upload */}
        <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h3 style={{ borderBottom: '1px solid var(--glass-border)', paddingBottom: '12px' }}>1. Define Job Requirements</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Job Description & Target Skills</label>
            <textarea 
              placeholder="Paste the full job description here. Include required skills, years of experience, and project requirements..."
              style={{ ...inputStyle, minHeight: '280px', resize: 'vertical' }}
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
            />
          </div>

          <input 
            type="file" 
            multiple 
            accept=".txt"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleFileUpload}
          />
          
          <button 
            className="btn-primary" 
            onClick={handleScreenResumes} 
            disabled={loading}
            style={{ marginTop: '16px', padding: '16px', fontSize: '1.125rem', opacity: loading ? 0.7 : 1 }}
          >
            {loading ? 'AI is Processing Resumes...' : '2. Upload Resumes (.txt) & Run Screener'}
          </button>
        </div>

        {/* Right Column: Ranked Results */}
        <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '20px', background: '#ffffff', borderColor: 'var(--accent-color)' }}>
          <h3 style={{ borderBottom: '1px solid var(--glass-border)', paddingBottom: '12px', color: 'var(--accent-color)' }}>Unbiased Ranking Results</h3>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            Candidates are anonymized to prevent unconscious bias.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '8px' }}>
            {candidates.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-secondary)', background: '#f8fafc', borderRadius: '12px' }}>
                {loading ? 'Screening candidates...' : 'No resumes screened yet.'}
              </div>
            ) : (
              candidates.map((c, i) => (
                <div key={i} style={resultCardStyle}>
                  <div style={{ flex: 1 }}>
                    <strong style={{ display: 'block', fontSize: '1.125rem', color: 'var(--text-primary)', marginBottom: '4px' }}>
                      {c.name}
                    </strong>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                      {c.reason}
                    </p>
                  </div>
                  <div style={{ textAlign: 'right', marginLeft: '16px', minWidth: '80px' }}>
                    <div style={{ fontSize: '1.75rem', fontWeight: 800, color: c.score >= 80 ? 'var(--success)' : c.score >= 60 ? 'var(--warning)' : 'var(--danger)' }}>
                      {c.score}%
                    </div>
                    <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-secondary)' }}>Match</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
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

const resultCardStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '20px',
  borderRadius: '12px',
  background: '#f8fafc',
  border: '1px solid #e2e8f0',
  boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
};

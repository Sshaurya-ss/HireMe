import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <main className="container">
        {/* Navigation Bar */}
        <nav style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          padding: '24px 0', 
          marginBottom: '20px',
          borderBottom: '1px solid var(--glass-border)'
        }}>
          <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ 
              fontSize: '1.75rem', 
              fontWeight: 800, 
              color: 'var(--text-primary)',
              letterSpacing: '-0.02em'
            }}>
              Siftly
            </span>
            <span style={{ 
              background: 'var(--accent-color)', 
              color: '#ffffff', 
              fontSize: '0.75rem', 
              fontWeight: 700, 
              padding: '2px 8px', 
              borderRadius: '999px',
              textTransform: 'uppercase'
            }}>
              AI
            </span>
          </Link>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <Link href="/applicant/resume-builder" style={{ textDecoration: 'none', color: 'var(--text-secondary)', fontSize: '0.95rem', fontWeight: 500 }}>
              Resume Builder
            </Link>
            <Link href="/hr/dashboard" style={{ textDecoration: 'none', color: 'var(--text-secondary)', fontSize: '0.95rem', fontWeight: 500 }}>
              HR Dashboard
            </Link>
          </div>
        </nav>

        {/* Detailed Hero Section */}
        <div className="hero-section">
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ 
              background: '#e0e7ff', 
              color: 'var(--accent-color)', 
              padding: '6px 14px', 
              borderRadius: '20px', 
              fontSize: '0.875rem', 
              fontWeight: 600,
            }}>
              Powered by Google Gemini AI
            </span>
          </div>
          
          <h1 style={{ maxWidth: '900px' }}>
            Transforming Recruitment with <br />
            <span className="text-gradient">Intelligent, Unbiased Matching</span>
          </h1>
          
          <p style={{ maxWidth: '700px', fontSize: '1.25rem', color: 'var(--text-secondary)' }}>
            Our enterprise-grade platform leverages advanced Large Language Models to read between the lines. We connect exceptional talent with leading employers—stripping away bias and focusing purely on verifiable skills and experience.
          </p>

          <div style={{ display: 'flex', gap: '16px', marginTop: '32px' }}>
            <Link href="/hr/dashboard" style={{ textDecoration: 'none' }}>
              <button className="btn-primary" style={{ fontSize: '1.125rem', padding: '14px 32px' }}>
                Employer Dashboard
              </button>
            </Link>
            <Link href="/applicant/resume-builder" style={{ textDecoration: 'none' }}>
              <button className="btn-secondary" style={{ fontSize: '1.125rem', padding: '14px 32px' }}>
                Applicant Portal
              </button>
            </Link>
          </div>

          <div style={{ marginTop: '48px', display: 'flex', gap: '40px', color: 'var(--text-secondary)', borderTop: '1px solid var(--glass-border)', paddingTop: '32px', width: '100%', justifyContent: 'center' }}>
            <div>
              <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)' }}>10x</div>
              <div style={{ fontSize: '0.875rem' }}>Faster Screening</div>
            </div>
            <div>
              <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)' }}>100%</div>
              <div style={{ fontSize: '0.875rem' }}>Bias-Free Matching</div>
            </div>
            <div>
              <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)' }}>LaTeX</div>
              <div style={{ fontSize: '0.875rem' }}>Pro Resume Output</div>
            </div>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid">
          {/* HR Card */}
          <div className="glass-panel">
            <div style={{ fontSize: '2.5rem', marginBottom: '20px', background: '#f1f5f9', width: '64px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '12px' }}>🏢</div>
            <h3>For Employers & HR</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
              Upload hundreds of resumes and instantly filter them against your specific Job Description. Our AI extracts core competencies and provides a match percentage without demographic bias.
            </p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: 'var(--success)' }}>✓</span> Deep AI Parsing & Analysis
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: 'var(--success)' }}>✓</span> 0% University/Gender Bias
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: 'var(--success)' }}>✓</span> Skill & Project Verification
              </li>
            </ul>
            <Link href="/hr/dashboard" style={{ textDecoration: 'none' }}>
              <button className="btn-secondary" style={{ width: '100%' }}>Launch Screening Tool &rarr;</button>
            </Link>
          </div>

          {/* Applicant Card */}
          <div className="glass-panel">
            <div style={{ fontSize: '2.5rem', marginBottom: '20px', background: '#f1f5f9', width: '64px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '12px' }}>🎓</div>
            <h3>For Applicants</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
              Input your raw experience and let our AI craft a perfectly formatted, ATS-compliant LaTeX resume. Get instant gap analysis and interview prep tailored to your dream roles.
            </p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: 'var(--accent-color)' }}>✓</span> Automated LaTeX Builder
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: 'var(--accent-color)' }}>✓</span> AI Feedback & Gap Analysis
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: 'var(--accent-color)' }}>✓</span> Personalized Interview Prep
              </li>
            </ul>
            <Link href="/applicant/resume-builder" style={{ textDecoration: 'none' }}>
              <button className="btn-secondary" style={{ width: '100%' }}>Start Building &rarr;</button>
            </Link>
          </div>
        </div>
      </main>

      {/* Detailed Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '16px' }}>Siftly</div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                The future of unbiased, merit-based recruiting. Powered by advanced Large Language Models.
              </p>
            </div>
            
            <div>
              <div className="footer-heading">Platform</div>
              <ul className="footer-links">
                <li><Link href="/hr/dashboard">Employer Dashboard</Link></li>
                <li><Link href="/applicant/resume-builder">Resume Builder</Link></li>
                <li><a href="#">AI Match Algorithm</a></li>
                <li><a href="#">Pricing</a></li>
              </ul>
            </div>

            <div>
              <div className="footer-heading">Resources</div>
              <ul className="footer-links">
                <li><a href="#">Documentation</a></li>
                <li><a href="#">Interview Guides</a></li>
                <li><a href="#">LaTeX Templates</a></li>
                <li><a href="#">Blog</a></li>
              </ul>
            </div>

            <div>
              <div className="footer-heading">Company</div>
              <ul className="footer-links">
                <li><a href="#">About Us</a></li>
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Terms of Service</a></li>
                <li><a href="#">Contact</a></li>
              </ul>
            </div>
          </div>
          
          <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '24px', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
            &copy; {new Date().getFullYear()} Siftly. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
}

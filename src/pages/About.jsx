function About() {
  return (
    <div style={{ padding: '3rem 2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ color: 'white', fontSize: '2rem', marginBottom: '1rem' }}>
        About CancerScan AI
      </h1>
      <p style={{ color: '#9ca3af', lineHeight: '1.8', marginBottom: '2rem' }}>
        CancerScan AI is a prototype medical imaging tool built to demonstrate 
        how artificial intelligence can assist in early cancer detection through 
        3D scan visualization and AI-powered analysis.
      </p>

      {/* Tech Stack */}
      <h2 style={{ color: 'white', fontSize: '1.3rem', marginBottom: '1rem' }}>
        🛠️ Built With
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
        {[
          { tech: 'React + Vite', use: 'Frontend Framework' },
          { tech: 'Three.js / R3F', use: '3D Visualization' },
          { tech: 'Tailwind CSS', use: 'Styling' },
          { tech: 'Claude AI API', use: 'Cancer Prediction' },
          { tech: 'Kaggle / TCIA', use: 'Dataset Sources' },
          { tech: 'Axios', use: 'Data Fetching' },
        ].map((item) => (
          <div key={item.tech} style={{
            backgroundColor: '#1f2937',
            borderRadius: '0.75rem',
            padding: '1rem',
            border: '1px solid #374151',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span style={{ color: '#60a5fa', fontWeight: 'bold' }}>{item.tech}</span>
            <span style={{ color: '#6b7280', fontSize: '0.85rem' }}>{item.use}</span>
          </div>
        ))}
      </div>

      {/* Disclaimer */}
      <div style={{
        backgroundColor: '#1f2937',
        borderRadius: '1rem',
        padding: '1.5rem',
        borderLeft: '4px solid #f59e0b'
      }}>
        <p style={{ color: '#f59e0b', fontWeight: 'bold', marginBottom: '0.5rem' }}>
          ⚠️ Medical Disclaimer
        </p>
        <p style={{ color: '#9ca3af', fontSize: '0.9rem', lineHeight: '1.7' }}>
          This is a prototype for educational purposes only. 
          It is NOT a certified medical device and should NOT be used 
          for actual medical diagnosis. Always consult a qualified 
          medical professional for health concerns.
        </p>
      </div>
    </div>
  )
}

export default About
function Home({ onNavigate }) {
  return (
    <div style={{ padding: '4rem 2rem', textAlign: 'center' }}>
      
      {/* Hero */}
      <div style={{ marginBottom: '3rem' }}>
        <h1 style={{ color: 'white', fontSize: '3rem', fontWeight: 'bold', marginBottom: '1rem' }}>
          🧬 CancerScan AI
        </h1>
        <p style={{ color: '#9ca3af', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
          Advanced 3D cancer detection using AI-powered imaging analysis. 
          Upload scans and get instant predictions.
        </p>
        <button
          onClick={() => onNavigate('analyze')}
          style={{
            backgroundColor: '#2563eb',
            color: 'white',
            padding: '1rem 2.5rem',
            borderRadius: '0.75rem',
            border: 'none',
            fontSize: '1.1rem',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          🔬 Start Analysis →
        </button>
      </div>

      {/* Feature Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', maxWidth: '900px', margin: '0 auto' }}>
        {[
          { icon: '🧠', title: '3D Visualization', desc: 'Rotate and explore cancer scans in full 3D with tumor highlighting' },
          { icon: '🤖', title: 'AI Prediction', desc: 'Claude AI analyzes scans and provides confidence scores instantly' },
          { icon: '📊', title: 'Detailed Reports', desc: 'Get severity, location, size and medical recommendations' },
        ].map((feature) => (
          <div key={feature.title} style={{
            backgroundColor: '#1f2937',
            borderRadius: '1rem',
            padding: '1.5rem',
            border: '1px solid #374151'
          }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{feature.icon}</div>
            <h3 style={{ color: 'white', marginBottom: '0.5rem' }}>{feature.title}</h3>
            <p style={{ color: '#9ca3af', fontSize: '0.9rem' }}>{feature.desc}</p>
          </div>
        ))}
      </div>

      {/* Stats */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', marginTop: '3rem' }}>
        {[
          { value: '4+', label: 'Cancer Types' },
          { value: '87%', label: 'Avg Confidence' },
          { value: '3D', label: 'Visualization' },
        ].map((stat) => (
          <div key={stat.label}>
            <p style={{ color: '#3b82f6', fontSize: '2rem', fontWeight: 'bold' }}>{stat.value}</p>
            <p style={{ color: '#6b7280' }}>{stat.label}</p>
          </div>
        ))}
      </div>

    </div>
  )
}

export default Home
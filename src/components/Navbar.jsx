function Navbar({ currentPage, onNavigate }) {
  return (
    <nav style={{
      backgroundColor: '#111827',
      padding: '1rem 1.5rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottom: '1px solid #1f2937'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <div style={{
          width: 36, height: 36,
          backgroundColor: '#2563eb',
          borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontWeight: 'bold', color: 'white'
        }}>C</div>
        <span style={{ color: '#60a5fa', fontWeight: 'bold', fontSize: '1.2rem' }}>
          CancerScan AI
        </span>
      </div>

      <div style={{ display: 'flex', gap: '1.5rem' }}>
        {['home', 'analyze', 'about'].map((page) => (
          <button
            key={page}
            onClick={() => onNavigate(page)}
            style={{
              background: 'none',
              border: 'none',
              color: currentPage === page ? '#60a5fa' : '#9ca3af',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: currentPage === page ? 'bold' : 'normal',
              textTransform: 'capitalize',
              borderBottom: currentPage === page ? '2px solid #60a5fa' : '2px solid transparent',
              paddingBottom: '2px'
            }}
          >
            {page.charAt(0).toUpperCase() + page.slice(1)}
          </button>
        ))}
      </div>
    </nav>
  )
}

export default Navbar
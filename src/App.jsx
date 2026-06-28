import { useState } from 'react'
import Navbar from './components/Navbar'
import CancerTypeSelector from './components/CancerTypeSelector'
import DataInput from './components/DataInput'
import Visualization3D from './components/Visualization3D'
import PredictionResult from './components/PredictionResult'
import Home from './pages/Home'
import About from './pages/About'

function App() {
  const [page, setPage] = useState('home')
  const [cancerType, setCancerType] = useState(null)
  const [scanData, setScanData] = useState(null)

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#030712' }}>
      <Navbar currentPage={page} onNavigate={setPage} />

      {/* Home Page */}
      {page === 'home' && (
        <Home onNavigate={setPage} />
      )}

      {/* Analyze Page */}
      {page === 'analyze' && (
        <div>
          <CancerTypeSelector onSelect={setCancerType} />
          {cancerType && (
            <DataInput cancerType={cancerType} onDataReady={setScanData} />
          )}
          {scanData && (
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <Visualization3D cancerType={cancerType} scanData={scanData} />
                <PredictionResult cancerType={cancerType} scanData={scanData} />
              </div>
            </div>
          )}
        </div>
      )}

      {/* About Page */}
      {page === 'about' && <About />}
    </div>
  )
}

export default App
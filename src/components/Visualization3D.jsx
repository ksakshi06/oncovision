import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

function OrganModel() {
  const ref = useRef()
  useFrame(() => { ref.current.rotation.y += 0.005 })
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[2, 64, 64]} />
      <meshStandardMaterial color="#4a5568" transparent opacity={0.85} roughness={0.8} />
    </mesh>
  )
}

function TumorSpot() {
  const ref = useRef()
  useFrame(({ clock }) => {
    const pulse = Math.sin(clock.getElapsedTime() * 2) * 0.1
    ref.current.scale.setScalar(1 + pulse)
  })
  return (
    <mesh ref={ref} position={[0.8, 0.8, 1.2]}>
      <sphereGeometry args={[0.4, 32, 32]} />
      <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={0.8} />
    </mesh>
  )
}

function Visualization3D({ cancerType, scanData }) {
  // Get image preview URL
  const imageUrl = scanData?.type === 'file'
    ? URL.createObjectURL(scanData.data)
    : scanData?.type === 'url'
    ? scanData.data
    : null

  return (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ color: 'white', fontSize: '1.5rem', marginBottom: '0.5rem' }}>
        3D Scan Visualization
      </h2>
      <p style={{ color: '#9ca3af', marginBottom: '1rem' }}>
        Rotate with mouse • Scroll to zoom
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        
        {/* Actual Scan Image */}
        <div style={{
          borderRadius: '1rem',
          overflow: 'hidden',
          border: '1px solid #1f2937',
          backgroundColor: '#0f172a'
        }}>
          <p style={{ color: '#6b7280', fontSize: '0.75rem', padding: '0.5rem 1rem' }}>
            📷 Original Scan
          </p>
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="scan"
              style={{ width: '100%', height: '300px', objectFit: 'cover' }}
            />
          ) : (
            <div style={{
              height: '300px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#4b5563'
            }}>
              No image available
            </div>
          )}
        </div>

        {/* 3D Model */}
        <div style={{
          height: '340px',
          borderRadius: '1rem',
          overflow: 'hidden',
          border: '1px solid #1f2937',
          backgroundColor: '#0f172a'
        }}>
          <p style={{ color: '#6b7280', fontSize: '0.75rem', padding: '0.5rem 1rem' }}>
            🧠 3D Model
          </p>
          <Canvas camera={{ position: [0, 0, 6] }}>
            <ambientLight intensity={0.4} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <pointLight position={[-10, -10, -10]} color="#3b82f6" intensity={0.5} />
            <OrganModel />
            <TumorSpot />
            <OrbitControls enableZoom={true} />
          </Canvas>
        </div>

      </div>

      {/* Legend */}
      <div style={{ display: 'flex', gap: '2rem', marginTop: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ width: 16, height: 16, borderRadius: '50%', backgroundColor: '#4a5568' }} />
          <span style={{ color: '#9ca3af' }}>Organ Tissue</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ width: 16, height: 16, borderRadius: '50%', backgroundColor: '#ef4444' }} />
          <span style={{ color: '#9ca3af' }}>Tumor Region</span>
        </div>
      </div>
    </div>
  )
}

export default Visualization3D
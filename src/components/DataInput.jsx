import { useState } from 'react'

function DataInput({ cancerType, onDataReady }) {
  const [mode, setMode] = useState(null) // 'upload' or 'url'
  const [url, setUrl] = useState('')
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)

  // When user picks a file
  const handleFileChange = (e) => {
    const selected = e.target.files[0]
    setFile(selected)
    setPreview(URL.createObjectURL(selected))
    onDataReady({ type: 'file', data: selected })
  }

  // When user submits a URL
  const handleUrlSubmit = () => {
    if (!url) return
    onDataReady({ type: 'url', data: url })
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ color: 'white', fontSize: '1.5rem', marginBottom: '0.5rem' }}>
        Input Scan Data
      </h2>
      <p style={{ color: '#9ca3af', marginBottom: '1.5rem' }}>
        Upload a scan or provide a dataset URL for{' '}
        <span style={{ color: '#60a5fa' }}>{cancerType}</span> analysis
      </p>

      {/* Mode Selection */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
        <button
          onClick={() => setMode('upload')}
          style={{
            padding: '0.75rem 1.5rem',
            borderRadius: '0.5rem',
            border: `2px solid ${mode === 'upload' ? '#3b82f6' : '#374151'}`,
            backgroundColor: mode === 'upload' ? '#1d4ed8' : '#1f2937',
            color: 'white',
            cursor: 'pointer',
            fontSize: '1rem'
          }}
        >
          📁 Upload File
        </button>
        <button
          onClick={() => setMode('url')}
          style={{
            padding: '0.75rem 1.5rem',
            borderRadius: '0.5rem',
            border: `2px solid ${mode === 'url' ? '#3b82f6' : '#374151'}`,
            backgroundColor: mode === 'url' ? '#1d4ed8' : '#1f2937',
            color: 'white',
            cursor: 'pointer',
            fontSize: '1rem'
          }}
        >
          🌐 Fetch from URL
        </button>
      </div>

      {/* Upload Mode */}
      {mode === 'upload' && (
        <div style={{
          border: '2px dashed #374151',
          borderRadius: '0.75rem',
          padding: '2rem',
          textAlign: 'center'
        }}>
          <input
            type="file"
            accept="image/*,.dcm"
            onChange={handleFileChange}
            style={{ color: 'white' }}
          />
          {preview && (
            <img
              src={preview}
              alt="preview"
              style={{ marginTop: '1rem', maxHeight: '200px', borderRadius: '0.5rem' }}
            />
          )}
        </div>
      )}

      {/* URL Mode */}
      {mode === 'url' && (
        <div style={{ display: 'flex', gap: '1rem' }}>
          <input
            type="text"
            placeholder="e.g. https://cancerimagingarchive.net/..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            style={{
              flex: 1,
              padding: '0.75rem',
              borderRadius: '0.5rem',
              backgroundColor: '#1f2937',
              border: '1px solid #374151',
              color: 'white',
              fontSize: '0.9rem'
            }}
          />
          <button
            onClick={handleUrlSubmit}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#2563eb',
              color: 'white',
              borderRadius: '0.5rem',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            Fetch →
          </button>
        </div>
      )}
    </div>
  )
}

export default DataInput
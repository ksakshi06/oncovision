import { useState, useEffect } from 'react'
import { GoogleGenAI } from '@google/genai'

function PredictionResult({ cancerType, scanData }) {
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    analyzeWithAI()
  }, [scanData])

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result.split(',')[1])
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  }

  const analyzeWithAI = async () => {
    setLoading(true)
    setError(null)

    try {
      const ai = new GoogleGenAI({
        apiKey: import.meta.env.VITE_GEMINI_API_KEY
      })

      const prompt = `You are a medical AI analyzing a ${cancerType} cancer scan.
      Analyze carefully and respond ONLY in this exact JSON format:
      {
        "prediction": "e.g. Malignant Tumor Detected or No Tumor Detected",
        "confidence": number between 50 and 99,
        "severity": "Low or Medium or High",
        "location": "specific anatomical location",
        "size": "estimated size in cm or N/A",
        "recommendation": "specific medical recommendation"
      }
      Return ONLY the JSON, no other text.`

      let response

      if (scanData?.type === 'file') {
        const base64 = await convertToBase64(scanData.data)
        const mediaType = scanData.data.type || 'image/jpeg'

        response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: [
            {
              parts: [
                { text: prompt },
                {
                  inlineData: {
                    mimeType: mediaType,
                    data: base64
                  }
                }
              ]
            }
          ]
        })
      } else {
        response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: [
            {
              parts: [
                { text: prompt + `\nDataset: ${scanData?.data}` }
              ]
            }
          ]
        })
      }

      const text = response.text
      const clean = text.replace(/```json|```/g, '').trim()
      const parsed = JSON.parse(clean)
      setResult(parsed)

    } catch (err) {
      console.error('Gemini Error:', err)
      setError(err.message)
    }

    setLoading(false)
  }

  if (loading) return (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ color: 'white', fontSize: '1.5rem', marginBottom: '1rem' }}>
        AI Prediction Results
      </h2>
      <div style={{
        backgroundColor: '#1f2937',
        borderRadius: '1rem',
        padding: '2rem',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🔄</div>
        <p style={{ color: '#60a5fa', fontSize: '1.1rem' }}>
          Gemini AI is analyzing your scan...
        </p>
        <p style={{ color: '#6b7280', fontSize: '0.85rem', marginTop: '0.5rem' }}>
          This may take a few seconds
        </p>
      </div>
    </div>
  )

  if (error) return (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ color: 'white', fontSize: '1.5rem', marginBottom: '1rem' }}>
        AI Prediction Results
      </h2>
      <div style={{
        backgroundColor: '#1f2937',
        borderRadius: '1rem',
        padding: '2rem',
        borderLeft: '4px solid #ef4444'
      }}>
        <p style={{ color: '#ef4444', fontWeight: 'bold' }}>❌ API Error</p>
        <p style={{ color: '#9ca3af', marginTop: '0.5rem', fontSize: '0.9rem' }}>
          {error}
        </p>
        <p style={{ color: '#6b7280', marginTop: '0.5rem', fontSize: '0.85rem' }}>
          Check your VITE_GEMINI_API_KEY in .env file
        </p>
      </div>
    </div>
  )

  const isDetected = result?.prediction?.toLowerCase().includes('detected') ||
                     result?.prediction?.toLowerCase().includes('found')

  return (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ color: 'white', fontSize: '1.5rem', marginBottom: '1.5rem' }}>
        AI Prediction Results
      </h2>

      <div style={{
        backgroundColor: '#1f2937',
        borderRadius: '1rem',
        padding: '1.5rem',
        borderLeft: `4px solid ${isDetected ? '#ef4444' : '#10b981'}`,
        marginBottom: '1rem'
      }}>
        <p style={{
          color: isDetected ? '#ef4444' : '#10b981',
          fontWeight: 'bold',
          fontSize: '1.2rem'
        }}>
          {isDetected ? '⚠️' : '✅'} {result.prediction}
        </p>
        <p style={{ color: '#9ca3af', marginTop: '0.5rem' }}>
          Cancer Type: {cancerType}
        </p>
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
          <span style={{ color: '#9ca3af' }}>Confidence Score</span>
          <span style={{ color: 'white', fontWeight: 'bold' }}>{result.confidence}%</span>
        </div>
        <div style={{ backgroundColor: '#374151', borderRadius: '999px', height: '10px' }}>
          <div style={{
            width: `${result.confidence}%`,
            backgroundColor: result.confidence > 80
              ? '#10b981'
              : result.confidence > 60
              ? '#f59e0b'
              : '#ef4444',
            height: '10px',
            borderRadius: '999px',
            transition: 'width 1s ease'
          }} />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        {[
          {
            label: 'Severity',
            value: result.severity,
            color: result.severity === 'High'
              ? '#ef4444'
              : result.severity === 'Medium'
              ? '#f59e0b'
              : '#10b981'
          },
          { label: 'Location', value: result.location, color: '#60a5fa' },
          { label: 'Tumor Size', value: result.size, color: '#f59e0b' },
          { label: 'Recommendation', value: result.recommendation, color: '#10b981' },
        ].map((item) => (
          <div key={item.label} style={{
            backgroundColor: '#111827',
            borderRadius: '0.75rem',
            padding: '1rem',
            border: '1px solid #1f2937'
          }}>
            <p style={{ color: '#6b7280', fontSize: '0.8rem', marginBottom: '0.25rem' }}>
              {item.label}
            </p>
            <p style={{ color: item.color, fontWeight: '600', fontSize: '0.9rem' }}>
              {item.value}
            </p>
          </div>
        ))}
      </div>

      <p style={{ color: '#374151', fontSize: '0.75rem', marginTop: '1rem', textAlign: 'right' }}>
        Powered by Google Gemini AI ✨
      </p>
    </div>
  )
}

export default PredictionResult
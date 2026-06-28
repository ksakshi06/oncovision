import { useState } from 'react'

// Our cancer types with emoji icons
const cancerTypes = [
  { id: 'brain', label: 'Brain Tumor', icon: '🧠', desc: 'MRI Scans' },
  { id: 'lung', label: 'Lung Cancer', icon: '🫁', desc: 'CT Scans' },
  { id: 'breast', label: 'Breast Cancer', icon: '🎗️', desc: 'Mammography' },
  { id: 'general', label: 'General', icon: '🔬', desc: 'All Types' },
]

function CancerTypeSelector({ onSelect }) {
  const [selected, setSelected] = useState(null)

  const handleSelect = (id) => {
    setSelected(id)
    onSelect(id) // tells App.jsx which one was picked
  }

  return (
    <div className="p-8">
      <h2 className="text-white text-2xl font-bold mb-2">
        Select Cancer Type
      </h2>
      <p className="text-gray-400 mb-6">
        Choose the type of scan you want to analyze
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {cancerTypes.map((type) => (
          <div
            key={type.id}
            onClick={() => handleSelect(type.id)}
            className={`cursor-pointer rounded-xl p-5 border-2 transition-all
              ${selected === type.id
                ? 'border-blue-500 bg-blue-500/20 scale-105'
                : 'border-gray-700 bg-gray-800 hover:border-gray-500'
              }`}
          >
            <div className="text-4xl mb-3">{type.icon}</div>
            <div className="text-white font-semibold">{type.label}</div>
            <div className="text-gray-400 text-sm">{type.desc}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CancerTypeSelector
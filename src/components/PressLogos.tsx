import React, { useState, useEffect } from 'react'
import { Search, ChevronLeft, ChevronRight } from 'lucide-react'

interface PressLogosProps {
  selectedLogos: string[]
  onLogoSelect: (logo: string) => void
  selectedPreset: string
  onPresetSelect: (preset: string) => void
}

const PressLogos: React.FC<PressLogosProps> = ({ selectedLogos, onLogoSelect, selectedPreset, onPresetSelect }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [allLogos, setAllLogos] = useState<string[]>([])
  const logosPerPage = 16

  useEffect(() => {
    fetch('https://api.github.com/repos/davbrau/legitimator/contents/logos')
      .then(response => response.json())
      .then(data => {
        const logoNames = data
          .filter((file: any) => file.name.endsWith('.svg'))
          .map((file: any) => file.name.replace('.svg', ''))
        setAllLogos(logoNames)
      })
      .catch(error => console.error('Error loading logos:', error))
  }, [])

  const filteredLogos = allLogos.filter(logo =>
    logo.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalPages = Math.ceil(filteredLogos.length / logosPerPage)
  const startIndex = (currentPage - 1) * logosPerPage
  const visibleLogos = filteredLogos.slice(startIndex, startIndex + logosPerPage)

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="relative flex-grow mr-4">
          <input
            type="text"
            placeholder="Search for publication logo"
            className="w-full p-2 pl-10 border border-gray-300 rounded"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value)
              setCurrentPage(1)
            }}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
        </div>
        <div className="flex items-center">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="p-2 border rounded disabled:opacity-50 mr-2"
          >
            <ChevronLeft size={20} />
          </button>
          <span className="text-sm text-gray-500 mr-2">
            {startIndex + 1}-{Math.min(startIndex + logosPerPage, filteredLogos.length)} of {filteredLogos.length}
          </span>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="p-2 border rounded disabled:opacity-50"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-4">
        {visibleLogos.map(logo => (
          <button
            key={logo}
            className={`p-2 border rounded flex items-center justify-center ${
              selectedLogos.includes(logo) ? 'bg-blue-100 border-blue-500' : 'border-gray-300'
            }`}
            onClick={() => onLogoSelect(logo)}
          >
            <img 
              src={`https://raw.githubusercontent.com/davbrau/legitimator/b4152e17e7b95fa271353be4e138459e07ed447e/logos/${logo}.svg`} 
              alt={logo} 
              className="w-8 h-8 mr-2 object-contain"
            />
            <span className="text-sm">{logo}</span>
          </button>
        ))}
      </div>
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Presets</h3>
        <div className="flex flex-wrap gap-2">
          {['starter', 'gamechangers', 'instafame', 'custom'].map(preset => (
            <button
              key={preset}
              onClick={() => onPresetSelect(preset)}
              className={`px-3 py-1 rounded ${
                selectedPreset === preset ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              {preset.charAt(0).toUpperCase() + preset.slice(1)}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PressLogos
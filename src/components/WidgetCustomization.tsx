import React, { useState } from 'react'
import { Maximize, Link, Palette } from 'lucide-react'

interface WidgetCustomizationProps {
  widgetStyle: {
    logoSize: string
    backgroundColor: string
    customColor: string
  }
  setWidgetStyle: React.Dispatch<React.SetStateAction<{
    logoSize: string
    backgroundColor: string
    customColor: string
  }>>
  selectedLogos: string[]
  links: Record<string, string>
  setLinks: React.Dispatch<React.SetStateAction<Record<string, string>>>
}

const WidgetCustomization: React.FC<WidgetCustomizationProps> = ({ 
  widgetStyle, 
  setWidgetStyle, 
  selectedLogos,
  links,
  setLinks
}) => {
  const [showLinkTooltip, setShowLinkTooltip] = useState(false)

  const handleLinkChange = (logo: string, link: string) => {
    setLinks(prev => ({ ...prev, [logo]: link }))
  }

  return (
    <div className="flex flex-wrap gap-4 mb-4">
      <div className="flex items-center">
        <Maximize className="mr-2" size={20} />
        <select
          value={widgetStyle.logoSize}
          onChange={(e) => setWidgetStyle(prev => ({ ...prev, logoSize: e.target.value }))}
          className="border border-gray-300 rounded p-1"
        >
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
        </select>
      </div>
      <div className="flex items-center">
        <Palette className="mr-2" size={20} />
        <select
          value={widgetStyle.backgroundColor}
          onChange={(e) => setWidgetStyle(prev => ({ ...prev, backgroundColor: e.target.value }))}
          className="border border-gray-300 rounded p-1"
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="transparent">Transparent</option>
          <option value="custom">Custom</option>
        </select>
        {widgetStyle.backgroundColor === 'custom' && (
          <input
            type="color"
            value={widgetStyle.customColor}
            onChange={(e) => setWidgetStyle(prev => ({ ...prev, customColor: e.target.value }))}
            className="ml-2 w-8 h-8 p-0 border-0"
          />
        )}
      </div>
      <div className="relative">
        <button
          onClick={() => setShowLinkTooltip(!showLinkTooltip)}
          className="flex items-center gap-1 text-blue-500 hover:text-blue-600"
        >
          <Link size={20} />
          Add Links
        </button>
        {showLinkTooltip && (
          <div className="absolute z-10 mt-2 p-4 bg-white border border-gray-300 rounded shadow-lg" style={{ width: '500px', maxWidth: '90vw' }}>
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white border-t border-l border-gray-300 rotate-45"></div>
            <h4 className="font-semibold mb-2">Add article links</h4>
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left w-1/3">Logo</th>
                  <th className="text-left w-2/3">Link</th>
                </tr>
              </thead>
              <tbody>
                {selectedLogos.map(logo => (
                  <tr key={logo}>
                    <td className="py-1">{logo}</td>
                    <td className="py-1">
                      <input
                        type="text"
                        value={links[logo] || ''}
                        onChange={(e) => handleLinkChange(logo, e.target.value)}
                        className="w-full border border-gray-300 rounded px-2 py-1"
                        placeholder="https://..."
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default WidgetCustomization
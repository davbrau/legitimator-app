import React, { useState } from 'react'
import PressLogos from './components/PressLogos'
import WidgetPreview from './components/WidgetPreview'
import EmailForm from './components/EmailForm'
import EmbedCode from './components/EmbedCode'
import WidgetCustomization from './components/WidgetCustomization'

function App() {
  const [selectedLogos, setSelectedLogos] = useState<string[]>([])
  const [email, setEmail] = useState('')
  const [embedCode, setEmbedCode] = useState('')
  const [widgetStyle, setWidgetStyle] = useState({
    logoSize: 'medium',
    backgroundColor: 'light',
    customColor: '#ffffff',
  })
  const [links, setLinks] = useState<Record<string, string>>({})
  const [selectedPreset, setSelectedPreset] = useState('custom')

  const handleLogoSelect = (logo: string) => {
    setSelectedLogos(prev => 
      prev.includes(logo) ? prev.filter(l => l !== logo) : [...prev, logo]
    )
    setSelectedPreset('custom')
  }

  const handleEmailSubmit = (submittedEmail: string) => {
    setEmail(submittedEmail)
    generateEmbedCode(submittedEmail)
  }

  const generateEmbedCode = (email: string) => {
    const code = `
      <div id="press-widget" 
        data-email="${email}" 
        data-logos="${selectedLogos.join(',')}"
        data-logo-size="${widgetStyle.logoSize}"
        data-background-color="${widgetStyle.backgroundColor}"
        data-custom-color="${widgetStyle.customColor}"
        data-links='${JSON.stringify(links)}'
      ></div>
      <script src="${window.location.origin}/press-widget.js"></script>
    `
    setEmbedCode(code)
  }

  const handlePresetSelect = (preset: string) => {
    setSelectedPreset(preset)
    switch (preset) {
      case 'starter':
        setSelectedLogos(['ABC', 'CBS', 'Digital Journal', 'FOX', 'NBC'])
        break
      case 'gamechangers':
        setSelectedLogos(['Entrepreneur', 'TechCrunch', 'The Verge', 'Forbes', 'Inc'])
        break
      case 'instafame':
        setSelectedLogos(['TED', 'Wired', 'Vice', 'Time', 'Yahoo'])
        break
      default:
        break
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Press Widget Builder</h1>
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Step 1: Build it</h2>
        <PressLogos 
          selectedLogos={selectedLogos} 
          onLogoSelect={handleLogoSelect}
          selectedPreset={selectedPreset}
          onPresetSelect={handlePresetSelect}
        />
        
        <h2 className="text-xl font-semibold mt-8 mb-4 text-gray-700">Step 2: Design it</h2>
        <WidgetCustomization 
          widgetStyle={widgetStyle} 
          setWidgetStyle={setWidgetStyle}
          selectedLogos={selectedLogos}
          links={links}
          setLinks={setLinks}
        />
        
        <h2 className="text-xl font-semibold mt-8 mb-4 text-gray-700">Step 3: Get it</h2>
        <WidgetPreview logos={selectedLogos} style={widgetStyle} links={links} />
        <EmailForm onSubmit={handleEmailSubmit} />
        
        {embedCode && <EmbedCode code={embedCode} />}
      </div>
    </div>
  )
}

export default App
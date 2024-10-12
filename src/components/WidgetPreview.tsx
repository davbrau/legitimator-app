import React, { useRef, useEffect, useState } from 'react'

interface WidgetPreviewProps {
  logos: string[]
  style: {
    logoSize: string
    backgroundColor: string
    customColor: string
  }
  links: Record<string, string>
}

const WidgetPreview: React.FC<WidgetPreviewProps> = ({ logos, style, links }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isOverflowing, setIsOverflowing] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  const logoSizeClass = {
    small: 'h-8 w-24',
    medium: 'h-12 w-36',
    large: 'h-16 w-48',
  }[style.logoSize]

  useEffect(() => {
    const checkOverflow = () => {
      if (containerRef.current) {
        const { scrollWidth, clientWidth } = containerRef.current
        setIsOverflowing(scrollWidth > clientWidth)
      }
    }

    checkOverflow()
    window.addEventListener('resize', checkOverflow)
    return () => window.removeEventListener('resize', checkOverflow)
  }, [logos, style])

  const getBackgroundColor = () => {
    switch (style.backgroundColor) {
      case 'light':
        return 'bg-white'
      case 'dark':
        return 'bg-gray-800'
      case 'transparent':
        return 'bg-transparent'
      case 'custom':
        return ''
      default:
        return 'bg-white'
    }
  }

  const getTextColor = () => {
    switch (style.backgroundColor) {
      case 'dark':
        return 'text-white'
      case 'custom':
        return isLightColor(style.customColor) ? 'text-gray-800' : 'text-white'
      default:
        return 'text-gray-800'
    }
  }

  const isLightColor = (color: string) => {
    const hex = color.replace('#', '')
    const r = parseInt(hex.substr(0, 2), 16)
    const g = parseInt(hex.substr(2, 2), 16)
    const b = parseInt(hex.substr(4, 2), 16)
    const brightness = ((r * 299) + (g * 587) + (b * 114)) / 1000
    return brightness > 155
  }

  return (
    <div 
      className={`rounded-lg p-6 mb-4 ${getBackgroundColor()} ${
        style.backgroundColor !== 'transparent' ? 'shadow-md' : ''
      }`}
      style={style.backgroundColor === 'custom' ? { backgroundColor: style.customColor } : {}}
    >
      <h3 className={`text-lg font-semibold mb-4 text-center ${getTextColor()}`}>As Seen In</h3>
      <div 
        ref={containerRef}
        className="overflow-hidden relative w-full"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-white to-transparent z-10"></div>
        <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-white to-transparent z-10"></div>
        <div 
          className={`flex flex-row gap-6 items-center ${isOverflowing ? 'animate-scroll' : 'justify-center'}`}
          style={{
            animationPlayState: isPaused ? 'paused' : 'running',
            width: isOverflowing ? `${logos.length * 150}px` : 'auto',
          }}
        >
          {logos.concat(logos).map((logo, index) => (
            <a
              key={`${logo}-${index}`}
              href={links[logo] || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex-shrink-0 flex items-center justify-center bg-transparent rounded-md overflow-hidden ${logoSizeClass}`}
            >
              <img 
                src={`https://raw.githubusercontent.com/davbrau/legitimator/b4152e17e7b95fa271353be4e138459e07ed447e/logos/${logo}.svg`} 
                alt={logo} 
                className="h-full w-auto object-contain"
              />
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

export default WidgetPreview
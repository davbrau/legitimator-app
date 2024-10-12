import React, { useState } from 'react'
import { Check, Copy } from 'lucide-react'

interface EmbedCodeProps {
  code: string
}

const EmbedCode: React.FC<EmbedCodeProps> = ({ code }) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="bg-gray-100 p-4 rounded">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold">Embed Code</h3>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 text-blue-500 hover:text-blue-600"
        >
          {copied ? (
            <>
              <Check size={16} />
              Copied!
            </>
          ) : (
            <>
              <Copy size={16} />
              Copy
            </>
          )}
        </button>
      </div>
      <pre className="bg-gray-800 text-white p-4 rounded overflow-x-auto">
        <code>{code}</code>
      </pre>
    </div>
  )
}

export default EmbedCode
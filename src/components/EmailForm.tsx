import React, { useState } from 'react'

interface EmailFormProps {
  onSubmit: (email: string) => void
}

const EmailForm: React.FC<EmailFormProps> = ({ onSubmit }) => {
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      onSubmit(email)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <p className="text-lg mb-2">Ready to get the press module of your dreams?</p>
      <p className="text-sm text-gray-600 mb-4">We will deliver it straight to your inbox, along with detailed instructions on how to embed it on your website</p>
      <div className="flex gap-2">
        <input
          type="email"
          placeholder="Your best email"
          className="flex-grow p-2 border border-gray-300 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600"
        >
          SEND ME MY PRESS MODULE!
        </button>
      </div>
    </form>
  )
}

export default EmailForm
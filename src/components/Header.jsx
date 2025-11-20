import React from 'react'

function Header() {
  return (
    <header className="text-center mb-10">
      <div className="inline-flex items-center justify-center mb-6">
        <img
          src="/flame-icon.svg"
          alt="Flames"
          className="w-16 h-16 drop-shadow-[0_0_20px_rgba(59,130,246,0.45)]"
        />
      </div>
      <h1 className="text-4xl font-bold text-white tracking-tight">Legal Docs Generator</h1>
      <p className="text-blue-200 mt-2">Generate a Privacy Policy and Terms of Service in seconds</p>
    </header>
  )
}

export default Header

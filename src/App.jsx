import React, { useState } from 'react'
import Header from './components/Header'
import GeneratorForm from './components/GeneratorForm'
import OutputViewer from './components/OutputViewer'

function App() {
  const [docs, setDocs] = useState(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.06),transparent_50%)]"></div>

      <div className="relative max-w-4xl mx-auto px-6 py-12">
        <Header />

        <div className="bg-slate-800/50 backdrop-blur border border-blue-500/20 rounded-2xl p-6 md:p-8 shadow-xl">
          {!docs ? (
            <GeneratorForm onGenerated={setDocs} />
          ) : (
            <OutputViewer docs={docs} onReset={() => setDocs(null)} />
          )}
        </div>

        <div className="text-center mt-8 text-sm text-blue-300/60">
          Built with Flames Blue
        </div>
      </div>
    </div>
  )
}

export default App

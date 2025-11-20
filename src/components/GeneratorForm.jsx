import React, { useState } from 'react'

const initialState = {
  business_name: '',
  business_type: 'LLC',
  website_url: '',
  contact_email: '',
  jurisdiction: 'United States',
  company_address: '',
  effective_date: '',
  description: '',
  industries: 'SaaS, software',
  collects_personal_data: true,
  uses_cookies: true,
  uses_analytics: true,
  uses_third_party_tools: true,
  allows_user_accounts: true,
  allows_user_content: false,
  age_restriction: '13+',
}

function GeneratorForm({ onGenerated }) {
  const [values, setValues] = useState(initialState)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const backend = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setValues((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const payload = {
      ...values,
      industries: values.industries
        ? values.industries.split(',').map((s) => s.trim()).filter(Boolean)
        : [],
      effective_date: values.effective_date || undefined,
      website_url: values.website_url || undefined,
      contact_email: values.contact_email || undefined,
      company_address: values.company_address || undefined,
      age_restriction: values.age_restriction || undefined,
    }

    try {
      const res = await fetch(`${backend}/api/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) throw new Error(`Request failed: ${res.status}`)
      const data = await res.json()
      onGenerated(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-blue-200 mb-1">Business name</label>
          <input name="business_name" value={values.business_name} onChange={handleChange} required placeholder="Acme, Inc." className="w-full px-3 py-2 rounded bg-slate-900/40 border border-blue-500/30 text-white placeholder-blue-300/40 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm text-blue-200 mb-1">Business type</label>
          <select name="business_type" value={values.business_type} onChange={handleChange} className="w-full px-3 py-2 rounded bg-slate-900/40 border border-blue-500/30 text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>LLC</option>
            <option>Sole Proprietorship</option>
            <option>Corporation</option>
            <option>Non-profit</option>
            <option>Other</option>
          </select>
        </div>
        <div>
          <label className="block text-sm text-blue-200 mb-1">Website URL</label>
          <input name="website_url" value={values.website_url} onChange={handleChange} placeholder="https://example.com" className="w-full px-3 py-2 rounded bg-slate-900/40 border border-blue-500/30 text-white placeholder-blue-300/40 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm text-blue-200 mb-1">Contact email</label>
          <input name="contact_email" value={values.contact_email} onChange={handleChange} type="email" placeholder="legal@example.com" className="w-full px-3 py-2 rounded bg-slate-900/40 border border-blue-500/30 text-white placeholder-blue-300/40 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm text-blue-200 mb-1">Jurisdiction</label>
          <input name="jurisdiction" value={values.jurisdiction} onChange={handleChange} placeholder="United States" className="w-full px-3 py-2 rounded bg-slate-900/40 border border-blue-500/30 text-white placeholder-blue-300/40 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm text-blue-200 mb-1">Company address</label>
          <input name="company_address" value={values.company_address} onChange={handleChange} placeholder="123 Main St, City, State" className="w-full px-3 py-2 rounded bg-slate-900/40 border border-blue-500/30 text-white placeholder-blue-300/40 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm text-blue-200 mb-1">Effective date</label>
          <input name="effective_date" type="date" value={values.effective_date} onChange={handleChange} className="w-full px-3 py-2 rounded bg-slate-900/40 border border-blue-500/30 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm text-blue-200 mb-1">Short description</label>
          <input name="description" value={values.description} onChange={handleChange} placeholder="What does your product do?" className="w-full px-3 py-2 rounded bg-slate-900/40 border border-blue-500/30 text-white placeholder-blue-300/40 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm text-blue-200 mb-1">Industries (comma‑separated)</label>
          <input name="industries" value={values.industries} onChange={handleChange} placeholder="SaaS, e‑commerce, fintech" className="w-full px-3 py-2 rounded bg-slate-900/40 border border-blue-500/30 text-white placeholder-blue-300/40 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {[
          { label: 'Collects personal data', name: 'collects_personal_data' },
          { label: 'Uses cookies', name: 'uses_cookies' },
          { label: 'Uses analytics', name: 'uses_analytics' },
          { label: 'Uses third‑party tools', name: 'uses_third_party_tools' },
          { label: 'User accounts', name: 'allows_user_accounts' },
          { label: 'User content', name: 'allows_user_content' },
        ].map((opt) => (
          <label key={opt.name} className="flex items-center gap-2 text-blue-100 bg-slate-900/40 border border-blue-500/30 px-3 py-2 rounded">
            <input type="checkbox" name={opt.name} checked={values[opt.name]} onChange={handleChange} />
            <span>{opt.label}</span>
          </label>
        ))}
      </div>

      <div>
        <label className="block text-sm text-blue-200 mb-1">Age restriction</label>
        <input name="age_restriction" value={values.age_restriction} onChange={handleChange} placeholder="13+" className="w-full px-3 py-2 rounded bg-slate-900/40 border border-blue-500/30 text-white placeholder-blue-300/40 focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>

      {error && (
        <div className="text-sm text-red-300 bg-red-900/30 border border-red-500/30 p-3 rounded">{error}</div>
      )}

      <button disabled={loading} className="w-full py-3 rounded bg-blue-500 hover:bg-blue-600 text-white font-semibold transition-colors disabled:opacity-60">
        {loading ? 'Generating…' : 'Generate Documents'}
      </button>
    </form>
  )
}

export default GeneratorForm

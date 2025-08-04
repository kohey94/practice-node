'use client'

import { useEffect, useState } from 'react'

type FootPrint = {
  id: number
  name: string
  messasge: string
  createdAt: string
}

export default function HomePage() {
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [footprints, setFootprints] = useState<FootPrint []>([])
  
  const fetchFootprints = async () => {
    const res = await fetch('/api/footprints')
    const data = await res.json()
    setFootprints(data)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await fetch('/api/footprints', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, message }),
    })
    setName('')
    setMessage('')
    fetchFootprints()
  }

  useEffect(() => {
    fetchFootprints()
  }, [])


  return(
    <main style={{ padding: '1rem' }}>
      <h1>あしあと板</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
        <input value={name} onChange={e => setName(e.target.value)} placeholder='name' required />
        <input value={message} onChange={e => setMessage(e.target.value)} placeholder='message' required />
        <button type="submit">投稿</button>
      </form>

      <ul>
        {footprints.map(fp => (
          <li key={fp.id}>
            <strong>{fp.name}</strong>: {fp.messasge} ({new Date(fp.createdAt).toLocaleDateString()})
          </li>
        ))}
      </ul>
    </main>
  )
}
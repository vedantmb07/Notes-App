import './App.css'
import { useEffect, useState } from 'react'
import { Card } from '../components/Card'
import { FaGithub } from 'react-icons/fa'

function App() {
  const [notes, setNotes] = useState([])
  const [currentNote, setcurrentNote] = useState({ title: '', desc: '' })

  useEffect(() => {
    const savedNotes = localStorage.getItem('notes')
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes))
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!currentNote.title.trim() && !currentNote.desc.trim()) return

    const newNote = {
      title: currentNote.title.trim(),
      desc: currentNote.desc.trim(),
    }

    const updatedNotes = [...notes, newNote]
    setNotes(updatedNotes)
    setcurrentNote({ title: '', desc: '' })
    localStorage.setItem('notes', JSON.stringify(updatedNotes))
  }

  const deleteNote = (title) => {
    const filtered = notes.filter((item) => item.title !== title)
    setNotes(filtered)
    localStorage.setItem('notes', JSON.stringify(filtered))
  }

  const handleChange = (e) => {
    setcurrentNote((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <div className="app-shell">
      <div className="quote quote-one">“Small steps still move you forward.”</div>
      <div className="quote quote-two">“Your ideas deserve a calm home.”</div>
      <div className="quote quote-three">“Create with intention, not pressure.”</div>

      <header className="topbar">
        <div className="brand-block">
          <p className="eyebrow">Organise your thoughts</p>
          <h1 className="brand">NoteX</h1>
        </div>
      </header>

      <main className="composer-card">
        <div className="composer-heading">
          <p className="eyebrow">Add a fresh idea</p>
          <h2>Create Your Note</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="field-group">
            <label htmlFor="title">Title</label>
            <input value={currentNote.title} onChange={handleChange} type="text" name="title" id="title" placeholder="A lovely title" />
          </div>
          <div className="field-group">
            <label htmlFor="desc">Description</label>
            <textarea name="desc" id="desc" onChange={handleChange} value={currentNote.desc} placeholder="Write your thoughts here..."></textarea>
          </div>
          <button type="submit">Add Note</button>
        </form>
      </main>

      <section className="noteSection">
        <div className="section-heading">
          <p className="eyebrow">Saved moments</p>
          <h2>Your Notes</h2>
        </div>
        <div className="container">
          {notes.length > 0 ? (
            notes.map((note) => (
              <Card key={note.title} deleteNote={deleteNote} title={note.title} desc={note.desc} />
            ))
          ) : (
            <div className="empty-state">Add a note to begin your calm collection.</div>
          )}
        </div>
      </section>

      <footer className="footer-bar">
        <span>Designed by Vedant</span>
        <a href="https://github.com/vedantmb07" target="_blank" rel="noreferrer">
          <FaGithub />
          <span>github.com/vedantmb07</span>
        </a>
      </footer>
    </div>
  )
}

export default App

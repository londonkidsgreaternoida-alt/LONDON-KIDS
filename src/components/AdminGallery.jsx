import { useState, useEffect, useRef } from 'react'
import './AdminGallery.css'

const CATEGORIES = [
  'Classroom Learning', 'Annual Function', 'Sports Day',
  'Drawing Competition', 'Fancy Dress Competition',
  'Festival Celebrations', 'Birthday Celebrations', 'General'
]

export default function AdminGallery() {
  const [password, setPassword]     = useState('')
  const [authed, setAuthed]         = useState(false)
  const [authErr, setAuthErr]       = useState('')
  const [photos, setPhotos]         = useState([])
  const [category, setCategory]     = useState('General')
  const [caption, setCaption]       = useState('')
  const [preview, setPreview]       = useState(null)
  const [file, setFile]             = useState(null)
  const [uploading, setUploading]   = useState(false)
  const [uploadMsg, setUploadMsg]   = useState('')
  const [deleting, setDeleting]     = useState(null)
  const [filter, setFilter]         = useState('All')
  const fileRef = useRef()

  const fetchPhotos = async () => {
    const r = await fetch('/api/gallery')
    setPhotos(await r.json())
  }

  useEffect(() => { if (authed) fetchPhotos() }, [authed])

  const handleLogin = (e) => {
    e.preventDefault()
    if (password === 'london2026') {
      setAuthed(true)
      setAuthErr('')
    } else {
      setAuthErr('❌ Incorrect password. Try again.')
    }
  }

  const handleFile = (e) => {
    const f = e.target.files[0]
    if (!f) return
    setFile(f)
    setPreview(URL.createObjectURL(f))
  }

  const handleUpload = async (e) => {
    e.preventDefault()
    if (!file) return
    setUploading(true)
    setUploadMsg('')
    const fd = new FormData()
    fd.append('photo', file)
    fd.append('password', 'london2026')
    fd.append('category', category)
    fd.append('caption', caption)
    try {
      const r = await fetch('/api/gallery/upload', { method: 'POST', body: fd })
      const d = await r.json()
      if (!r.ok) throw new Error(d.error)
      setUploadMsg('✅ Photo uploaded successfully!')
      setFile(null); setPreview(null); setCaption('')
      fileRef.current.value = ''
      fetchPhotos()
    } catch (err) {
      setUploadMsg('❌ ' + err.message)
    }
    setUploading(false)
    setTimeout(() => setUploadMsg(''), 3000)
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this photo?')) return
    setDeleting(id)
    await fetch(`/api/gallery/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: 'london2026' }),
    })
    fetchPhotos()
    setDeleting(null)
  }

  const filtered = filter === 'All' ? photos : photos.filter(p => p.category === filter)

  if (!authed) {
    return (
      <div className="admin-login">
        <div className="admin-login-card">
          <div className="admin-login-logo">
            <img src="/logo.png" alt="London Kids School" />
          </div>
          <h1>Admin Panel</h1>
          <p>Gallery Management</p>
          <form onSubmit={handleLogin}>
            <input
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoFocus
            />
            {authErr && <div className="auth-err">{authErr}</div>}
            <button type="submit">🔓 Login</button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="admin-panel">
      {/* Header */}
      <div className="admin-header">
        <div className="admin-header-left">
          <img src="/logo.png" alt="Logo" className="admin-logo" />
          <div>
            <h1>Gallery Manager</h1>
            <p>London Kids School — Admin Panel</p>
          </div>
        </div>
        <div className="admin-header-right">
          <span className="photo-count">{photos.length} photos</span>
          <button className="logout-btn" onClick={() => setAuthed(false)}>🔒 Logout</button>
        </div>
      </div>

      <div className="admin-body">
        {/* Upload Card */}
        <div className="upload-card">
          <h2>📸 Upload New Photo</h2>
          <form onSubmit={handleUpload} className="upload-form">
            {/* Drop zone */}
            <div
              className={`drop-zone ${preview ? 'has-preview' : ''}`}
              onClick={() => fileRef.current.click()}
            >
              {preview
                ? <img src={preview} alt="preview" className="drop-preview" />
                : <><div className="drop-icon">📁</div><p>Click to select photo</p><span>JPG, PNG, WEBP up to 10MB</span></>
              }
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                onChange={handleFile}
                style={{ display: 'none' }}
              />
            </div>

            <div className="upload-fields">
              <div className="field-group">
                <label>Category *</label>
                <select value={category} onChange={e => setCategory(e.target.value)}>
                  {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div className="field-group">
                <label>Caption (optional)</label>
                <input
                  type="text"
                  placeholder="Describe this photo..."
                  value={caption}
                  onChange={e => setCaption(e.target.value)}
                />
              </div>
            </div>

            {uploadMsg && <div className={`upload-msg ${uploadMsg.startsWith('✅') ? 'success' : 'error'}`}>{uploadMsg}</div>}

            <button type="submit" className="upload-btn" disabled={!file || uploading}>
              {uploading ? <><span className="spin"></span> Uploading...</> : '⬆️ Upload Photo'}
            </button>
          </form>
        </div>

        {/* Gallery Grid */}
        <div className="gallery-manage">
          <div className="gallery-manage-header">
            <h2>🖼️ Manage Photos</h2>
            <div className="filter-tabs">
              {['All', ...CATEGORIES].map(c => (
                <button
                  key={c}
                  className={`filter-tab ${filter === c ? 'active' : ''}`}
                  onClick={() => setFilter(c)}
                >
                  {c} {c === 'All' ? `(${photos.length})` : `(${photos.filter(p => p.category === c).length})`}
                </button>
              ))}
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="empty-gallery">
              <span>📭</span>
              <p>No photos in this category yet. Upload some!</p>
            </div>
          ) : (
            <div className="manage-grid">
              {filtered.map(photo => (
                <div key={photo.id} className="manage-card">
                  <div className="manage-img-wrap">
                    <img
                      src={`${photo.url}`}
                      alt={photo.caption || photo.category}
                      loading="lazy"
                    />
                    <div className="manage-overlay">
                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(photo.id)}
                        disabled={deleting === photo.id}
                      >
                        {deleting === photo.id ? '...' : '🗑️ Delete'}
                      </button>
                    </div>
                  </div>
                  <div className="manage-info">
                    <span className="manage-cat">{photo.category}</span>
                    {photo.caption && <p className="manage-caption">{photo.caption}</p>}
                    <p className="manage-date">{new Date(photo.uploadedAt).toLocaleDateString('en-IN')}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

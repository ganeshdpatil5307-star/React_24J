import { useEffect, useState } from 'react';
import { getDbStatus, getNotes, createNote, updateNote, deleteNote } from '../api';

export default function DbDemo() {
  const [status, setStatus] = useState(null);
  const [notes, setNotes] = useState([]);
  const [input, setInput] = useState('');
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getDbStatus(), getNotes()])
      .then(([s, n]) => { setStatus(s); setNotes(n || []); })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  async function handleCreate(e) {
    e.preventDefault();
    if (!input.trim()) return;
    try {
      const note = await createNote(input.trim());
      setNotes((prev) => [...prev, note]);
      setInput('');
    } catch (e) { setError(e.message); }
  }

  async function handleUpdate(id) {
    try {
      const updated = await updateNote(id, editText.trim());
      setNotes((prev) => prev.map((n) => (n.id === id ? updated : n)));
      setEditId(null);
    } catch (e) { setError(e.message); }
  }

  async function handleDelete(id) {
    try {
      await deleteNote(id);
      setNotes((prev) => prev.filter((n) => n.id !== id));
    } catch (e) { setError(e.message); }
  }

  const isCloud = status?.mode?.includes('CylonCloud');

  return (
    <div style={{ maxWidth: 640, margin: '0 auto', padding: '24px 0' }}>
      <h1 className="page-title">Database Demo</h1>

      {/* DB Status */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24,
        padding: '12px 16px', borderRadius: 8,
        background: status?.connected ? (isCloud ? '#f0fdf4' : '#eff6ff') : '#fef2f2',
        border: `1px solid ${status?.connected ? (isCloud ? '#bbf7d0' : '#bfdbfe') : '#fecaca'}`,
      }}>
        <span style={{
          width: 12, height: 12, borderRadius: '50%', flexShrink: 0,
          background: status?.connected ? (isCloud ? '#22c55e' : '#3b82f6') : '#ef4444',
        }} />
        <div>
          <strong style={{ fontSize: 14 }}>
            {loading ? 'Checking database...' : status?.connected ? status.mode : 'Database Disconnected'}
          </strong>
          {isCloud && (
            <p style={{ margin: 0, fontSize: 12, color: '#16a34a' }}>
              Notes below are saved in CylonCloud MySQL — refresh the page and they will still be here.
            </p>
          )}
          {!isCloud && status?.connected && (
            <p style={{ margin: 0, fontSize: 12, color: '#2563eb' }}>
              Using in-memory H2 database — notes will disappear on server restart. Connect a CylonCloud MySQL DB to persist them.
            </p>
          )}
          {!status?.connected && status && (
            <p style={{ margin: 0, fontSize: 12, color: '#dc2626' }}>{status.error}</p>
          )}
        </div>
      </div>

      {error && <div className="alert alert-error" style={{ marginBottom: 16 }}>{error}</div>}

      {/* CREATE */}
      <div style={{ marginBottom: 24 }}>
        <label style={{ display: 'block', fontWeight: 600, marginBottom: 6, fontSize: 13, color: '#22c55e' }}>
          CREATE — Add a note
        </label>
        <form onSubmit={handleCreate} style={{ display: 'flex', gap: 8 }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type something and save..."
            style={{ flex: 1, padding: '8px 12px', borderRadius: 6, border: '1px solid #d1d5db', fontSize: 14 }}
          />
          <button className="btn btn-primary" type="submit">Save</button>
        </form>
      </div>

      {/* READ + UPDATE + DELETE */}
      <div>
        <label style={{ display: 'block', fontWeight: 600, marginBottom: 10, fontSize: 13, color: '#3b82f6' }}>
          READ — Notes saved in database ({notes.length})
        </label>

        {loading && <p style={{ color: '#888' }}>Loading...</p>}

        {!loading && notes.length === 0 && (
          <p style={{ color: '#888', fontStyle: 'italic' }}>
            No notes yet. Add one above — then refresh the page to see it's still here!
          </p>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {notes.map((note) => (
            <div key={note.id} style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '10px 14px', borderRadius: 8,
              background: '#f9fafb', border: '1px solid #e5e7eb',
            }}>
              {editId === note.id ? (
                <>
                  <input
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    style={{ flex: 1, padding: '6px 10px', borderRadius: 6, border: '1px solid #d1d5db', fontSize: 14 }}
                    autoFocus
                  />
                  <button className="btn btn-primary" style={{ fontSize: 12, padding: '6px 12px' }}
                    onClick={() => handleUpdate(note.id)}>Save</button>
                  <button className="btn btn-outline" style={{ fontSize: 12, padding: '6px 12px' }}
                    onClick={() => setEditId(null)}>Cancel</button>
                </>
              ) : (
                <>
                  <span style={{ flex: 1, fontSize: 14 }}>{note.content}</span>
                  <span style={{ fontSize: 11, color: '#9ca3af' }}>#{note.id}</span>
                  <button
                    className="btn btn-outline"
                    style={{ fontSize: 12, padding: '4px 10px', color: '#f59e0b', borderColor: '#f59e0b' }}
                    onClick={() => { setEditId(note.id); setEditText(note.content); }}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-outline"
                    style={{ fontSize: 12, padding: '4px 10px', color: '#ef4444', borderColor: '#ef4444' }}
                    onClick={() => handleDelete(note.id)}
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          ))}
        </div>

        {notes.length > 0 && (
          <p style={{ marginTop: 12, fontSize: 12, color: '#6b7280' }}>
            Refresh the page — if these notes are still here, the MySQL database connection is working.
          </p>
        )}
      </div>
    </div>
  );
}

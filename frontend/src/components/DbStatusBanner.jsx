import { useEffect, useState } from 'react';
import { getDbStatus } from '../api';

export default function DbStatusBanner() {
  const [status, setStatus] = useState(null);

  useEffect(() => {
    getDbStatus()
      .then(setStatus)
      .catch(() => setStatus({ connected: false, mode: 'Unknown', error: 'Cannot reach backend' }));
  }, []);

  if (!status) return null;

  const isCloud = status.mode && status.mode.includes('CylonCloud');

  return (
    <div style={{
      background: status.connected ? (isCloud ? '#1a3a2a' : '#1a2a3a') : '#3a1a1a',
      color: '#fff',
      padding: '8px 16px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      fontSize: '13px',
      borderBottom: `2px solid ${status.connected ? (isCloud ? '#22c55e' : '#3b82f6') : '#ef4444'}`,
    }}>
      <span style={{
        width: 10, height: 10, borderRadius: '50%',
        background: status.connected ? (isCloud ? '#22c55e' : '#3b82f6') : '#ef4444',
        display: 'inline-block',
        boxShadow: status.connected ? '0 0 6px currentColor' : 'none',
      }} />
      <strong>DB:</strong>
      <span>{status.connected ? status.mode : 'Disconnected'}</span>
      {status.error && <span style={{ color: '#fca5a5', marginLeft: 8 }}>— {status.error}</span>}
    </div>
  );
}

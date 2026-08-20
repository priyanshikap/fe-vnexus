import { useState } from 'react';
import { signup } from '../api';

export default function Register({ onSignup, onBackToLogin }) {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'student' });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const updateField = (event) => setForm({ ...form, [event.target.name]: event.target.value });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setStatus(null);
    try {
      onSignup(await signup(form));
    } catch (error) {
      setStatus(error.message);
      setLoading(false);
    }
  };

  return (
    <main style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: 24, background: '#faf7f2' }}>
      <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: 440, padding: 36, background: '#fff', border: '1px solid #e4dbd0', borderRadius: 16, boxShadow: '0 8px 48px rgba(107, 86, 68, 0.12)' }}>
        <h1 style={{ marginBottom: 8, color: '#2c2318' }}>Create your VNexus account</h1>
        <p style={{ marginBottom: 24, color: '#6b5644' }}>Join the research and mentorship network.</p>
        {status && <p role="alert" style={{ color: '#c4603a', marginBottom: 16 }}>{status}</p>}
        <label style={{ display: 'block', marginBottom: 16 }}>Name<input name="name" value={form.name} onChange={updateField} required style={inputStyle} /></label>
        <label style={{ display: 'block', marginBottom: 16 }}>Email<input name="email" type="email" value={form.email} onChange={updateField} required style={inputStyle} /></label>
        <label style={{ display: 'block', marginBottom: 16 }}>Password<input name="password" type="password" minLength="6" value={form.password} onChange={updateField} required style={inputStyle} /></label>
        <label style={{ display: 'block', marginBottom: 24 }}>Account type<select name="role" value={form.role} onChange={updateField} style={inputStyle}><option value="student">Student</option><option value="faculty">Faculty</option></select></label>
        <button type="submit" disabled={loading} style={buttonStyle}>{loading ? 'Creating account...' : 'Create account'}</button>
        <button type="button" onClick={onBackToLogin} style={{ ...buttonStyle, marginTop: 12, background: 'transparent', color: '#6b5644' }}>Back to login</button>
      </form>
    </main>
  );
}

const inputStyle = { display: 'block', width: '100%', marginTop: 8, padding: '12px 14px', border: '1px solid #e4dbd0', borderRadius: 8, fontSize: 15 };
const buttonStyle = { width: '100%', padding: '13px 16px', border: 0, borderRadius: 8, background: '#c4603a', color: '#fff', fontWeight: 600, cursor: 'pointer' };

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [role, setRole] = useState('user'); // 'user' or 'admin'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Auto-fill admin credentials when role switches to admin
  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
    setError('');
    if (selectedRole === 'admin') {
      setEmail('admin@admin.com');
      setPassword('admin123'); // Mock password
    } else {
      setEmail('');
      setPassword('');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setError('');
      await login(email, password);
      // Route based on role selection and actual authentication result
      // Assuming AdminRoute handles actual protection, we just steer them correctly here.
      if (role === 'admin' && email === 'admin@admin.com') {
        navigate('/admin');
      } else {
        navigate('/connect');
      }
    } catch (err) {
      setError('Failed to sign in. Please try again.');
    }
  };

  return (
    <div className="login-container flex items-center justify-center min-h-screen bg-background">
      <div className="glass-panel login-card p-8 rounded-2xl w-full max-w-md bg-surface-container-low shadow-lg border border-outline-variant">
        <div className="flex justify-center mb-6">
          <img src="/logo.png" alt="VitalSync Logo" style={{ width: '64px', height: '64px', objectFit: 'contain' }} />
        </div>
        <h1 className="login-title text-center font-headline-md text-on-surface mb-2">VitalSync</h1>
        <p className="login-subtitle text-center font-body-sm text-on-surface-variant mb-8">Select your login portal</p>
        
        {/* Role Selection Boxes */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <button 
            type="button"
            onClick={() => handleRoleSelect('user')}
            className={`p-4 rounded-xl border flex flex-col items-center justify-center transition-all ${role === 'user' ? 'border-primary bg-primary/10 text-primary' : 'border-outline-variant text-on-surface-variant hover:border-primary/50'}`}
          >
            <span className="material-symbols-outlined text-3xl mb-2">person</span>
            <span className="font-title-sm">User</span>
          </button>
          
          <button 
            type="button"
            onClick={() => handleRoleSelect('admin')}
            className={`p-4 rounded-xl border flex flex-col items-center justify-center transition-all ${role === 'admin' ? 'border-primary bg-primary/10 text-primary' : 'border-outline-variant text-on-surface-variant hover:border-primary/50'}`}
          >
            <span className="material-symbols-outlined text-3xl mb-2">admin_panel_settings</span>
            <span className="font-title-sm">Admin</span>
          </button>
        </div>

        {error && <div className="text-error font-body-sm mb-4 text-center p-3 bg-error/10 rounded-lg">{error}</div>}
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="input-group">
            <input 
              type="email" 
              className="glass-input w-full p-3 rounded-lg border border-outline-variant bg-surface-container text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" 
              placeholder="Email Address" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={role === 'admin'} // Lock for admin demo
            />
          </div>
          <div className="input-group">
            <input 
              type="password" 
              className="glass-input w-full p-3 rounded-lg border border-outline-variant bg-surface-container text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" 
              placeholder="Password" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={role === 'admin'} // Lock for admin demo
            />
          </div>
          
          <button type="submit" className="w-full py-3 rounded-lg bg-primary text-on-primary font-title-sm font-semibold hover:bg-primary/90 transition-colors shadow-md mt-6">
            Sign In as {role === 'admin' ? 'Admin' : 'User'}
          </button>
        </form>
      </div>
    </div>
  );
}

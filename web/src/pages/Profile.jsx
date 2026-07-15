import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { gql, useQuery, useMutation } from '@apollo/client';
import { useAuth } from '../context/AuthContext';

const GET_PROFILE_DATA = gql`
  query GetProfileData($userId: ID!) {
    me {
      name
      weight
      height
      bmi
      targetPhysique
    }
  }
`;

const UPDATE_USER_PROFILE = gql`
  mutation UpdateUserProfile($name: String, $weight: Float!, $height: Float!, $targetPhysique: String) {
    updateUserProfile(name: $name, weight: $weight, height: $height, targetPhysique: $targetPhysique) {
      id
      name
      weight
      height
      bmi
      targetPhysique
    }
  }
`;

function ToggleSwitch({ id, checked, onChange }) {
  return (
    <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
      <input 
        type="checkbox" 
        name={id} 
        id={id} 
        checked={checked}
        onChange={onChange}
        className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer z-10 opacity-0" 
      />
      <label 
        htmlFor={id} 
        className="toggle-label block overflow-hidden h-6 rounded-full bg-[#424754] cursor-pointer"
      ></label>
    </div>
  );
}

export default function Profile() {
  const navigate = useNavigate();
  const [biometricEnabled, setBiometricEnabled] = useState(true);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ name: '', weight: '', height: '', targetPhysique: '' });

  const { currentUser } = useAuth();
  const { data } = useQuery(GET_PROFILE_DATA, {
    variables: { userId: currentUser?.uid || 'mock-user-123' },
    skip: !currentUser,
    onCompleted: (data) => {
      if (data?.me) {
        setEditForm({
          name: data.me.name || '',
          weight: data.me.weight || '',
          height: data.me.height || '',
          targetPhysique: data.me.targetPhysique || 'Maintenance'
        });
      }
    }
  });

  const [updateProfile, { loading: updating }] = useMutation(UPDATE_USER_PROFILE, {
    refetchQueries: ['GetProfileData', 'GetDashboardData']
  });

  const weight = data?.me?.weight || 0;
  const height = data?.me?.height || 0;
  const bmi = data?.me?.bmi || 0;
  const name = data?.me?.name || 'User';
  const targetPhysique = data?.me?.targetPhysique || 'Maintenance';

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile({
        variables: {
          name: editForm.name,
          weight: parseFloat(editForm.weight) || 0,
          height: parseFloat(editForm.height) || 0,
          targetPhysique: editForm.targetPhysique
        }
      });
      setIsEditing(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSignOut = () => {
    navigate('/login');
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-stack-md pb-8">
      <header className="mb-stack-lg">
        <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-2">Profile & Settings</h2>
        <p className="font-body-sm text-body-sm text-on-surface-variant">Manage your clinical data and security preferences.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-stack-md">
        {/* Identity Card */}
        <section className="md:col-span-12 glass-card rounded-xl p-stack-md flex flex-col md:flex-row items-center gap-stack-md relative overflow-hidden">
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-tertiary/30 shadow-[0_0_20px_rgba(60,221,199,0.2)] shrink-0 z-10">
            <img className="w-full h-full object-cover" alt="Profile" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBfrNKn1vI9X1G8_mFpMPM6Hjfu0QkzCNInu6gWMzLufpGXJuT_E1VX4TN8hnEezJvOZyVaIwMqTKvt824PNaTSx9zctiFBqWawRYiEuUDw8Y22349M4mZZc2yFmZz2TcHaO_ZgPuGUjYGanCa-6vxOqfDSwDjAGTdh5n6pPI8_jT3zz7OqzhPkIm9zRvwv7iTmr9CGVeQUQ-rB3K_pi-xb8ULHtvbTLjQMLpk0Vr-2pGQ4ir6cI1x31Q" />
          </div>
          <div className="text-center md:text-left z-10 flex-1">
            <h3 className="font-headline-md text-headline-md text-on-surface">{name}</h3>
            <p className="font-body-sm text-body-sm text-primary mb-2">Connected with VitalSync</p>
            <p className="font-label-caps text-label-caps text-on-surface-variant mb-4 uppercase">Target Physique: {targetPhysique}</p>
            <button 
              onClick={() => setIsEditing(true)}
              className="bg-surface-container hover:bg-surface-bright text-on-surface px-4 py-2 rounded-full font-label-caps text-label-caps border border-outline-variant transition-colors">
                Edit Profile
            </button>
          </div>
          {/* Decorative background ring */}
          <div className="absolute right-[-10%] top-[-50%] w-64 h-64 border-[1px] border-tertiary/10 rounded-full z-0"></div>
        </section>

        {/* Vitals Bento */}
        <section className="md:col-span-12 grid grid-cols-3 gap-base">
          <div className="glass-card rounded-xl p-stack-sm flex flex-col items-center justify-center text-center">
            <span className="material-symbols-outlined text-outline-variant mb-1">monitor_weight</span>
            <span className="font-display-metrics text-headline-md text-tertiary drop-shadow-[0_0_8px_rgba(60,221,199,0.5)]">{weight}<span className="text-sm">kg</span></span>
            <span className="font-label-caps text-label-caps text-on-surface-variant mt-1">Weight</span>
          </div>
          <div className="glass-card rounded-xl p-stack-sm flex flex-col items-center justify-center text-center relative overflow-hidden">
            <span className="material-symbols-outlined text-primary mb-1">vital_signs</span>
            <span className="font-display-metrics text-headline-md text-primary glow-primary">{bmi}</span>
            <span className="font-label-caps text-label-caps text-on-surface-variant mt-1">BMI</span>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-surface-container"><div className="h-full bg-primary" style={{width: bmi > 0 ? '100%' : '0%'}}></div></div>
          </div>
          <div className="glass-card rounded-xl p-stack-sm flex flex-col items-center justify-center text-center">
            <span className="material-symbols-outlined text-outline-variant mb-1">height</span>
            <span className="font-display-metrics text-headline-md text-on-surface">{height}<span className="text-sm">cm</span></span>
            <span className="font-label-caps text-label-caps text-on-surface-variant mt-1">Height</span>
          </div>
        </section>

        {/* Security & Biometrics */}
        <section className="md:col-span-12 glass-card rounded-xl p-stack-md flex flex-col gap-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="material-symbols-outlined text-primary">security</span>
            <h3 className="font-headline-md text-[18px] text-on-surface">Authentication</h3>
          </div>
          
          <div className="flex items-center justify-between py-2 border-b border-white/5">
            <div>
              <p className="font-body-lg text-body-lg text-on-surface">Biometric Login</p>
              <p className="font-body-sm text-body-sm text-on-surface-variant">Use FaceID or TouchID to authenticate</p>
            </div>
            <ToggleSwitch 
              id="biometric" 
              checked={biometricEnabled} 
              onChange={() => setBiometricEnabled(!biometricEnabled)} 
            />
          </div>
          
          <div className="flex items-center justify-between py-2 border-b border-white/5">
            <div>
              <p className="font-body-lg text-body-lg text-on-surface">Two-Factor Auth (2FA)</p>
              <p className="font-body-sm text-body-sm text-on-surface-variant">Require secondary code on new devices</p>
            </div>
            <ToggleSwitch 
              id="twofactor" 
              checked={twoFactorEnabled} 
              onChange={() => setTwoFactorEnabled(!twoFactorEnabled)} 
            />
          </div>
          
          <div className="flex items-center justify-between py-2 cursor-pointer group">
            <div>
              <p className="font-body-lg text-body-lg text-on-surface group-hover:text-primary transition-colors">Change Password</p>
              <p className="font-body-sm text-body-sm text-on-surface-variant">Last updated 45 days ago</p>
            </div>
            <button className="p-2 rounded-full group-hover:bg-surface-container transition-colors text-outline">
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </section>

        <section className="md:col-span-12 mt-4 flex justify-center">
          <button 
            onClick={handleSignOut}
            className="flex items-center gap-2 text-error hover:text-error-container transition-colors font-label-caps text-label-caps py-3 px-6 rounded-lg border border-error/20 bg-error/5 hover:bg-error/10">
            <span className="material-symbols-outlined text-[18px]">logout</span>
            Sign Out
          </button>
        </section>
      </div>

      {/* Edit Profile Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md">
          <div className="glass-card p-6 max-w-md w-full mx-4 rounded-2xl relative">
            <button onClick={() => setIsEditing(false)} className="absolute top-4 right-4 text-outline hover:text-on-surface">
              <span className="material-symbols-outlined">close</span>
            </button>
            <h2 className="font-headline-md text-headline-md text-on-surface mb-6">Edit Profile</h2>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="block font-label-caps text-label-caps text-on-surface-variant mb-1 uppercase">Name</label>
                <input type="text" className="w-full glass-input" value={editForm.name} onChange={e => setEditForm({...editForm, name: e.target.value})} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-label-caps text-label-caps text-on-surface-variant mb-1 uppercase">Weight (kg)</label>
                  <input type="number" step="0.1" className="w-full glass-input" value={editForm.weight} onChange={e => setEditForm({...editForm, weight: e.target.value})} />
                </div>
                <div>
                  <label className="block font-label-caps text-label-caps text-on-surface-variant mb-1 uppercase">Height (cm)</label>
                  <input type="number" step="1" className="w-full glass-input" value={editForm.height} onChange={e => setEditForm({...editForm, height: e.target.value})} />
                </div>
              </div>
              <div>
                <label className="block font-label-caps text-label-caps text-on-surface-variant mb-1 uppercase">Target Physique</label>
                <select className="w-full glass-input" value={editForm.targetPhysique} onChange={e => setEditForm({...editForm, targetPhysique: e.target.value})}>
                  <option value="Weight Loss">Weight Loss</option>
                  <option value="Muscle Gain">Muscle Gain</option>
                  <option value="Maintenance">Maintenance</option>
                </select>
              </div>
              <button 
                type="submit" 
                disabled={updating}
                className="w-full bg-primary text-on-primary font-headline-md py-3 rounded-xl transition-transform hover:scale-[0.98] mt-4">
                {updating ? 'Saving...' : 'Save Changes'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

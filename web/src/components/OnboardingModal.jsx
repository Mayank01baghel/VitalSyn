import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { Scale } from 'lucide-react';

const UPDATE_USER_PROFILE = gql`
  mutation UpdateUserProfile($name: String, $weight: Float!, $height: Float!) {
    updateUserProfile(name: $name, weight: $weight, height: $height) {
      id
      name
      weight
      height
      bmi
    }
  }
`;

export default function OnboardingModal({ isOpen, onClose }) {
  const [name, setName] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [updateProfile, { loading, error }] = useMutation(UPDATE_USER_PROFILE, {
    refetchQueries: ['GetDashboardData', 'GetProfileData']
  });

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (weight && height) {
      try {
        await updateProfile({
          variables: {
            name: name || undefined,
            weight: parseFloat(weight),
            height: parseFloat(height)
          }
        });
        onClose();
      } catch (err) {
        console.error("Failed to update profile", err);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md">
      <div className="glass-panel p-8 max-w-sm w-full mx-4 text-center transform transition-all">
        <div className="flex justify-center mb-4">
          <img src="/logo.png" alt="VitalSync Logo" style={{ width: '48px', height: '48px', objectFit: 'contain' }} />
        </div>
        <h2 className="font-headline-md text-headline-md text-on-surface mb-2">Welcome to VitalSync!</h2>
        <p className="font-body-sm text-body-sm text-on-surface-variant mb-6">
          To personalize your goals and track your progress accurately, we need two quick details.
        </p>

        {error && <p className="text-error mb-4 text-sm">Failed to save data. Try again.</p>}

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <div>
            <label className="block font-label-caps text-label-caps text-on-surface-variant mb-1 ml-1 uppercase">Your Name</label>
            <input 
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full glass-input"
              placeholder="e.g. Alex Mercer"
            />
          </div>
          <div>
            <label className="block font-label-caps text-label-caps text-on-surface-variant mb-1 ml-1 uppercase">Weight (kg)</label>
            <input 
              type="number"
              step="0.1"
              required
              min="20"
              max="300"
              value={weight}
              onChange={e => setWeight(e.target.value)}
              className="w-full glass-input"
              placeholder="e.g. 75.5"
            />
          </div>
          <div>
            <label className="block font-label-caps text-label-caps text-on-surface-variant mb-1 ml-1 uppercase">Height (cm)</label>
            <input 
              type="number"
              step="1"
              required
              min="50"
              max="250"
              value={height}
              onChange={e => setHeight(e.target.value)}
              className="w-full glass-input"
              placeholder="e.g. 175"
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-tertiary text-on-tertiary font-headline-md text-body-md py-3 rounded-xl transition-transform hover:scale-[0.98] glow-tertiary mt-6"
          >
            {loading ? 'Saving...' : 'Calculate BMI & Start'}
          </button>
        </form>
      </div>
    </div>
  );
}

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';

const SYNC_WEARABLE = gql`
  mutation SyncWearable($provider: String!) {
    syncWearable(provider: $provider)
  }
`;

function IntegrationCard({ icon, iconColor, title, subtitle, isConnected, onConnect }) {
  return (
    <div className="glass-card rounded-2xl p-6 flex items-center justify-between transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] border border-white/10">
      <div className="flex items-center space-x-5">
        <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center shadow-inner">
          <span className={`material-symbols-outlined ${iconColor} text-3xl drop-shadow-md`} style={{ fontVariationSettings: "'FILL' 1" }}>
            {icon}
          </span>
        </div>
        <div>
          <h3 className="font-display-metrics text-2xl font-bold text-on-surface">{title}</h3>
          <p className="font-body-lg text-lg text-on-surface-variant mt-1">{subtitle}</p>
        </div>
      </div>
      {isConnected ? (
        <button className="bg-surface-container-high border border-outline-variant text-on-surface font-bold text-sm px-6 py-3 rounded-full hover:bg-surface-variant transition-colors shadow-lg">
          Connected
        </button>
      ) : (
        <button 
          onClick={onConnect}
          className="bg-primary text-on-primary font-bold text-sm px-6 py-3 rounded-full hover:bg-primary-fixed transition-colors shadow-[0_0_20px_rgba(175,198,255,0.5)] hover:shadow-[0_0_25px_rgba(175,198,255,0.7)] hover:scale-105 transform">
          Connect
        </button>
      )}
    </div>
  );
}

export default function Connect() {
  const navigate = useNavigate();
  const [syncWearable] = useMutation(SYNC_WEARABLE);
  const [connected, setConnected] = React.useState({ apple: false, fitbit: false, google: true });

  const handleConnect = async (provider) => {
    try {
      await syncWearable({ variables: { provider } });
      setConnected(prev => ({ ...prev, [provider]: true }));
    } catch (e) {
      console.error(e);
    }
  };

  const handleSkip = () => {
    navigate('/dashboard');
  };

  return (
    <div className="bg-background text-on-background font-body-lg min-h-screen antialiased flex flex-col">
      <main className="flex-grow flex flex-col items-center justify-center p-8">
        <div className="w-full max-w-xl mx-auto space-y-10">
          
          <header className="text-center space-y-6">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-surface-container-high border-2 border-primary/30 mb-2 shadow-[0_0_40px_rgba(175,198,255,0.25)]">
              <span className="material-symbols-outlined text-primary text-5xl drop-shadow-lg" style={{ fontVariationSettings: "'FILL' 1" }}>
                vital_signs
              </span>
            </div>
            <h1 className="font-display-metrics text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary via-[#ffc6e4] to-tertiary tracking-tight drop-shadow-sm pb-2">
              Connect Your Life
            </h1>
            <p className="font-body-lg text-xl text-on-surface-variant max-w-lg mx-auto leading-relaxed">
              Sync your wearables to bring all your health data into one clinically precise dashboard.
            </p>
          </header>
          
          <div className="space-y-6 relative">
            <div className="absolute -inset-10 bg-primary/5 rounded-[40px] blur-3xl -z-10"></div>
            <IntegrationCard 
              icon="favorite" 
              iconColor="text-primary" 
              title="Apple Health" 
              subtitle="Vitals, Activity & Sleep" 
              isConnected={connected.apple} 
              onConnect={() => handleConnect('apple')}
            />
            <IntegrationCard 
              icon="watch" 
              iconColor="text-tertiary" 
              title="Fitbit" 
              subtitle="Activity & Heart Rate" 
              isConnected={connected.fitbit}
              onConnect={() => handleConnect('fitbit')} 
            />
            <IntegrationCard 
              icon="directions_run" 
              iconColor="text-secondary" 
              title="Google Fit" 
              subtitle="Workouts & Steps" 
              isConnected={connected.google} 
              onConnect={() => handleConnect('google')}
            />
          </div>
          
          <div className="glass-card rounded-2xl p-8 text-center border border-white/20 shadow-2xl mt-12 bg-surface-variant/30">
            <span className="material-symbols-outlined text-outline text-4xl mb-4 drop-shadow-sm">lock</span>
            <p className="font-body-lg text-lg text-on-surface-variant leading-relaxed">
              Your data is <span className="font-bold text-on-surface">securely encrypted</span>. We only sync metrics necessary for your health insights and never share your raw data.
            </p>
          </div>
          
          <div className="pt-8 flex justify-center">
            <button 
              onClick={handleSkip}
              className="font-bold text-lg text-primary hover:text-primary-fixed-dim hover:underline transition-all underline-offset-4">
              Skip for now
            </button>
          </div>
          
        </div>
      </main>
    </div>
  );
}

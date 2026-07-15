import React from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import { useAuth } from '../context/AuthContext';

const GET_DASHBOARD_DATA = gql`
  query GetDashboardData($userId: ID!) {
    me {
      name
      weight
      height
      bmi
    }
    healthRecords(userId: $userId) {
      metricType
      value
    }
    goals(userId: $userId) {
      metricType
      targetValue
    }
  }
`;

const LOG_HEALTH_RECORD = gql`
  mutation LogHealthRecord($input: HealthRecordInput!) {
    logHealthRecord(input: $input) {
      id
      metricType
      value
    }
  }
`;

function WelcomeSection({ name }) {
  return (
    <section className="py-4">
      <h2 className="font-headline-md text-headline-md text-on-surface">Hello, {name || 'User'}</h2>
      <p className="font-body-sm text-body-sm text-on-surface-variant">Here's your daily summary</p>
    </section>
  );
}

function ActivityCard({ steps, targetSteps }) {
  return (
    <div className="md:col-span-8 glass-card rounded-xl p-6 relative overflow-hidden flex flex-col justify-between min-h-[280px]">
      <div className="flex justify-between items-start z-10">
        <div>
          <div className="flex items-center gap-2 text-primary mb-1">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>directions_run</span>
            <span className="font-label-caps text-label-caps uppercase">Activity</span>
          </div>
          <h3 className="font-display-metrics text-display-metrics text-primary glow-primary inline-block">{steps.toLocaleString()}</h3>
          <p className="font-body-sm text-body-sm text-on-surface-variant">/ {targetSteps.toLocaleString()} steps</p>
        </div>
        <div className="text-right">
          <div className="font-headline-md text-headline-md text-on-surface">450</div>
          <div className="font-label-caps text-label-caps text-on-surface-variant uppercase">kcal</div>
        </div>
      </div>
      {/* SVG Progress Chart Placeholder */}
      <div className="absolute bottom-0 left-0 w-full h-32 opacity-50 z-0">
        <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 400 100">
          <path d="M0 100 L0 50 Q 50 20, 100 60 T 200 40 T 300 70 T 400 30 L400 100 Z" fill="url(#grad-primary)"></path>
          <defs>
            <linearGradient id="grad-primary" x1="0%" x2="0%" y1="0%" y2="100%">
              <stop offset="0%" stopColor="#afc6ff" stopOpacity="0.8"></stop>
              <stop offset="100%" stopColor="#afc6ff" stopOpacity="0"></stop>
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function HeartRateCard({ heartRate }) {
  return (
    <div className="md:col-span-4 glass-card rounded-xl p-6 flex flex-col justify-between">
      <div className="flex items-center gap-2 text-secondary mb-4">
        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
        <span className="font-label-caps text-label-caps uppercase">Heart Rate</span>
      </div>
      <div className="flex justify-center items-center py-4 relative">
        <div className="w-32 h-32 relative">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 128 128">
            <circle cx="64" cy="64" fill="none" r="56" stroke="rgba(255, 218, 216, 0.1)" strokeWidth="8"></circle>
            <circle className="progress-ring drop-shadow-[0_0_8px_rgba(255,179,176,0.6)]" cx="64" cy="64" fill="none" r="56" stroke="#ffb3b0" strokeDasharray="351.86" strokeDashoffset={heartRate ? 100 : 351.86} strokeLinecap="round" strokeWidth="8"></circle>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-headline-lg text-headline-lg text-secondary">{heartRate}</span>
            <span className="font-label-caps text-label-caps text-on-surface-variant">BPM</span>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center mt-2 border-t border-white/5 pt-3">
        <div className="text-center">
          <div className="font-label-caps text-label-caps text-on-surface-variant">RESTING</div>
          <div className="font-body-sm text-body-sm text-on-surface">58</div>
        </div>
        <div className="text-center">
          <div className="font-label-caps text-label-caps text-on-surface-variant">HIGH</div>
          <div className="font-body-sm text-body-sm text-on-surface">112</div>
        </div>
      </div>
    </div>
  );
}

function HydrationCard({ water = 0 }) {
  const waterLiters = (water / 1000).toFixed(1);
  return (
    <div className="md:col-span-6 glass-card rounded-xl p-6 flex flex-col">
      <div className="flex items-center gap-2 text-tertiary mb-2">
        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>water_drop</span>
        <span className="font-label-caps text-label-caps uppercase">Hydration</span>
      </div>
      <div className="flex items-end gap-3 mt-2 mb-6">
        <h3 className="font-display-metrics text-display-metrics text-tertiary glow-tertiary">{waterLiters}</h3>
        <span className="font-body-sm text-body-sm text-on-surface-variant mb-2">/ 2.5 L</span>
      </div>
      {/* Custom wave visualizer placeholder */}
      <div className="h-16 w-full rounded-full bg-surface-container overflow-hidden relative border border-white/10 mt-auto">
        <div className="absolute bottom-0 left-0 h-full bg-gradient-to-r from-tertiary-container to-tertiary rounded-full shadow-[0_0_15px_rgba(60,221,199,0.3)]" style={{ width: `${Math.min((water / 2500) * 100, 100)}%` }}></div>
        <div className="absolute inset-0 flex justify-around items-center px-4 opacity-50">
          <div className="w-px h-full bg-surface-dim"></div>
          <div className="w-px h-full bg-surface-dim"></div>
          <div className="w-px h-full bg-surface-dim"></div>
        </div>
      </div>
    </div>
  );
}

function SleepCard() {
  return (
    <div className="md:col-span-6 glass-card rounded-xl p-6 flex flex-col justify-between">
      <div className="flex items-center gap-2 text-[#d9e2ff] mb-2">
        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>bedtime</span>
        <span className="font-label-caps text-label-caps uppercase">Sleep</span>
      </div>
      <div className="flex items-end gap-3 mt-2">
        <h3 className="font-display-metrics text-display-metrics text-[#d9e2ff] drop-shadow-[0_0_15px_rgba(217,226,255,0.2)]">6h 45m</h3>
      </div>
      <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Light sleep dominating.</p>
      <div className="flex gap-1 h-8 mt-6 rounded-full overflow-hidden">
        <div className="w-1/4 h-full bg-surface-container-high"></div>
        <div className="w-1/2 h-full bg-primary/40"></div>
        <div className="w-1/4 h-full bg-primary-container"></div>
      </div>
      <div className="flex justify-between text-[10px] text-outline mt-1 px-1">
        <span>Awake</span>
        <span>Light</span>
        <span>Deep</span>
      </div>
    </div>
  );
}

function GoalCard({ targetWeight }) {
  if (!targetWeight) return null;
  return (
    <div className="md:col-span-12 glass-card rounded-xl p-6 flex justify-between items-center bg-gradient-to-r from-surface-container-high to-surface-container relative overflow-hidden">
      <div className="z-10">
        <div className="flex items-center gap-2 text-tertiary mb-1">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>flag</span>
          <span className="font-label-caps text-label-caps uppercase">Current Goal</span>
        </div>
        <h3 className="font-headline-md text-headline-md text-on-surface">Target Weight: {targetWeight} kg</h3>
        <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Based on your BMI, hit this target to reach optimal fitness.</p>
      </div>
      <div className="z-10 bg-tertiary/10 p-3 rounded-full border border-tertiary/20">
        <span className="material-symbols-outlined text-tertiary text-3xl">trending_up</span>
      </div>
      {/* Decorative background glow */}
      <div className="absolute right-0 top-0 w-32 h-32 bg-tertiary/5 rounded-full blur-2xl"></div>
    </div>
  );
}

function ActionArea({ onLogWater, onStartWorkout }) {
  return (
    <div className="md:col-span-12 flex gap-4 mt-2">
      <button 
        onClick={onLogWater}
        className="flex-1 bg-surface-container-high hover:bg-surface-bright text-on-surface font-headline-md text-body-sm py-4 rounded-xl flex items-center justify-center gap-2 transition-colors border border-white/5">
        <span className="material-symbols-outlined text-tertiary">add</span>
        Log Water (250ml)
      </button>
      <button 
        onClick={onStartWorkout}
        className="flex-1 bg-primary text-on-primary font-headline-md text-body-sm py-4 rounded-xl flex items-center justify-center gap-2 transition-transform hover:scale-[0.98] glow-primary">
        <span className="material-symbols-outlined">play_arrow</span>
        Add 1000 Steps
      </button>
    </div>
  );
}

import OnboardingModal from '../components/OnboardingModal';

export default function Dashboard() {
  const { currentUser } = useAuth();
  
  const { loading, error, data } = useQuery(GET_DASHBOARD_DATA, {
    variables: { userId: currentUser?.uid || 'mock-user-123' },
    skip: !currentUser,
    pollInterval: 2000,
  });

  const [logRecord] = useMutation(LOG_HEALTH_RECORD);

  if (loading) return <div className="text-center py-20 text-on-surface">Loading health data...</div>;
  if (error) return <div className="text-center py-20 text-error">Error loading dashboard.</div>;

  const name = data?.me?.name;
  const showOnboarding = data?.me && !data.me.weight;
  
  const records = data?.healthRecords || [];
  const heartRateRecord = records.find(r => r.metricType === 'heart_rate');
  const heartRate = heartRateRecord ? heartRateRecord.value : 0;
  
  const stepsRecord = records.find(r => r.metricType === 'steps');
  const steps = stepsRecord ? stepsRecord.value : 0;

  const waterRecords = records.filter(r => r.metricType === 'water');
  const water = waterRecords.reduce((acc, r) => acc + r.value, 0);

  const userGoals = data?.goals || [];
  const stepsGoal = userGoals.find(g => g.metricType === 'steps');
  const targetSteps = stepsGoal ? stepsGoal.targetValue : 10000;
  
  const weightGoal = userGoals.find(g => g.metricType === 'weight');
  const targetWeight = weightGoal ? weightGoal.targetValue : null;

  return (
    <div className="max-w-7xl mx-auto space-y-stack-md pt-stack-sm pb-8">
      <OnboardingModal isOpen={showOnboarding} onClose={() => {}} />
      <WelcomeSection name={name} />
      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-stack-sm md:gap-stack-md">
        <ActivityCard steps={steps} targetSteps={targetSteps} />
        <HeartRateCard heartRate={heartRate} />
        <HydrationCard water={water} />
        <SleepCard />
        <GoalCard targetWeight={targetWeight} />
        <ActionArea 
          onLogWater={() => logRecord({ variables: { input: { metricType: 'water', value: 250, source: 'manual' } } })}
          onStartWorkout={() => {
            const currentSteps = steps || 0;
            logRecord({ variables: { input: { metricType: 'steps', value: currentSteps + 1000, source: 'manual' } } })
          }}
        />
      </div>
    </div>
  );
}

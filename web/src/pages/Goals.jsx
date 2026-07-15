import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { useAuth } from '../context/AuthContext';

const GET_GOALS_DATA = gql`
  query GetGoalsData($userId: ID!) {
    me {
      bmi
    }
    goals(userId: $userId) {
      metricType
      targetValue
    }
    healthRecords(userId: $userId) {
      metricType
      value
    }
  }
`;

function ActivityGoalCard({ icon, label, current, target, colorClass, widthPercent, shadowClass }) {
  return (
    <div className="glass-panel rounded-xl p-4 flex flex-col justify-between gap-4 relative overflow-hidden group">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-2">
          <span className={`material-symbols-outlined ${colorClass}`} style={{ fontVariationSettings: "'FILL' 1" }}>{icon}</span>
          <span className="font-label-caps text-on-surface-variant uppercase">{label}</span>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <span className="font-display-metrics text-headline-lg-mobile md:text-display-metrics text-on-surface metric-glow">{current}</span>
        <span className="font-body-sm text-outline">/ {target}</span>
      </div>
      {/* Progress Bar */}
      <div className="w-full h-1.5 bg-surface-container-high rounded-full overflow-hidden">
        <div className={`h-full ${colorClass.replace('text-', 'bg-')} rounded-full ${shadowClass}`} style={{ width: `${widthPercent}%` }}></div>
      </div>
    </div>
  );
}

function MilestoneItem({ icon, title, desc, date, colorClass, bgClass }) {
  return (
    <div className="glass-panel p-4 rounded-xl flex items-center gap-4 hover:bg-surface-container-highest transition-colors cursor-pointer">
      <div className={`w-12 h-12 rounded-full ${bgClass} flex items-center justify-center shrink-0`}>
        <span className={`material-symbols-outlined ${colorClass}`}>{icon}</span>
      </div>
      <div className="flex flex-col flex-grow">
        <span className="font-body-lg text-on-surface">{title}</span>
        <span className="font-body-sm text-outline">{desc}</span>
      </div>
      <span className="text-label-caps text-outline whitespace-nowrap">{date}</span>
    </div>
  );
}

export default function Goals() {
  const { currentUser } = useAuth();
  
  const { loading, error, data } = useQuery(GET_GOALS_DATA, {
    variables: { userId: currentUser?.uid || 'mock-user-123' },
    skip: !currentUser,
  });

  const userGoals = data?.goals || [];
  const stepsGoal = userGoals.find(g => g.metricType === 'steps');
  const targetSteps = stepsGoal ? stepsGoal.targetValue : 10000;
  
  const records = data?.healthRecords || [];
  const stepsRecord = records.find(r => r.metricType === 'steps');
  const steps = stepsRecord ? stepsRecord.value : 0;
  
  const stepPercent = Math.min((steps / targetSteps) * 100, 100);

  const bmi = data?.me?.bmi || 0;
  
  let planTitle = "Standard Fitness Maintenance";
  let planDesc = "Maintain your current routine with a balanced mix of cardio and strength training.";
  let planAction1 = "30 mins of moderate cardio daily";
  let planAction2 = "2 days of strength training weekly";
  let planColor = "text-tertiary";
  let planBg = "bg-tertiary/10";
  let planIcon = "fitness_center";

  if (bmi > 25) {
    planTitle = "Active Weight Loss Regimen";
    planDesc = "Focus on increasing your caloric deficit through high-volume steps and aerobic exercises.";
    planAction1 = "45 mins of Zone 2 Cardio (Jogging/Cycling)";
    planAction2 = "Hit your elevated 12,000 daily step goal";
    planColor = "text-secondary";
    planBg = "bg-secondary/10";
    planIcon = "local_fire_department";
  } else if (bmi > 0 && bmi < 18.5) {
    planTitle = "Muscle & Mass Building";
    planDesc = "Focus on caloric surplus and resistance training to build healthy muscle mass.";
    planAction1 = "4 days of heavy resistance training";
    planAction2 = "Prioritize protein intake and rest";
    planColor = "text-primary";
    planBg = "bg-primary/10";
    planIcon = "fitness_center";
  }

  return (
    <div className="flex flex-col gap-stack-md pt-stack-sm max-w-7xl mx-auto md:grid md:grid-cols-12 w-full">
      {/* Header Section */}
      <div className="col-span-12 flex flex-col gap-base">
        <h2 className="font-headline-lg-mobile md:font-headline-lg text-primary">Activity & Goals</h2>
        <p className="text-on-surface-variant text-body-sm">Track your progress and manage wellness targets.</p>
      </div>

      {/* Today's Progress Overview (Bento Grid) */}
      <div className="col-span-12 grid grid-cols-2 md:grid-cols-4 gap-gutter">
        <ActivityGoalCard icon="directions_walk" label="STEPS" current={steps.toLocaleString()} target={targetSteps.toLocaleString()} colorClass="text-tertiary" widthPercent={stepPercent} shadowClass="shadow-[0_0_8px_rgba(60,221,199,0.5)]" />
        <ActivityGoalCard icon="local_fire_department" label="BURN" current="0" target="2,340 kcal" colorClass="text-secondary" widthPercent={0} shadowClass="shadow-[0_0_8px_rgba(255,179,176,0.5)]" />
        <div className="col-span-2 md:col-span-1">
          <ActivityGoalCard icon="bedtime" label="SLEEP" current="0h 0m" target="8h target" colorClass="text-primary" widthPercent={0} shadowClass="shadow-[0_0_8px_rgba(175,198,255,0.5)]" />
        </div>
        <div className="col-span-2 md:col-span-1">
          <ActivityGoalCard icon="timer" label="ACTIVE" current="0m" target="60m daily" colorClass="text-inverse-primary" widthPercent={0} shadowClass="shadow-[0_0_8px_rgba(0,88,201,0.5)]" />
        </div>
      </div>

      {/* Personalized Fitness Plan Area */}
      <div className="col-span-12 md:col-span-8 glass-panel rounded-xl p-container-padding flex flex-col gap-stack-sm min-h-[300px] border border-white/5 relative overflow-hidden">
        <div className="flex items-center gap-3 mb-2 z-10">
          <div className={`p-3 rounded-full ${planBg}`}>
            <span className={`material-symbols-outlined ${planColor} text-3xl`}>{planIcon}</span>
          </div>
          <div>
            <h3 className="font-headline-md text-on-surface">Your BMI Action Plan</h3>
            <p className="text-body-sm text-on-surface-variant">Personalized strategy based on your current biometric profile.</p>
          </div>
        </div>
        
        <div className="z-10 mt-4 p-6 bg-surface-container/50 rounded-xl border border-white/5">
          <h4 className={`font-headline-md text-[20px] mb-2 ${planColor} glow-primary inline-block`}>{planTitle}</h4>
          <p className="text-body-lg text-on-surface mb-6">{planDesc}</p>
          
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="material-symbols-outlined text-outline-variant">check_circle</span>
              <span className="font-body-md text-on-surface">{planAction1}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="material-symbols-outlined text-outline-variant">check_circle</span>
              <span className="font-body-md text-on-surface">{planAction2}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="material-symbols-outlined text-outline-variant">check_circle</span>
              <span className="font-body-md text-on-surface">Log your daily weight to track progress</span>
            </div>
          </div>
        </div>
        
        {/* Background glow */}
        <div className={`absolute top-0 right-0 w-64 h-64 rounded-full ${planBg} blur-3xl opacity-30 z-0`}></div>
      </div>

      {/* Milestones / History List */}
      <div className="col-span-12 md:col-span-4 flex flex-col gap-stack-sm mt-8 md:mt-0">
        <h3 className="font-headline-md text-on-surface mb-2">Recent Milestones</h3>
        <div className="flex flex-col gap-3">
          <MilestoneItem icon="workspace_premium" title="Perfect Week: Steps" desc="Hit 10k steps 7 days in a row" date="Yesterday" colorClass="text-tertiary" bgClass="bg-tertiary-container/20" />
          <MilestoneItem icon="sprint" title="New Distance Record" desc="Ran 5.2 miles" date="May 18" colorClass="text-primary" bgClass="bg-primary-container/20" />
          <MilestoneItem icon="local_fire_department" title="Calorie Crusher" desc="Burned 3,000 kcal in a day" date="May 15" colorClass="text-secondary" bgClass="bg-secondary-container/20" />
        </div>
        <button className="mt-4 py-3 w-full rounded-xl border border-surface-variant text-primary hover:bg-surface-variant transition-colors font-body-lg flex justify-center items-center gap-2">
          View All History
          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
        </button>
      </div>
    </div>
  );
}

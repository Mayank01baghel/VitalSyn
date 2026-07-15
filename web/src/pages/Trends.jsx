import React from 'react';

function WeeklySummary() {
  return (
    <section className="glass-card rounded-xl p-stack-md flex flex-col gap-stack-sm relative overflow-hidden">
      <div className="absolute -right-10 -top-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-body-sm text-body-sm text-on-surface-variant mb-1">Weekly Summary</h3>
          <div className="flex items-end gap-2">
            <span className="font-display-metrics text-display-metrics text-primary glow-text-primary">95</span>
            <span className="font-body-lg text-body-lg text-on-surface-variant mb-2">avg bmp</span>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <div className="flex items-center gap-1 text-tertiary">
            <span className="material-symbols-outlined text-[16px]">trending_up</span>
            <span className="font-label-caps text-label-caps">STABLE</span>
          </div>
          <div className="flex gap-3 mt-2 font-label-caps text-label-caps text-on-surface-variant">
            <span><span className="text-on-surface">240</span> Max</span>
            <span><span className="text-on-surface">60</span> Min</span>
          </div>
        </div>
      </div>
      {/* ECG Line Chart Visualization (Faux) */}
      <div className="h-32 w-full mt-4 relative flex items-center justify-center">
        <svg className="w-full h-full stroke-primary opacity-60" fill="none" strokeWidth="2" viewBox="0 0 400 100">
          <path d="M0,50 L50,50 L60,30 L70,80 L80,20 L90,90 L100,50 L150,50 L160,10 L170,90 L180,40 L190,60 L200,50 L250,50 L260,30 L270,70 L280,40 L290,60 L300,50 L350,50 L360,20 L370,80 L380,30 L390,70 L400,50" style={{ filter: "drop-shadow(0 0 4px rgba(175, 198, 255, 0.4))" }}></path>
        </svg>
        {/* Glowing point on chart */}
        <div className="absolute right-[25%] top-[50%] w-3 h-3 bg-primary rounded-full shadow-[0_0_10px_rgba(175,198,255,0.8)]"></div>
      </div>
      <div className="flex justify-between font-label-caps text-label-caps text-on-surface-variant mt-2 px-2">
        <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
      </div>
    </section>
  );
}

function HRVChart() {
  return (
    <section className="glass-card rounded-xl p-stack-md flex flex-col justify-between min-h-[280px]">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="font-body-sm text-body-sm text-on-surface-variant">Heart Rate Variability</h3>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="font-headline-lg-mobile text-headline-lg-mobile text-tertiary glow-text-tertiary">82</span>
            <span className="font-body-sm text-body-sm text-on-surface-variant">ms</span>
          </div>
        </div>
        <div className="bg-surface-container-high p-2 rounded-full">
          <span className="material-symbols-outlined text-tertiary" style={{ fontVariationSettings: "'FILL' 1" }}>monitor_heart</span>
        </div>
      </div>
      {/* Bar Chart (Faux) */}
      <div className="flex-1 flex items-end justify-between gap-1 mt-4 h-32">
        <div className="w-1/12 chart-bar h-[40%]"></div>
        <div className="w-1/12 chart-bar h-[60%]"></div>
        <div className="w-1/12 chart-bar h-[30%] opacity-50"></div>
        <div className="w-1/12 chart-bar h-[80%]"></div>
        <div className="w-1/12 chart-bar h-[50%]"></div>
        <div className="w-1/12 chart-bar h-[90%] bg-tertiary relative">
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-tertiary text-on-tertiary font-label-caps text-[10px] px-1.5 py-0.5 rounded">95</div>
        </div>
        <div className="w-1/12 chart-bar h-[45%]"></div>
        <div className="w-1/12 chart-bar h-[70%] opacity-50"></div>
        <div className="w-1/12 chart-bar h-[65%]"></div>
        <div className="w-1/12 chart-bar h-[35%]"></div>
      </div>
      <div className="flex justify-between font-label-caps text-[10px] text-on-surface-variant mt-4">
        <span>12am</span><span>6am</span><span>12pm</span><span>6pm</span>
      </div>
    </section>
  );
}

function StressLevel() {
  return (
    <div className="glass-card rounded-xl p-stack-sm flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-body-sm text-body-sm text-on-surface-variant">Stress Level</h3>
          <span className="material-symbols-outlined text-secondary text-[20px]">psychology</span>
        </div>
        <span className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface">Low</span>
      </div>
      <div className="mt-4">
        <div className="h-2 w-full bg-surface-container rounded-full overflow-hidden">
          <div className="h-full bg-secondary w-1/4 shadow-[0_0_8px_rgba(255,179,176,0.6)]"></div>
        </div>
        <div className="flex justify-between mt-2 font-label-caps text-[10px] text-on-surface-variant">
          <span>Avg 25%</span>
        </div>
      </div>
    </div>
  );
}

function Variability() {
  return (
    <div className="glass-card rounded-xl p-stack-sm flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-body-sm text-body-sm text-on-surface-variant">Ave. Variability</h3>
          <span className="material-symbols-outlined text-primary text-[20px]">tune</span>
        </div>
        <div className="flex items-baseline gap-1">
          <span className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface">92</span>
          <span className="font-body-sm text-body-sm text-on-surface-variant">ms</span>
        </div>
      </div>
      <div className="h-10 mt-2 flex items-center">
        <svg className="w-full stroke-primary opacity-80" fill="none" strokeWidth="2" viewBox="0 0 100 20">
          <path d="M0,10 L20,5 L40,15 L60,2 L80,18 L100,10"></path>
        </svg>
      </div>
    </div>
  );
}

function InfoBanner() {
  return (
    <div className="col-span-2 bg-secondary-container/20 border border-secondary/20 rounded-xl p-stack-sm flex items-start gap-3">
      <span className="material-symbols-outlined text-secondary mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>info</span>
      <p className="font-body-sm text-body-sm text-on-surface-variant">Your HRV is <span className="text-secondary font-bold">5% higher</span> than average for your age group.</p>
    </div>
  );
}

export default function Trends() {
  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-stack-md pt-stack-sm">
      {/* Header Section */}
      <div className="flex flex-col gap-1">
        <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface">Health Trends</h2>
        <p className="font-body-sm text-body-sm text-on-surface-variant">Your weekly insights and variability analysis.</p>
      </div>

      {/* Weekly Summary Card */}
      <WeeklySummary />

      {/* Metrics Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-md">
        {/* HRV Bar Chart Card */}
        <HRVChart />

        {/* Stress & Sleep Split */}
        <div className="grid grid-cols-2 gap-stack-md">
          {/* Stress Level */}
          <StressLevel />
          
          {/* Ave Variability */}
          <Variability />
          
          {/* Info Banner */}
          <InfoBanner />
        </div>
      </div>
    </div>
  );
}

import React from 'react';

function InsightCard({ icon, title, time, message, colorType, iconFilled }) {
  // Map the colorType to the right Tailwind utility classes
  const colors = {
    primary: {
      bg: "bg-primary-container/20",
      border: "border-primary/30",
      glow: "glow-primary",
      text: "text-primary",
      groupHover: "group-hover:text-primary",
    },
    secondary: {
      bg: "bg-secondary-container/20",
      border: "border-secondary/30",
      glow: "glow-secondary",
      text: "text-secondary",
      groupHover: "group-hover:text-secondary",
    },
    tertiary: {
      bg: "bg-tertiary-container/20",
      border: "border-tertiary/30",
      glow: "glow-tertiary",
      text: "text-tertiary",
      groupHover: "group-hover:text-tertiary",
    },
    primaryDim: {
      bg: "bg-primary-container/10",
      border: "border-primary/20",
      glow: "",
      text: "text-primary/70",
      groupHover: "group-hover:text-primary",
    }
  };

  const style = colors[colorType] || colors.primary;

  return (
    <article className={`glass-card rounded-xl p-4 md:p-6 flex items-start gap-4 hover:bg-surface-container-high transition-colors cursor-pointer group ${colorType === 'primaryDim' ? 'opacity-75' : ''}`}>
      <div className={`w-12 h-12 rounded-full ${style.bg} flex items-center justify-center flex-shrink-0 ${style.glow} ${style.border}`}>
        <span className={`material-symbols-outlined ${style.text} text-[24px]`} style={iconFilled ? { fontVariationSettings: "'FILL' 1" } : {}}>{icon}</span>
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-start mb-1">
          <h3 className={`font-headline-md text-headline-md ${colorType === 'primaryDim' ? 'text-on-surface/80' : 'text-on-surface'} ${style.groupHover} transition-colors`}>{title}</h3>
          <span className="font-body-sm text-body-sm text-outline">{time}</span>
        </div>
        <p className={`font-body-lg text-body-lg ${colorType === 'primaryDim' ? 'text-on-surface-variant/80' : 'text-on-surface-variant'} leading-relaxed`}>
          {message}
        </p>
      </div>
    </article>
  );
}

export default function Insights() {
  return (
    <div className="max-w-4xl mx-auto space-y-stack-md pt-stack-sm pb-8">
      {/* Header Section */}
      <div className="mb-stack-lg">
        <h2 className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg text-on-surface mb-2">Insights & Alerts</h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant">Your latest AI-driven health intelligence.</p>
      </div>

      {/* Filter/Segmented Control */}
      <div className="flex gap-2 p-1 bg-surface-container-high rounded-full w-full md:w-max mb-stack-lg">
        <button className="flex-1 md:w-32 py-2 px-4 rounded-full bg-surface-variant text-on-surface font-label-caps text-label-caps shadow-sm">All</button>
        <button className="flex-1 md:w-32 py-2 px-4 rounded-full text-on-surface-variant hover:text-on-surface font-label-caps text-label-caps transition-colors">Alerts</button>
        <button className="flex-1 md:w-32 py-2 px-4 rounded-full text-on-surface-variant hover:text-on-surface font-label-caps text-label-caps transition-colors">Achievements</button>
      </div>

      {/* Feed List */}
      <div className="space-y-stack-sm flex flex-col gap-4">
        <InsightCard 
          icon="monitoring" 
          title="HRV Insight" 
          time="Just now" 
          colorType="primary" 
          iconFilled={true}
          message={<>Your Heart Rate Variability is <span className="text-primary font-semibold">5% higher</span> today. Your recovery protocol is working optimally. Ready for a high-intensity session.</>} 
        />
        <InsightCard 
          icon="water_drop" 
          title="Hydration Alert" 
          time="2h ago" 
          colorType="secondary" 
          iconFilled={true}
          message={<>Based on your recent activity levels and ambient temperature, you are currently <span className="text-secondary font-semibold">under-hydrated</span>. Consume 500ml of water soon.</>} 
        />
        <InsightCard 
          icon="workspace_premium" 
          title="Sleep Goal Met" 
          time="8h ago" 
          colorType="tertiary" 
          iconFilled={true}
          message="You achieved 8 hours of restorative sleep for 3 consecutive nights. Your cognitive readiness score is at peak levels." 
        />
        <InsightCard 
          icon="directions_run" 
          title="Activity Summary" 
          time="Yesterday" 
          colorType="primaryDim" 
          iconFilled={false}
          message="Your aerobic base building phase is progressing well. Average heart rate during yesterday's run was optimal." 
        />
      </div>
    </div>
  );
}

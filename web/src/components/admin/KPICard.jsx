import React from 'react';

export default function KPICard({ 
  title, 
  value, 
  icon, 
  colorClass, 
  bgClass, 
  trend, 
  trendValue, 
  trendColor, 
  trendBg,
  subtitle,
  children
}) {
  return (
    <div className={`admin-glass-panel p-5 flex flex-col justify-between hover:bg-[#1C273D] transition-colors duration-200 border-l-2 border-l-transparent`}>
      <div className="flex justify-between items-start mb-4">
        <span className="font-label-caps text-label-caps text-on-surface-variant tracking-wider">{title}</span>
        <div className={`p-2 rounded-lg ${colorClass} ${bgClass}`}>
          <span className="material-symbols-outlined text-sm">{icon}</span>
        </div>
      </div>
      <div>
        <div className={`flex items-end gap-3 ${subtitle || children ? 'mb-4' : ''}`}>
          <span className="font-display-lg text-display-lg text-on-surface">{value}</span>
          {trend && trendValue && (
            <span className={`font-mono-data text-mono-data flex items-center mb-2 px-2 py-0.5 rounded ${trendColor} ${trendBg}`}>
              <span className="material-symbols-outlined text-[14px]">
                {trend === 'up' ? 'trending_up' : 'trending_down'}
              </span> 
              {' '}{trendValue}
            </span>
          )}
        </div>
        {subtitle && <p className="font-body-sm text-body-sm text-on-surface-variant mt-2">{subtitle}</p>}
        {children}
      </div>
    </div>
  );
}

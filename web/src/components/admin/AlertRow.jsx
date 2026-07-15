import React from 'react';

export default function AlertRow({ type, title, time, description }) {
  const isWarning = type === 'warning';
  const isInfo = type === 'info';
  const isSuccess = type === 'success';

  let icon = 'info';
  let colorClass = 'text-primary';
  let bgClass = 'bg-primary/10';
  let borderClass = 'hover:border-primary';

  if (isWarning) {
    icon = 'warning';
    colorClass = 'text-coral';
    bgClass = 'bg-coral/10';
    borderClass = 'hover:border-coral';
  } else if (isSuccess) {
    icon = 'check_circle';
    colorClass = 'text-teal';
    bgClass = 'bg-teal/10';
    borderClass = 'hover:border-teal';
  }

  return (
    <div className={`data-row flex items-start gap-4 p-3 rounded-lg cursor-pointer transition-colors border-l-2 border-transparent ${borderClass}`}>
      <div className={`p-2 rounded-full mt-1 ${bgClass}`}>
        <span className={`material-symbols-outlined text-sm ${colorClass}`}>{icon}</span>
      </div>
      <div className="flex-1">
        <div className="flex justify-between">
          <h4 className="font-body-md text-body-md font-semibold text-on-surface">{title}</h4>
          <span className="font-mono-data text-mono-data text-on-surface-variant text-xs">{time}</span>
        </div>
        <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">{description}</p>
      </div>
    </div>
  );
}

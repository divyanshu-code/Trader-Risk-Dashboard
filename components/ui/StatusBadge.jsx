import React from 'react';

export default function StatusBadge({ status, type = "neutral", icon: Icon }) {
  
  const styles = {
    success: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
    warning: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    danger: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400",
    info: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    neutral: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400",
  };

  const activeStyle = styles[type] || styles.neutral;

  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 w-fit ${activeStyle}`}>
      {Icon && <Icon className="w-3.5 h-3.5" />}
      {status}
    </span>
  );
}

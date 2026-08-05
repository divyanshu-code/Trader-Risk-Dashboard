import React from 'react';

export default function SectionHeading({ title, description, rightElement }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">{title}</h2>
        {description && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{description}</p>
        )}
      </div>
      {rightElement && (
        <div className="shrink-0">
          {rightElement}
        </div>
      )}
    </div>
  );
}

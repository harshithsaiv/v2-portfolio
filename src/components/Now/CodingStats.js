import React from 'react';

const CodingStats = () => {
  // Sample coding activity data by day and hour
  const codingData = [
    {
      day: "Monday",
      hours: {"0-4": 0, "4-8": 2, "8-12": 10, "12-16": 8, "16-20": 12, "20-24": 5}
    },
    {
      day: "Tuesday",
      hours: {"0-4": 1, "4-8": 0, "8-12": 8, "12-16": 15, "16-20": 9, "20-24": 6}
    },
    {
      day: "Wednesday",
      hours: {"0-4": 0, "4-8": 1, "8-12": 7, "12-16": 9, "16-20": 14, "20-24": 10}
    },
    {
      day: "Thursday",
      hours: {"0-4": 2, "4-8": 0, "8-12": 9, "12-16": 11, "16-20": 8, "20-24": 5}
    },
    {
      day: "Friday",
      hours: {"0-4": 0, "4-8": 3, "8-12": 5, "12-16": 7, "16-20": 10, "20-24": 9}
    },
    {
      day: "Saturday",
      hours: {"0-4": 5, "4-8": 2, "8-12": 4, "12-16": 6, "16-20": 4, "20-24": 8}
    },
    {
      day: "Sunday",
      hours: {"0-4": 3, "4-8": 1, "8-12": 3, "12-16": 9, "16-20": 7, "20-24": 6}
    }
  ];

  // Get the max value for scaling intensity
  const maxCommits = Math.max(
    ...codingData.flatMap(day => Object.values(day.hours))
  );

  // Time slot labels
  const timeSlots = ["0-4", "4-8", "8-12", "12-16", "16-20", "20-24"];
  
  // Generate color based on commits (intensity)
  const getColorIntensity = (commits) => {
    const percentage = (commits / maxCommits) * 100;
    // Purple with varying opacity based on intensity
    return `rgba(124, 58, 237, ${0.1 + (percentage / 100) * 0.9})`;
  };

  // Stats about coding
  const codingStats = {
    averageDaily: "4.5 hours",
    mostProductiveDay: "Wednesday",
    mostProductiveTime: "16:00 - 20:00",
    languages: ["Python", "JavaScript", "TypeScript", "CUDA", "C++"],
    topProjects: ["ML Optimization", "Portfolio v2", "Container Security"]
  };

  return (
    <div className="bg-gray-800/40 rounded-xl overflow-hidden p-5">
      <h3 className="text-lg font-semibold text-white mb-4">My Coding Rhythms</h3>
      
      {/* Custom heatmap implementation */}
      <div className="mb-6">
        {/* Time slot headers */}
        <div className="flex mb-2">
          <div className="w-24 flex-shrink-0"></div> {/* Empty space for day labels */}
          {timeSlots.map(slot => (
            <div key={slot} className="flex-1 text-xs text-center text-gray-400">{slot}</div>
          ))}
        </div>

        {/* Heatmap grid */}
        <div className="space-y-2">
          {codingData.map((dayData) => (
            <div key={dayData.day} className="flex items-center">
              <div className="w-24 flex-shrink-0 text-sm text-gray-300">{dayData.day}</div>
              <div className="flex-1 flex gap-1">
                {timeSlots.map(timeSlot => {
                  const commits = dayData.hours[timeSlot];
                  const isMostProductive = dayData.day === "Wednesday" && timeSlot === "16-20";
                  
                  return (
                    <div 
                      key={`${dayData.day}-${timeSlot}`}
                      className={`flex-1 h-12 rounded relative ${isMostProductive ? 'ring-2 ring-white/30' : ''}`}
                      style={{ backgroundColor: getColorIntensity(commits) }}
                    >
                      <div className="absolute inset-0 flex items-center justify-center text-white font-medium">
                        {commits > 0 ? commits : ''}
                      </div>
                      {isMostProductive && (
                        <div className="absolute -top-7 left-1/2 transform -translate-x-1/2 bg-gray-900/90 text-white text-xs py-1 px-2 rounded whitespace-nowrap">
                          Most productive
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        
        {/* Legend */}
        <div className="mt-3 flex justify-end items-center">
          <div className="text-xs text-gray-400 mr-2">Commits</div>
          <div className="flex">
            <div className="w-5 h-3 bg-purple-600/10 rounded-l"></div>
            <div className="w-5 h-3 bg-purple-600/30"></div>
            <div className="w-5 h-3 bg-purple-600/50"></div>
            <div className="w-5 h-3 bg-purple-600/70"></div>
            <div className="w-5 h-3 bg-purple-600/90 rounded-r"></div>
          </div>
        </div>
      </div>
      
      {/* Stats grid - unchanged */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
        <div className="bg-gray-700/50 p-3 rounded">
          <h4 className="text-xs uppercase text-gray-400 mb-1">Daily Average</h4>
          <p className="text-white font-bold text-lg">{codingStats.averageDaily}</p>
        </div>
        <div className="bg-gray-700/50 p-3 rounded">
          <h4 className="text-xs uppercase text-gray-400 mb-1">Best Day</h4>
          <p className="text-white font-bold text-lg">{codingStats.mostProductiveDay}</p>
        </div>
        <div className="bg-gray-700/50 p-3 rounded">
          <h4 className="text-xs uppercase text-gray-400 mb-1">Peak Hours</h4>
          <p className="text-white font-bold text-lg">{codingStats.mostProductiveTime}</p>
        </div>
      </div>
      
      {/* Languages section - unchanged */}
      <div className="mt-4">
        <h4 className="text-xs uppercase text-gray-400 mb-2">Top Languages</h4>
        <div className="flex flex-wrap gap-2">
          {codingStats.languages.map((lang, index) => (
            <span 
              key={index} 
              className="px-2 py-1 bg-secondary/20 text-secondary rounded text-xs"
            >
              {lang}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CodingStats;

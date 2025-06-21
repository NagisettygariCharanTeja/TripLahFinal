import React from 'react';
import BottomNavigation from '../components/Layout/BottomNavigation';

const BadgesScreen: React.FC = () => {
  const badges = [
    { id: 1, name: 'WOW', icon: '🎉', color: 'bg-red-500', earned: true },
    { id: 2, name: 'HILLTOP', icon: '⛰️', color: 'bg-gray-400', earned: true },
    { id: 3, name: 'MUSEUM', icon: '🏛️', color: 'bg-blue-500', earned: true },
    { id: 4, name: 'FOODIE', icon: '🍜', color: 'bg-orange-500', earned: false },
    { id: 5, name: 'EXPLORER', icon: '🧭', color: 'bg-green-500', earned: false },
    { id: 6, name: 'SOCIAL', icon: '👥', color: 'bg-purple-500', earned: false },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm p-4">
        <h1 className="text-2xl font-bold text-black">Badges</h1>
        <div className="mt-2">
          <button className="bg-blue-400 text-white px-4 py-2 rounded-full text-sm">
            All Badges
          </button>
        </div>
      </div>

      <div className="p-4">
        {/* Badge Grid */}
        <div className="grid grid-cols-2 gap-4">
          {badges.map((badge) => (
            <div
              key={badge.id}
              className={`bg-white rounded-lg p-6 text-center shadow-sm ${
                !badge.earned ? 'opacity-50' : ''
              }`}
            >
              <div
                className={`w-16 h-16 ${badge.color} rounded-full flex items-center justify-center mx-auto mb-3`}
              >
                <span className="text-2xl">{badge.icon}</span>
              </div>
              <h3 className="font-semibold text-black">{badge.name}</h3>
              {badge.earned && (
                <div className="mt-2">
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                    Earned
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default BadgesScreen;
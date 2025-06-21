import React from 'react';
import BottomNavigation from '../components/Layout/BottomNavigation';

const LeaderboardScreen: React.FC = () => {
  const leaderboardData = [
    { rank: 1, name: 'Dhika', points: 250, bgColor: 'bg-yellow-100', textColor: 'text-yellow-800' },
    { rank: 2, name: 'Dhika', points: 180, bgColor: 'bg-red-100', textColor: 'text-red-800' },
    { rank: 3, name: 'Dhika', points: 80, bgColor: 'bg-blue-100', textColor: 'text-blue-800' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm p-4">
        <h1 className="text-2xl font-bold text-black">Leaderboard</h1>
        <div className="mt-2">
          <button className="bg-blue-400 text-white px-4 py-2 rounded-full text-sm">
            All Explorers
          </button>
        </div>
      </div>

      <div className="p-4">
        {/* Leaderboard List */}
        <div className="space-y-3 mb-6">
          {leaderboardData.map((user) => (
            <div
              key={user.rank}
              className={`${user.bgColor} rounded-lg p-4 flex items-center justify-between`}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 ${user.bgColor} rounded-full flex items-center justify-center border-2 border-white`}>
                  <span className={`font-bold ${user.textColor}`}>#{user.rank}</span>
                </div>
                <span className={`font-semibold ${user.textColor}`}>{user.name}</span>
              </div>
              <span className={`font-bold ${user.textColor}`}>{user.points} points</span>
            </div>
          ))}
        </div>

        {/* User Status */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <p className="text-center text-gray-600">
            You are currently in rank <span className="font-semibold text-black">#56</span>
          </p>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default LeaderboardScreen;
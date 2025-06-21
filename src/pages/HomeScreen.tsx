import React, { useState } from 'react';
import { Settings, Info, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BottomNavigation from '../components/Layout/BottomNavigation';
import Button from '../components/UI/Button';
import Modal from '../components/UI/Modal';

const HomeScreen: React.FC = () => {
  const navigate = useNavigate();
  const [selectedLevel, setSelectedLevel] = useState<'Wanderer' | 'Explorer' | 'Trailblazer'>('Explorer');
  const [showMysteryQuest, setShowMysteryQuest] = useState(false);
  const [showLevelWarning, setShowLevelWarning] = useState(false);

  // Get user data from localStorage
  const userData = JSON.parse(localStorage.getItem('user') || '{"name": "Cliff Oliver", "points": 1200}');

  const levelDescriptions = {
    Wanderer: 'Easy tasks perfect for beginners who enjoy light exploration without physical strain.',
    Explorer: 'Medium difficulty with exciting challenges for active explorers who want a balanced mix of physical activity and cultural experiences.',
    Trailblazer: 'Hard tasks for adventure seekers and hardcore adventurers who want immersive and physically demanding experiences.'
  };

  const handleLevelChange = (level: 'Wanderer' | 'Explorer' | 'Trailblazer') => {
    if (level === 'Trailblazer') {
      setShowLevelWarning(true);
    }
    setSelectedLevel(level);
  };

  const handleSOSCall = () => {
    window.location.href = 'tel:999'; // Malaysia emergency number
  };

  const handleMysteryQuest = () => {
    setShowMysteryQuest(true);
  };

  const handleViewActivities = () => {
    navigate('/activities');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-400 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">{userData.name.split(' ').map((n: string) => n[0]).join('')}</span>
            </div>
            <div>
              <h2 className="font-semibold text-black">{userData.name}</h2>
              <p className="text-sm text-gray-600">Explorer Level</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleSOSCall}
              className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-colors"
              title="Emergency SOS"
            >
              <Phone size={20} />
            </button>
            <button className="text-gray-600 hover:text-gray-800">
              <Settings size={24} />
            </button>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Points Dashboard */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="text-center mb-4">
            <h3 className="text-4xl font-bold text-black">{userData.points}</h3>
            <p className="text-gray-600">Total Points</p>
          </div>
          
          <div className="flex justify-around mb-4">
            <div className="text-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-1">
                <span className="text-yellow-600">🏆</span>
              </div>
              <p className="text-xs text-gray-600">Leaderboard</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-1">
                <span className="text-blue-600">🏅</span>
              </div>
              <p className="text-xs text-gray-600">Badges (5)</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-1">
                <span className="text-green-600">⭐</span>
              </div>
              <p className="text-xs text-gray-600">Achievements</p>
            </div>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-blue-400 h-2 rounded-full" style={{ width: '75%' }}></div>
          </div>
          <p className="text-center text-sm text-gray-600 mt-2">Points Level - 75%</p>
        </div>

        {/* Challenge Selection */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-black mb-4">Choose Your Challenge Level</h3>
          
          <div className="flex space-x-2 mb-4">
            {(['Wanderer', 'Explorer', 'Trailblazer'] as const).map((level) => (
              <button
                key={level}
                onClick={() => handleLevelChange(level)}
                className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-colors ${
                  selectedLevel === level
                    ? 'bg-blue-400 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {level}
              </button>
            ))}
          </div>

          <div className="text-sm text-gray-600 mb-4">
            <p><strong>Current:</strong> {selectedLevel} Level</p>
            <p className="mt-1">
              {levelDescriptions[selectedLevel]}
            </p>
          </div>

          <Button
            onClick={handleViewActivities}
            variant="secondary"
            className="w-full"
          >
            View All Activities
          </Button>
        </div>

        {/* Mystery Quest */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-black">Mystery Quest</h3>
            <Info size={20} className="text-gray-400" />
          </div>
          
          <Button
            onClick={handleMysteryQuest}
            className="w-full py-3 text-lg"
          >
            I'm Feeling Lucky Today!
          </Button>
        </div>
      </div>

      {/* Level Warning Modal */}
      <Modal
        isOpen={showLevelWarning}
        onClose={() => setShowLevelWarning(false)}
        title={`${selectedLevel} Level Notice`}
      >
        <div className="text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <p className="text-gray-600 mb-4">
            <strong>Warning:</strong> Trailblazer level activities involve significant physical challenges and demanding experiences. These activities may include:
          </p>
          <ul className="text-left text-sm text-gray-600 mb-4 space-y-1">
            <li>• Strenuous hiking and climbing</li>
            <li>• Early morning starts (4-6 AM)</li>
            <li>• Extended outdoor activities</li>
            <li>• High-intensity physical challenges</li>
          </ul>
          <p className="text-gray-600 mb-4">
            Please ensure you're physically prepared and have appropriate gear before participating.
          </p>
          <Button onClick={() => setShowLevelWarning(false)}>
            I Understand
          </Button>
        </div>
      </Modal>

      {/* Mystery Quest Modal */}
      <Modal
        isOpen={showMysteryQuest}
        onClose={() => setShowMysteryQuest(false)}
        title="Mystery Challenge"
      >
        <div className="text-center">
          <div className="mb-4">
            <h4 className="text-lg font-semibold text-black mb-2">Today's Challenge</h4>
            <p className="text-gray-600 mb-4">
              Go to the nearest mamak and eat Nasi Lemak
            </p>
            <div className="bg-blue-100 rounded-lg p-3 mb-4">
              <span className="text-blue-600 font-semibold">+5 points</span>
            </div>
          </div>
          
          <div className="flex space-x-3">
            <Button
              variant="secondary"
              onClick={() => setShowMysteryQuest(false)}
              className="flex-1"
            >
              Decline
            </Button>
            <Button
              onClick={() => setShowMysteryQuest(false)}
              className="flex-1"
            >
              Accept
            </Button>
          </div>
          
          <div className="flex justify-center space-x-2 mt-4">
            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
          </div>
        </div>
      </Modal>

      <BottomNavigation />
    </div>
  );
};

export default HomeScreen;
import React, { useState } from 'react';
import BottomNavigation from '../components/Layout/BottomNavigation';
import Button from '../components/UI/Button';
import Card from '../components/UI/Card';
import Modal from '../components/UI/Modal';

const RewardsScreen: React.FC = () => {
  const [showRedemption, setShowRedemption] = useState(false);
  const [redemptionCode, setRedemptionCode] = useState('');

  const userPoints = 180;

  const rewards = [
    {
      id: 1,
      title: 'Free Coffee at Local Cafe',
      description: 'Enjoy a complimentary coffee at participating cafes',
      points: 50,
      image: '☕',
    },
    {
      id: 2,
      title: 'Free Burger at a Restaurant',
      description: 'Get a free burger at selected restaurants',
      points: 120,
      image: '🍔',
    },
    {
      id: 3,
      title: 'Museum Entry Ticket',
      description: 'Free entry to National Museum',
      points: 200,
      image: '🏛️',
    },
    {
      id: 4,
      title: 'Local Transport Day Pass',
      description: '24-hour unlimited public transport',
      points: 300,
      image: '🚇',
    },
  ];

  const handleRedeem = (reward: typeof rewards[0]) => {
    if (userPoints >= reward.points) {
      // Generate random redemption code
      const code = 'TRIP' + Math.random().toString(36).substr(2, 8).toUpperCase();
      setRedemptionCode(code);
      setShowRedemption(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm p-4">
        <h1 className="text-2xl font-bold text-black">Rewards Store</h1>
        <p className="text-gray-600 mt-1">Redeem your points for amazing deals</p>
      </div>

      <div className="p-4">
        {/* Points Display */}
        <div className="bg-gradient-to-r from-blue-400 to-blue-500 rounded-lg p-6 text-white mb-6">
          <h2 className="text-2xl font-bold">Your Points: {userPoints}</h2>
          <p className="text-blue-100 mt-1">Keep exploring to earn more</p>
        </div>

        {/* Rewards Grid */}
        <div className="space-y-4">
          {rewards.map((reward) => (
            <Card key={reward.id} className="p-4">
              <div className="flex items-center space-x-4">
                <div className="text-4xl">{reward.image}</div>
                <div className="flex-1">
                  <h3 className="font-semibold text-black">{reward.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{reward.description}</p>
                  <p className="text-sm font-medium text-blue-600 mt-2">
                    {reward.points} points
                  </p>
                </div>
                <Button
                  onClick={() => handleRedeem(reward)}
                  disabled={userPoints < reward.points}
                  size="sm"
                  className={userPoints < reward.points ? 'opacity-50' : ''}
                >
                  Redeem
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Redemption Modal */}
      <Modal
        isOpen={showRedemption}
        onClose={() => setShowRedemption(false)}
        title="Redemption Successful!"
      >
        <div className="text-center">
          <div className="text-6xl mb-4">🎉</div>
          <p className="text-gray-600 mb-4">
            Your redemption code is:
          </p>
          <div className="bg-gray-100 rounded-lg p-4 mb-4">
            <code className="text-lg font-mono font-bold text-black">
              {redemptionCode}
            </code>
          </div>
          <p className="text-sm text-gray-500 mb-4">
            Show this code to the merchant to claim your reward
          </p>
          <Button onClick={() => setShowRedemption(false)}>
            Got it!
          </Button>
        </div>
      </Modal>

      <BottomNavigation />
    </div>
  );
};

export default RewardsScreen;
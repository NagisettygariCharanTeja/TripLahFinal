import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/UI/Card';

const SelectionScreen: React.FC = () => {
  const navigate = useNavigate();

  const destinations = [
    {
      id: 'kl',
      name: 'Kuala Lumpur',
      description: 'City skyline adventure',
      silhouette: '🏙️',
    },
    {
      id: 'malacca',
      name: 'Malacca',
      description: 'Historical heritage tour',
      silhouette: '🏛️',
    },
    {
      id: 'penang',
      name: 'Penang',
      description: 'Temple and culture exploration',
      silhouette: '🏯',
    },
  ];

  const handleDestinationSelect = (destinationId: string) => {
    // Store selected destination in localStorage
    localStorage.setItem('selectedDestination', destinationId);
    navigate('/home');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">TripLah!</h1>
          <p className="text-lg text-gray-600">Choose Your Twist</p>
        </div>

        {/* Destination Cards */}
        <div className="space-y-4">
          {destinations.map((destination) => (
            <Card
              key={destination.id}
              onClick={() => handleDestinationSelect(destination.id)}
              className="p-6 hover:bg-teal-50 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className="text-4xl">{destination.silhouette}</div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-800">
                    {destination.name}
                  </h3>
                  <p className="text-gray-600">{destination.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SelectionScreen;
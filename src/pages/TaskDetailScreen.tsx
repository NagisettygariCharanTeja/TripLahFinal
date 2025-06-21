import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Camera } from 'lucide-react';
import BottomNavigation from '../components/Layout/BottomNavigation';
import Button from '../components/UI/Button';

const TaskDetailScreen: React.FC = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const [showCamera, setShowCamera] = useState(false);

  // Mock task data - in real app, fetch based on taskId
  const task = {
    id: taskId,
    title: 'Snap a picture from Petronas Towers!!',
    location: 'KLCC, Kuala Lumpur',
    timeSlot: '12:00 - 16:00',
    points: 15,
    description: 'Take a selfie or photo from the observation deck of Petronas Twin Towers. Make sure the city skyline is visible in the background.',
    image: 'https://images.pexels.com/photos/1470502/pexels-photo-1470502.jpeg?auto=compress&cs=tinysrgb&w=800',
  };

  const handleTakePhoto = () => {
    setShowCamera(true);
    // In a real app, this would open the device camera
    // For demo purposes, we'll simulate photo capture
    setTimeout(() => {
      setShowCamera(false);
      alert('Photo captured! Task completed successfully. +15 points earned!');
      navigate('/tasks');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm p-4 flex items-center space-x-3">
        <button
          onClick={() => navigate('/tasks')}
          className="text-gray-600 hover:text-gray-800"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-lg font-semibold text-black">Task Details</h1>
      </div>

      <div className="p-4">
        {/* Task Image */}
        <div className="mb-6">
          <img
            src={task.image}
            alt={task.title}
            className="w-full h-48 object-cover rounded-lg shadow-sm"
          />
        </div>

        {/* Task Info */}
        <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
          <h2 className="text-xl font-bold text-black mb-2">{task.title}</h2>
          <p className="text-gray-600 mb-4">{task.description}</p>
          
          <div className="space-y-2 mb-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Location:</span>
              <span className="text-sm font-medium text-black">{task.location}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Time:</span>
              <span className="text-sm font-medium text-black">{task.timeSlot}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Reward:</span>
              <span className="text-sm font-medium text-blue-600">+{task.points} points</span>
            </div>
          </div>
        </div>

        {/* Camera Section */}
        {showCamera ? (
          <div className="bg-black rounded-lg p-8 text-center mb-6">
            <div className="text-white mb-4">
              <Camera size={48} className="mx-auto mb-2" />
              <p>Camera is opening...</p>
              <p className="text-sm text-gray-300 mt-2">Taking photo...</p>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg p-6 shadow-sm mb-6 text-center">
            <Camera size={48} className="mx-auto mb-4 text-gray-400" />
            <p className="text-gray-600 mb-4">Ready to take your photo?</p>
            <Button onClick={handleTakePhoto} className="w-full">
              <Camera size={20} className="mr-2" />
              Take Photo
            </Button>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <Button
            variant="secondary"
            onClick={() => navigate('/tasks')}
            className="flex-1"
          >
            Back
          </Button>
          <Button
            onClick={handleTakePhoto}
            className="flex-1"
            disabled={showCamera}
          >
            Submit
          </Button>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default TaskDetailScreen;
import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BottomNavigation from '../components/Layout/BottomNavigation';
import Button from '../components/UI/Button';
import Card from '../components/UI/Card';
import Modal from '../components/UI/Modal';

interface Activity {
  id: string;
  title: string;
  category: 'Nature' | 'Sports' | 'Culture' | 'Modern' | 'Food';
  points: number;
  image: string;
  description: string;
  startTime: string;
  endTime: string;
  hasGroupChat?: boolean;
  groupChatName?: string;
}

const ActivitiesScreen: React.FC = () => {
  const navigate = useNavigate();
  const [selectedLevel, setSelectedLevel] = useState<'Wanderer' | 'Explorer' | 'Trailblazer'>('Wanderer');
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);

  const activities = {
    Wanderer: {
      Nature: [
        { 
          id: 'w1', 
          title: 'Leisure walk at Perdana Botanical Garden', 
          category: 'Nature' as const, 
          points: 10, 
          image: 'https://images.pexels.com/photos/1166209/pexels-photo-1166209.jpeg?auto=compress&cs=tinysrgb&w=400', 
          description: 'Peaceful stroll through beautiful gardens',
          startTime: '09:00',
          endTime: '11:00',
          hasGroupChat: true,
          groupChatName: 'Botanical Garden Walk Group'
        },
        { 
          id: 'w2', 
          title: 'Butterfly Park visit in KL', 
          category: 'Nature' as const, 
          points: 15, 
          image: 'https://images.pexels.com/photos/326055/pexels-photo-326055.jpeg?auto=compress&cs=tinysrgb&w=400', 
          description: 'Discover colorful butterflies in tropical setting',
          startTime: '10:00',
          endTime: '12:00'
        }
      ],
      Sports: [
        { 
          id: 'w3', 
          title: 'Bowling at Mid Valley or Sunway Pyramid', 
          category: 'Sports' as const, 
          points: 12, 
          image: 'https://images.pexels.com/photos/4192/sport-ball-game-fun.jpg?auto=compress&cs=tinysrgb&w=400', 
          description: 'Fun bowling session with friends',
          startTime: '14:00',
          endTime: '16:00'
        },
        { 
          id: 'w4', 
          title: 'Mini golf at Berjaya Times Square', 
          category: 'Sports' as const, 
          points: 10, 
          image: 'https://images.pexels.com/photos/54123/pexels-photo-54123.jpeg?auto=compress&cs=tinysrgb&w=400', 
          description: 'Indoor mini golf adventure',
          startTime: '15:00',
          endTime: '17:00'
        }
      ],
      Culture: [
        { 
          id: 'w5', 
          title: 'Visit the Islamic Arts Museum', 
          category: 'Culture' as const, 
          points: 20, 
          image: 'https://images.pexels.com/photos/208701/pexels-photo-208701.jpeg?auto=compress&cs=tinysrgb&w=400', 
          description: 'Explore Islamic art and heritage',
          startTime: '10:00',
          endTime: '13:00'
        },
        { 
          id: 'w6', 
          title: 'KL City Gallery tour', 
          category: 'Culture' as const, 
          points: 15, 
          image: 'https://images.pexels.com/photos/1470502/pexels-photo-1470502.jpeg?auto=compress&cs=tinysrgb&w=400', 
          description: 'Learn about KL\'s history and development',
          startTime: '11:00',
          endTime: '13:00'
        },
        { 
          id: 'w7', 
          title: 'Browse at Central Market (souvenir hunt)', 
          category: 'Culture' as const, 
          points: 12, 
          image: 'https://images.pexels.com/photos/1005638/pexels-photo-1005638.jpeg?auto=compress&cs=tinysrgb&w=400', 
          description: 'Hunt for unique Malaysian souvenirs',
          startTime: '09:00',
          endTime: '12:00'
        }
      ],
      Modern: [
        { 
          id: 'w8', 
          title: 'Selfie hunt and mural stroll at Pasar Seni', 
          category: 'Modern' as const, 
          points: 15, 
          image: 'https://images.pexels.com/photos/1109541/pexels-photo-1109541.jpeg?auto=compress&cs=tinysrgb&w=400', 
          description: 'Capture Instagram-worthy street art',
          startTime: '14:00',
          endTime: '17:00'
        },
        { 
          id: 'w9', 
          title: 'Ride the KL Hop-On-Hop-Off bus', 
          category: 'Modern' as const, 
          points: 18, 
          image: 'https://images.pexels.com/photos/136739/pexels-photo-136739.jpeg?auto=compress&cs=tinysrgb&w=400', 
          description: 'Convenient city tour with multiple stops',
          startTime: '09:00',
          endTime: '18:00'
        }
      ],
      Food: [
        { 
          id: 'w10', 
          title: 'Try local breakfast at Village Park (nasi lemak legend!)', 
          category: 'Food' as const, 
          points: 25, 
          image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400', 
          description: 'Taste the famous nasi lemak',
          startTime: '07:00',
          endTime: '10:00'
        },
        { 
          id: 'w11', 
          title: 'Street food sampling in Jalan Alor', 
          category: 'Food' as const, 
          points: 20, 
          image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=400', 
          description: 'Experience diverse street food culture',
          startTime: '19:00',
          endTime: '22:00'
        }
      ]
    },
    Explorer: {
      Nature: [
        { 
          id: 'e1', 
          title: 'Morning hike at Bukit Gasing', 
          category: 'Nature' as const, 
          points: 30, 
          image: 'https://images.pexels.com/photos/618833/pexels-photo-618833.jpeg?auto=compress&cs=tinysrgb&w=400', 
          description: 'Moderate hike with city views',
          startTime: '06:00',
          endTime: '09:00',
          hasGroupChat: true,
          groupChatName: 'Bukit Gasing Hiking Group'
        },
        { 
          id: 'e2', 
          title: 'Eco Park canopy walk (KL Tower)', 
          category: 'Nature' as const, 
          points: 35, 
          image: 'https://images.pexels.com/photos/1166209/pexels-photo-1166209.jpeg?auto=compress&cs=tinysrgb&w=400', 
          description: 'Walk among treetops in the city center',
          startTime: '10:00',
          endTime: '12:00'
        }
      ],
      Sports: [
        { 
          id: 'e3', 
          title: 'Ice skating at Sunway Pyramid', 
          category: 'Sports' as const, 
          points: 25, 
          image: 'https://images.pexels.com/photos/71104/pexels-photo-71104.jpeg?auto=compress&cs=tinysrgb&w=400', 
          description: 'Cool down with ice skating fun',
          startTime: '14:00',
          endTime: '16:00'
        },
        { 
          id: 'e4', 
          title: 'Archery at Stars Archery in Mid Valley', 
          category: 'Sports' as const, 
          points: 30, 
          image: 'https://images.pexels.com/photos/551993/pexels-photo-551993.jpeg?auto=compress&cs=tinysrgb&w=400', 
          description: 'Test your aim and focus',
          startTime: '15:00',
          endTime: '17:00'
        }
      ],
      Culture: [
        { 
          id: 'e5', 
          title: 'Join a batik or wau (kite) workshop', 
          category: 'Culture' as const, 
          points: 40, 
          image: 'https://images.pexels.com/photos/1109541/pexels-photo-1109541.jpeg?auto=compress&cs=tinysrgb&w=400', 
          description: 'Learn traditional Malaysian crafts',
          startTime: '10:00',
          endTime: '15:00'
        },
        { 
          id: 'e6', 
          title: 'Visit National Museum + storytelling session', 
          category: 'Culture' as const, 
          points: 35, 
          image: 'https://images.pexels.com/photos/208701/pexels-photo-208701.jpeg?auto=compress&cs=tinysrgb&w=400', 
          description: 'Immerse in Malaysian history',
          startTime: '09:00',
          endTime: '13:00'
        },
        { 
          id: 'e7', 
          title: 'Cooking class for Malaysian cuisine', 
          category: 'Culture' as const, 
          points: 45, 
          image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400', 
          description: 'Master local cooking techniques',
          startTime: '11:00',
          endTime: '15:00'
        }
      ],
      Modern: [
        { 
          id: 'e8', 
          title: 'Urban trail: Explore KL via LRT with in-app clues', 
          category: 'Modern' as const, 
          points: 40, 
          image: 'https://images.pexels.com/photos/136739/pexels-photo-136739.jpeg?auto=compress&cs=tinysrgb&w=400', 
          description: 'Navigate the city using public transport',
          startTime: '09:00',
          endTime: '17:00'
        },
        { 
          id: 'e9', 
          title: 'Photography walk through Brickfields + Chinatown', 
          category: 'Modern' as const, 
          points: 35, 
          image: 'https://images.pexels.com/photos/1470502/pexels-photo-1470502.jpeg?auto=compress&cs=tinysrgb&w=400', 
          description: 'Capture diverse cultural neighborhoods',
          startTime: '14:00',
          endTime: '18:00'
        }
      ],
      Food: [
        { 
          id: 'e10', 
          title: 'Curry laksa hunt in Pudu', 
          category: 'Food' as const, 
          points: 30, 
          image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=400', 
          description: 'Find the best curry laksa in town',
          startTime: '12:00',
          endTime: '15:00'
        },
        { 
          id: 'e11', 
          title: 'Traditional kuih tasting challenge', 
          category: 'Food' as const, 
          points: 35, 
          image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400', 
          description: 'Sample various traditional sweets',
          startTime: '15:00',
          endTime: '17:00'
        }
      ]
    },
    Trailblazer: {
      Nature: [
        { 
          id: 't1', 
          title: 'Sunrise hike at Bukit Tabur or Broga Hill', 
          category: 'Nature' as const, 
          points: 60, 
          image: 'https://images.pexels.com/photos/618833/pexels-photo-618833.jpeg?auto=compress&cs=tinysrgb&w=400', 
          description: 'Challenging pre-dawn hike for stunning sunrise',
          startTime: '04:00',
          endTime: '08:00',
          hasGroupChat: true,
          groupChatName: 'Sunrise Hikers Group'
        },
        { 
          id: 't2', 
          title: 'Jungle trekking at FRIM (Forest Research Institute Malaysia)', 
          category: 'Nature' as const, 
          points: 55, 
          image: 'https://images.pexels.com/photos/1166209/pexels-photo-1166209.jpeg?auto=compress&cs=tinysrgb&w=400', 
          description: 'Deep jungle exploration and research',
          startTime: '07:00',
          endTime: '15:00'
        },
        { 
          id: 't3', 
          title: 'Taman Tugu trail + cleanup challenge', 
          category: 'Nature' as const, 
          points: 50, 
          image: 'https://images.pexels.com/photos/618833/pexels-photo-618833.jpeg?auto=compress&cs=tinysrgb&w=400', 
          description: 'Combine hiking with environmental action',
          startTime: '08:00',
          endTime: '12:00'
        }
      ],
      Sports: [
        { 
          id: 't4', 
          title: 'Skytrex Extreme Park (high ropes at Shah Alam Botanical Garden)', 
          category: 'Sports' as const, 
          points: 70, 
          image: 'https://images.pexels.com/photos/551993/pexels-photo-551993.jpeg?auto=compress&cs=tinysrgb&w=400', 
          description: 'Extreme treetop obstacle course',
          startTime: '09:00',
          endTime: '13:00'
        },
        { 
          id: 't5', 
          title: 'Indoor rock climbing at Camp5', 
          category: 'Sports' as const, 
          points: 60, 
          image: 'https://images.pexels.com/photos/551993/pexels-photo-551993.jpeg?auto=compress&cs=tinysrgb&w=400', 
          description: 'Scale challenging climbing walls',
          startTime: '14:00',
          endTime: '17:00'
        },
        { 
          id: 't6', 
          title: 'ATV jungle ride at Kemensah', 
          category: 'Sports' as const, 
          points: 65, 
          image: 'https://images.pexels.com/photos/136739/pexels-photo-136739.jpeg?auto=compress&cs=tinysrgb&w=400', 
          description: 'Off-road adventure through jungle terrain',
          startTime: '10:00',
          endTime: '14:00'
        }
      ],
      Culture: [
        { 
          id: 't7', 
          title: '3-House Challenge: Visit a mosque, church & temple in one day', 
          category: 'Culture' as const, 
          points: 80, 
          image: 'https://images.pexels.com/photos/208701/pexels-photo-208701.jpeg?auto=compress&cs=tinysrgb&w=400', 
          description: 'Experience Malaysia\'s religious diversity',
          startTime: '09:00',
          endTime: '18:00'
        },
        { 
          id: 't8', 
          title: 'Full-day heritage mission: Klang + Kuala Selangor', 
          category: 'Culture' as const, 
          points: 75, 
          image: 'https://images.pexels.com/photos/1470502/pexels-photo-1470502.jpeg?auto=compress&cs=tinysrgb&w=400', 
          description: 'Explore historical towns and landmarks',
          startTime: '08:00',
          endTime: '19:00'
        }
      ],
      Modern: [
        { 
          id: 't9', 
          title: 'KL scavenger hunt with location clues and time limit', 
          category: 'Modern' as const, 
          points: 70, 
          image: 'https://images.pexels.com/photos/1470502/pexels-photo-1470502.jpeg?auto=compress&cs=tinysrgb&w=400', 
          description: 'Race against time to solve city mysteries',
          startTime: '10:00',
          endTime: '16:00'
        },
        { 
          id: 't10', 
          title: 'KL Tower stair climb (if available during special events)', 
          category: 'Modern' as const, 
          points: 85, 
          image: 'https://images.pexels.com/photos/1470502/pexels-photo-1470502.jpeg?auto=compress&cs=tinysrgb&w=400', 
          description: 'Ultimate fitness challenge to the top',
          startTime: '06:00',
          endTime: '09:00'
        }
      ],
      Food: [
        { 
          id: 't11', 
          title: 'Spicy food gauntlet: Try sambal dishes from 3 different stalls', 
          category: 'Food' as const, 
          points: 60, 
          image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=400', 
          description: 'Test your spice tolerance limits',
          startTime: '18:00',
          endTime: '21:00'
        },
        { 
          id: 't12', 
          title: 'Local night market mystery menu (eat something unknown)', 
          category: 'Food' as const, 
          points: 55, 
          image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=400', 
          description: 'Adventurous culinary mystery challenge',
          startTime: '19:00',
          endTime: '22:00'
        }
      ]
    }
  };

  const categoryColors = {
    Nature: 'bg-green-100 text-green-800',
    Sports: 'bg-blue-100 text-blue-800',
    Culture: 'bg-purple-100 text-purple-800',
    Modern: 'bg-orange-100 text-orange-800',
    Food: 'bg-red-100 text-red-800'
  };

  const levelDescriptions = {
    Wanderer: 'For laid-back travelers who enjoy light exploration without physical strain.',
    Explorer: 'For active explorers who want a balanced mix of physical activity and cultural experiences.',
    Trailblazer: 'For thrill-seekers and hardcore adventurers who want immersive and physically demanding experiences.'
  };

  const handleRegister = (activity: Activity) => {
    if (activity.hasGroupChat) {
      setSelectedActivity(activity);
      setShowJoinModal(true);
    } else {
      // For non-group activities, just add to tasks
      const existingTasks = JSON.parse(localStorage.getItem('registeredTasks') || '[]');
      const newTask = {
        id: activity.id,
        title: activity.title,
        location: 'KL',
        points: activity.points,
        difficulty: selectedLevel,
        image: activity.image,
        startTime: activity.startTime,
        endTime: activity.endTime
      };
      
      if (!existingTasks.find((task: any) => task.id === newTask.id)) {
        existingTasks.push(newTask);
        localStorage.setItem('registeredTasks', JSON.stringify(existingTasks));
      }
      
      alert('Successfully registered for activity!');
    }
  };

  const handleJoinGroup = () => {
    if (selectedActivity && selectedActivity.hasGroupChat) {
      // Add to tasks list
      const existingTasks = JSON.parse(localStorage.getItem('registeredTasks') || '[]');
      const newTask = {
        id: selectedActivity.id,
        title: selectedActivity.title,
        location: selectedActivity.groupChatName?.replace(' Group', '') || 'KL',
        points: selectedActivity.points,
        difficulty: selectedLevel,
        image: selectedActivity.image,
        startTime: selectedActivity.startTime,
        endTime: selectedActivity.endTime
      };
      
      if (!existingTasks.find((task: any) => task.id === newTask.id)) {
        existingTasks.push(newTask);
        localStorage.setItem('registeredTasks', JSON.stringify(existingTasks));
      }

      // Add to group chats list
      const existingGroups = JSON.parse(localStorage.getItem('groupChats') || '[]');
      const newGroup = {
        id: `group-${selectedActivity.id}`,
        name: selectedActivity.groupChatName,
        participants: 4,
        isActive: true,
        lastMessage: 'Welcome to the group!',
        type: 'event'
      };
      
      if (!existingGroups.find((group: any) => group.id === newGroup.id)) {
        existingGroups.push(newGroup);
        localStorage.setItem('groupChats', JSON.stringify(existingGroups));
      }

      // Navigate to group chat
      navigate(`/chat/group-${selectedActivity.id}`, { 
        state: { 
          groupName: selectedActivity.groupChatName,
          activityTitle: selectedActivity.title 
        } 
      });
    }
    setShowJoinModal(false);
    setSelectedActivity(null);
  };

  const renderActivitiesByCategory = (categoryName: keyof typeof activities.Wanderer) => {
    const categoryActivities = activities[selectedLevel][categoryName];
    if (!categoryActivities || categoryActivities.length === 0) return null;

    return (
      <div key={categoryName} className="mb-8">
        <div className="flex items-center mb-4">
          <h3 className="text-xl font-bold text-black mr-3">{categoryName}</h3>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${categoryColors[categoryName]}`}>
            {categoryActivities.length} activities
          </span>
        </div>
        
        <div className="space-y-3">
          {categoryActivities.map((activity) => (
            <Card key={activity.id} className="p-4 hover:shadow-lg transition-shadow">
              <div className="flex items-start space-x-4">
                <img 
                  src={activity.image} 
                  alt={activity.title}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h4 className="font-semibold text-black mb-1">{activity.title}</h4>
                  <p className="text-sm text-gray-600 mb-2">{activity.description}</p>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${categoryColors[activity.category]}`}>
                      {activity.category}
                    </span>
                    <span className="text-sm font-medium text-blue-600">
                      +{activity.points} points
                    </span>
                  </div>
                  <div className="text-xs text-gray-500">
                    Time: {activity.startTime} - {activity.endTime}
                  </div>
                </div>
                <Button 
                  size="sm" 
                  onClick={() => handleRegister(activity)}
                  className={activity.hasGroupChat ? 'bg-green-500 hover:bg-green-600' : ''}
                >
                  Register
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm p-4">
        <div className="flex items-center space-x-3 mb-4">
          <button
            onClick={() => navigate('/home')}
            className="text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-2xl font-bold text-black">Activities</h1>
        </div>

        {/* Level Selection */}
        <div className="flex space-x-2 mb-3">
          {(['Wanderer', 'Explorer', 'Trailblazer'] as const).map((level) => (
            <button
              key={level}
              onClick={() => setSelectedLevel(level)}
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

        {/* Level Description */}
        <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
          <strong>{selectedLevel}:</strong> {levelDescriptions[selectedLevel]}
        </p>
      </div>

      <div className="p-4">
        {/* Activities by Category */}
        {Object.keys(activities[selectedLevel]).map((category) => 
          renderActivitiesByCategory(category as keyof typeof activities.Wanderer)
        )}
      </div>

      {/* Join Group Modal */}
      <Modal
        isOpen={showJoinModal}
        onClose={() => setShowJoinModal(false)}
        title="Join Activity Group"
      >
        <div className="text-center">
          <img 
            src={selectedActivity?.image} 
            alt={selectedActivity?.title}
            className="w-20 h-20 object-cover rounded-lg mx-auto mb-4"
          />
          <h3 className="text-lg font-semibold text-black mb-2">
            {selectedActivity?.title}
          </h3>
          <p className="text-gray-600 mb-4">
            Would you like to join the group chat for this activity?
          </p>
          <div className="bg-blue-50 rounded-lg p-3 mb-4">
            <p className="text-sm text-blue-800">
              <strong>Time:</strong> {selectedActivity?.startTime} - {selectedActivity?.endTime}
            </p>
            <p className="text-sm text-blue-800">
              <strong>Points:</strong> +{selectedActivity?.points}
            </p>
          </div>
          
          <div className="flex space-x-3">
            <Button
              variant="secondary"
              onClick={() => setShowJoinModal(false)}
              className="flex-1"
            >
              No, Thanks
            </Button>
            <Button
              onClick={handleJoinGroup}
              className="flex-1"
            >
              Yes, Join Group
            </Button>
          </div>
        </div>
      </Modal>

      <BottomNavigation />
    </div>
  );
};

export default ActivitiesScreen;
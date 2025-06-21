import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNavigation from '../components/Layout/BottomNavigation';
import Card from '../components/UI/Card';

interface ChatGroup {
  id: string;
  name: string;
  participants: number;
  isActive: boolean;
  lastMessage: string;
  type: 'event' | 'city' | 'general';
}

const ChatsScreen: React.FC = () => {
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'event' | 'city'>('all');
  const [chatGroups, setChatGroups] = useState<ChatGroup[]>([]);

  const defaultGroups: ChatGroup[] = [
    {
      id: '1',
      name: 'Batu Caves Temple Tour',
      participants: 4,
      isActive: true,
      lastMessage: 'See you at 2 PM!',
      type: 'event',
    },
    {
      id: '2',
      name: 'KL Towers',
      participants: 2,
      isActive: false,
      lastMessage: 'Great view from up there',
      type: 'city',
    },
    {
      id: '3',
      name: 'Genting Hiking',
      participants: 5,
      isActive: false,
      lastMessage: 'Bring water bottles',
      type: 'event',
    },
  ];

  useEffect(() => {
    // Load group chats from localStorage and merge with defaults
    const storedGroups = JSON.parse(localStorage.getItem('groupChats') || '[]');
    const allGroups = [...defaultGroups, ...storedGroups];
    
    // Remove duplicates based on id
    const uniqueGroups = allGroups.filter((group, index, self) => 
      index === self.findIndex(g => g.id === group.id)
    );
    
    setChatGroups(uniqueGroups);
  }, []);

  const filterTabs = [
    { key: 'all' as const, label: 'All Chats' },
    { key: 'event' as const, label: 'Event' },
    { key: 'city' as const, label: 'City' }
  ];

  const filteredGroups = chatGroups.filter(group => {
    if (selectedFilter === 'all') return true;
    return group.type === selectedFilter;
  });

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm p-4">
        <h1 className="text-2xl font-bold text-black mb-3">Travel Group</h1>
        
        {/* Filter Tabs */}
        <div className="flex space-x-2">
          {filterTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setSelectedFilter(tab.key)}
              className={`px-4 py-2 rounded-full text-sm ${
                selectedFilter === tab.key
                  ? 'bg-blue-400 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4">
        {/* Chat Groups */}
        <div className="space-y-3">
          {filteredGroups.map((group) => (
            <Card
              key={group.id}
              onClick={() => navigate(`/chat/${group.id}`)}
              className={`${group.isActive ? 'border-l-4 border-blue-400 bg-blue-50' : ''}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-semibold text-black">{group.name}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      group.type === 'event' ? 'bg-green-100 text-green-800' : 
                      group.type === 'city' ? 'bg-blue-100 text-blue-800' : 
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {group.type}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{group.lastMessage}</p>
                </div>
                <div className="text-right">
                  <span className="text-sm text-gray-500">
                    {group.participants} travelers
                  </span>
                  {group.isActive && (
                    <div className="w-3 h-3 bg-blue-400 rounded-full mt-1 ml-auto"></div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredGroups.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">
              No {selectedFilter === 'all' ? '' : selectedFilter} chats available.
            </p>
          </div>
        )}
      </div>

      <BottomNavigation />
    </div>
  );
};

export default ChatsScreen;
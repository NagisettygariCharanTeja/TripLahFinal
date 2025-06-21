import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Send } from 'lucide-react';
import BottomNavigation from '../components/Layout/BottomNavigation';

interface Message {
  id: number;
  user: string;
  message: string;
  time: string;
  isOwn: boolean;
}

const ChatDetailScreen: React.FC = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [groupName, setGroupName] = useState('');
  const [participantCount, setParticipantCount] = useState(4);

  useEffect(() => {
    // Set group name and messages based on the group
    if (location.state?.groupName && location.state?.activityTitle) {
      setGroupName(location.state.groupName);
      setMessages([
        { id: 1, user: 'Sarah', message: `Hey everyone! Excited for ${location.state.activityTitle}!`, time: '10:30 AM', isOwn: false },
        { id: 2, user: 'Mike', message: 'Same here! What time should we meet?', time: '10:32 AM', isOwn: false },
        { id: 3, user: 'Lisa', message: 'Looking forward to this adventure!', time: '10:35 AM', isOwn: false },
      ]);
    } else if (groupId === '1') {
      setGroupName('Batu Caves Temple Tour');
      setMessages([
        { id: 1, user: 'Sarah', message: 'Hey everyone! Excited for the temple tour!', time: '10:30 AM', isOwn: false },
        { id: 2, user: 'You', message: 'Same here! What time should we meet?', time: '10:32 AM', isOwn: true },
        { id: 3, user: 'Mike', message: 'How about 2 PM at the entrance?', time: '10:35 AM', isOwn: false },
        { id: 4, user: 'You', message: 'Perfect! See you there', time: '10:36 AM', isOwn: true },
      ]);
    } else if (groupId === '2') {
      setGroupName('KL Towers');
      setParticipantCount(2);
      setMessages([
        { id: 1, user: 'Alex', message: 'Ready for the tower visit?', time: '09:15 AM', isOwn: false },
        { id: 2, user: 'You', message: 'Absolutely! Great view from up there', time: '09:20 AM', isOwn: true },
      ]);
    } else if (groupId === '3') {
      setGroupName('Genting Hiking');
      setParticipantCount(5);
      setMessages([
        { id: 1, user: 'Tom', message: 'Don\'t forget to bring water bottles', time: '08:00 AM', isOwn: false },
        { id: 2, user: 'Jenny', message: 'And some snacks for the trail!', time: '08:05 AM', isOwn: false },
        { id: 3, user: 'You', message: 'Got it! See you at the starting point', time: '08:10 AM', isOwn: true },
      ]);
    } else {
      // Default for new group chats
      setGroupName('Activity Group');
      setMessages([
        { id: 1, user: 'Welcome Bot', message: 'Welcome to the group! Feel free to introduce yourselves and coordinate your activity.', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), isOwn: false },
      ]);
    }
  }, [groupId, location.state]);

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        user: 'You',
        message: message.trim(),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isOwn: true
      };
      
      setMessages(prev => [...prev, newMessage]);
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm p-4 flex items-center space-x-3">
        <button
          onClick={() => navigate('/chats')}
          className="text-gray-600 hover:text-gray-800"
        >
          <ArrowLeft size={24} />
        </button>
        <div>
          <h1 className="text-lg font-semibold text-black">{groupName}</h1>
          <p className="text-sm text-gray-600">{participantCount} travelers</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 space-y-4 min-h-[60vh]">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                msg.isOwn
                  ? 'bg-blue-400 text-white'
                  : 'bg-white text-black shadow-sm'
              }`}
            >
              {!msg.isOwn && (
                <p className="text-xs font-semibold mb-1 text-gray-600">{msg.user}</p>
              )}
              <p className="text-sm">{msg.message}</p>
              <p className={`text-xs mt-1 ${msg.isOwn ? 'text-blue-100' : 'text-gray-500'}`}>
                {msg.time}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="bg-white border-t p-4">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Start typing..."
            className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <button
            onClick={handleSendMessage}
            disabled={!message.trim()}
            className="bg-blue-400 text-white p-2 rounded-full hover:bg-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={20} />
          </button>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default ChatDetailScreen;
import React, { useState } from 'react';
import { Send } from 'lucide-react';
import BottomNavigation from '../components/Layout/BottomNavigation';
import Button from '../components/UI/Button';

interface Message {
  id: number;
  role: 'user' | 'assistant';
  content: string;
}

const AIChatScreen: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: 'assistant',
      content: 'Hello! I\'m Trippy, your AI travel companion for Malaysia! 🇲🇾 I\'m here to help you discover amazing places, share cultural insights, and make your Malaysian adventure unforgettable. What would you like to explore today?'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const getAIResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase().trim();
    
    // Handle greetings
    if (message === 'hi' || message === 'hello' || message === 'hey') {
      return `Hi there! 👋 Welcome to Malaysia - truly Asia! I'm excited to help you explore this incredible country. Malaysia is a melting pot of cultures with Malay, Chinese, Indian, and indigenous influences creating a unique tapestry of experiences.

Whether you're interested in:
🏢 Modern marvels like the Petronas Twin Towers
🏛️ Rich cultural heritage and temples  
🍜 Incredible street food adventures
🌿 Beautiful nature and hiking trails

I'm here to guide you every step of the way! What catches your interest most?`;
    }
    
    // Handle Petronas Towers information request
    if (message.includes('activity 1') || message.includes('petronas')) {
      return `🏢 **Petronas Twin Towers - Malaysia's Crown Jewel**

The iconic Petronas Twin Towers are not just buildings - they're a symbol of Malaysia's ambition and architectural brilliance!

**Key Facts:**
• Height: 451.9 meters (1,483 feet) - once the world's tallest buildings
• Floors: 88 levels each
• Completed: 1998
• Architect: César Pelli
• Design: Inspired by Islamic geometric patterns

**What to Experience:**
🌉 **Skybridge (Level 41-42):** Connect between the towers with breathtaking views
🔭 **Observation Deck (Level 86):** Panoramic views of Kuala Lumpur
🛍️ **Suria KLCC:** World-class shopping mall at the base
🌳 **KLCC Park:** Beautiful green space with fountains and walking paths

**Photography Tips:**
📸 Best shots from the park's fountain area during golden hour
📸 Night photography captures the stunning LED lighting
📸 Don't miss the reflection shots in the park's water features

**Cultural Significance:**
The towers represent Malaysia's Islamic heritage through their 8-pointed star floor plan, symbolizing unity, rationality, and stability.

Ready to capture some amazing memories at this architectural wonder? 🌟`;
    }
    
    // Default response for other queries
    return `That's a great question! I'd love to help you explore more about Malaysia. Here are some popular topics I can assist with:

🏢 **Iconic Landmarks:** Petronas Towers, KL Tower, Batu Caves
🍜 **Food Adventures:** Nasi Lemak, Char Kway Teow, Roti Canai
🏛️ **Cultural Sites:** Temples, mosques, heritage buildings
🌿 **Nature Experiences:** Hiking trails, parks, wildlife

What would you like to discover next?`;
  };

  const sendMessage = async (userMessage: string) => {
    if (!userMessage.trim()) return;

    const newUserMessage: Message = {
      id: Date.now(),
      role: 'user',
      content: userMessage
    };

    setMessages(prev => [...prev, newUserMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Simulate AI thinking time
      setTimeout(() => {
        const aiResponse: Message = {
          id: Date.now() + 1,
          role: 'assistant',
          content: getAIResponse(userMessage)
        };
        setMessages(prev => [...prev, aiResponse]);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      setIsLoading(false);
      console.error('Error sending message:', error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      sendMessage(input);
    }
  };

  const handleActivityClick = (activityText: string) => {
    sendMessage(activityText);
  };

  const suggestedActivities = [
    'Activity 1: Petronas Towers',
    'Activity 2: Batu Caves',
    'Activity 3: Central Market'
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm p-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-black">Trippy AI</h1>
        <Button size="sm" variant="secondary">
          Activities
        </Button>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 space-y-4 min-h-[60vh]">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                message.role === 'user'
                  ? 'bg-blue-400 text-white'
                  : 'bg-white text-black shadow-sm'
              }`}
            >
              <p className="text-sm whitespace-pre-line">{message.content}</p>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white text-black shadow-sm px-4 py-2 rounded-lg">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
          </div>
        )}

        {/* Suggested Activities */}
        {messages.length === 1 && (
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h3 className="font-semibold text-black mb-3">Quick Activities</h3>
            <div className="space-y-2">
              {suggestedActivities.map((activity, index) => (
                <button
                  key={index}
                  onClick={() => handleActivityClick(activity)}
                  className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-blue-50 hover:border-blue-200 border border-transparent transition-colors"
                >
                  <span className="text-sm text-gray-700 font-medium">{activity}</span>
                </button>
              ))}
            </div>
            
            <div className="mt-4 pt-3 border-t border-gray-100">
              <p className="text-xs text-gray-500 mb-2">Try saying:</p>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleActivityClick('hi')}
                  className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full hover:bg-blue-200 transition-colors"
                >
                  Hi
                </button>
                <button
                  onClick={() => handleActivityClick('Tell me about Malaysian food')}
                  className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full hover:bg-green-200 transition-colors"
                >
                  Malaysian food
                </button>
                <button
                  onClick={() => handleActivityClick('Best places to visit')}
                  className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full hover:bg-purple-200 transition-colors"
                >
                  Best places
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Message Input */}
      <div className="bg-white border-t p-4">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me about Malaysia..."
            className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
            disabled={isLoading}
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={isLoading || !input.trim()}
            className="bg-blue-400 text-white p-2 rounded-full hover:bg-blue-500 transition-colors disabled:opacity-50"
          >
            <Send size={20} />
          </button>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default AIChatScreen;
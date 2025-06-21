import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SplashScreen from './pages/SplashScreen';
import LoginScreen from './pages/LoginScreen';
import SelectionScreen from './pages/SelectionScreen';
import HomeScreen from './pages/HomeScreen';
import ActivitiesScreen from './pages/ActivitiesScreen';
import LeaderboardScreen from './pages/LeaderboardScreen';
import BadgesScreen from './pages/BadgesScreen';
import ChatsScreen from './pages/ChatsScreen';
import ChatDetailScreen from './pages/ChatDetailScreen';
import AIChatScreen from './pages/AIChatScreen';
import RewardsScreen from './pages/RewardsScreen';
import TasksScreen from './pages/TasksScreen';
import TaskDetailScreen from './pages/TaskDetailScreen';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/splash" replace />} />
          <Route path="/splash" element={<SplashScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/selection" element={<SelectionScreen />} />
          <Route path="/home" element={<HomeScreen />} />
          <Route path="/activities" element={<ActivitiesScreen />} />
          <Route path="/leaderboard" element={<LeaderboardScreen />} />
          <Route path="/badges" element={<BadgesScreen />} />
          <Route path="/chats" element={<ChatsScreen />} />
          <Route path="/chat/:groupId" element={<ChatDetailScreen />} />
          <Route path="/ai-chat" element={<AIChatScreen />} />
          <Route path="/rewards" element={<RewardsScreen />} />
          <Route path="/tasks" element={<TasksScreen />} />
          <Route path="/task/:taskId" element={<TaskDetailScreen />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
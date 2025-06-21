export interface User {
  uid: string;
  name: string;
  email: string;
  points: number;
  level: 'Wanderer' | 'Explorer' | 'Trailblazer';
  badges: string[];
  completedTasks: string[];
  currentRank: number;
  profileImage: string;
  createdAt: Date;
}

export interface Activity {
  id: string;
  title: string;
  description: string;
  location: string;
  difficulty: 'Wanderer' | 'Explorer' | 'Trailblazer';
  points: number;
  timeRequired: string;
  imageUrl: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  location: string;
  timeSlot: string;
  difficulty: string;
  points: number;
  imageUrl: string;
}

export interface MysteryQuest {
  id: string;
  task: string;
  points: number;
  location: string;
  isDaily: boolean;
}

export interface Reward {
  id: string;
  title: string;
  description: string;
  pointsRequired: number;
  imageUrl: string;
  redeemCode: string;
}

export interface ChatGroup {
  id: string;
  activityId: string;
  participants: string[];
  chatMessages: ChatMessage[];
  createdAt: Date;
}

export interface ChatMessage {
  id: string;
  userId: string;
  userName: string;
  message: string;
  timestamp: Date;
}
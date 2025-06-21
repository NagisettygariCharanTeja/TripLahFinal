import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNavigation from '../components/Layout/BottomNavigation';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';

interface Task {
  id: string;
  title: string;
  location: string;
  points: number;
  difficulty: string;
  image: string;
  startTime?: string;
  endTime?: string;
}

const TasksScreen: React.FC = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<Task[]>([]);

  // Default tasks
  const defaultTasks = [
    {
      id: '1',
      title: 'Snap a picture from Petronas Towers!!',
      location: 'KLCC',
      points: 15,
      difficulty: 'Explorer',
      image: 'https://images.pexels.com/photos/1470502/pexels-photo-1470502.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      id: '2',
      title: 'Snap a picture of a mural in Pasar Seni!',
      location: 'Central Market',
      points: 10,
      difficulty: 'Wanderer',
      image: 'https://images.pexels.com/photos/1109541/pexels-photo-1109541.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      id: '3',
      title: 'Visit Petronas AMG F1 in Suria KLCC',
      location: 'KLCC',
      points: 20,
      difficulty: 'Explorer',
      image: 'https://images.pexels.com/photos/1470502/pexels-photo-1470502.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      id: '4',
      title: 'Snap a picture from Merdeka Tower!',
      location: 'Merdeka 118',
      points: 25,
      difficulty: 'Trailblazer',
      image: 'https://images.pexels.com/photos/1470502/pexels-photo-1470502.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
  ];

  useEffect(() => {
    // Load registered tasks from localStorage
    const registeredTasks = JSON.parse(localStorage.getItem('registeredTasks') || '[]');
    
    // Combine default tasks with registered tasks
    const allTasks = [...defaultTasks, ...registeredTasks];
    
    // Remove duplicates based on id
    const uniqueTasks = allTasks.filter((task, index, self) => 
      index === self.findIndex(t => t.id === task.id)
    );
    
    setTasks(uniqueTasks);
  }, []);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Wanderer':
        return 'bg-green-100 text-green-800';
      case 'Explorer':
        return 'bg-blue-100 text-blue-800';
      case 'Trailblazer':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm p-4">
        <h1 className="text-2xl font-bold text-black">Tasks</h1>
        <p className="text-gray-600 mt-1">Complete tasks to earn points</p>
      </div>

      <div className="p-4">
        {/* Tasks List */}
        <div className="space-y-4">
          {tasks.map((task) => (
            <Card key={task.id} className="p-4">
              <div className="flex items-center space-x-4">
                <img 
                  src={task.image} 
                  alt={task.title}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-black">{task.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{task.location}</p>
                  {task.startTime && task.endTime && (
                    <p className="text-xs text-gray-500 mt-1">
                      Time: {task.startTime} - {task.endTime}
                    </p>
                  )}
                  <div className="flex items-center space-x-2 mt-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(task.difficulty)}`}>
                      {task.difficulty}
                    </span>
                    <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                      +{task.points} points
                    </span>
                  </div>
                </div>
                <Button
                  onClick={() => navigate(`/task/${task.id}`)}
                  size="sm"
                >
                  View
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {tasks.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No tasks available. Register for activities to see them here!</p>
          </div>
        )}
      </div>

      <BottomNavigation />
    </div>
  );
};

export default TasksScreen;
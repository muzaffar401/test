"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Trophy, 
  Clock, 
  Users, 
  Star,
  DollarSign,
  Calendar,
  Target,
  Zap,
  Award,
  TrendingUp
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function ChallengesPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const challenges = [
    {
      id: 1,
      title: "30-Day Coding Sprint",
      description: "Complete 3 programming courses in 30 days and win big rewards!",
      category: "Programming",
      difficulty: "intermediate",
      reward: 150,
      participants: 234,
      timeLeft: "12 days",
      progress: 65,
      status: "active",
      requirements: ["Complete 3 programming courses", "Maintain 90% quiz scores", "Submit final project"],
      startDate: "2024-01-15",
      endDate: "2024-02-15"
    },
    {
      id: 2,
      title: "Design Master Challenge",
      description: "Master graphic design fundamentals and create a portfolio piece.",
      category: "Design",
      difficulty: "beginner",
      reward: 75,
      participants: 156,
      timeLeft: "8 days",
      progress: 80,
      status: "active",
      requirements: ["Complete Design Fundamentals course", "Create 5 design projects", "Peer review 3 submissions"],
      startDate: "2024-01-20",
      endDate: "2024-02-10"
    },
    {
      id: 3,
      title: "Data Science Bootcamp",
      description: "Analyze real-world datasets and present your findings.",
      category: "Data Science",
      difficulty: "advanced",
      reward: 200,
      participants: 89,
      timeLeft: "Coming Soon",
      progress: 0,
      status: "upcoming",
      requirements: ["Complete Python for Data Science", "Analyze 2 datasets", "Present findings"],
      startDate: "2024-02-20",
      endDate: "2024-03-20"
    },
    {
      id: 4,
      title: "Marketing Maverick",
      description: "Create and execute a complete digital marketing campaign.",
      category: "Marketing",
      difficulty: "intermediate",
      reward: 100,
      participants: 178,
      timeLeft: "Ended",
      progress: 100,
      status: "completed",
      requirements: ["Complete Digital Marketing course", "Create campaign strategy", "Execute and measure results"],
      startDate: "2023-12-01",
      endDate: "2024-01-01"
    }
  ];

  const categories = ['all', 'Programming', 'Design', 'Data Science', 'Marketing'];

  const filteredChallenges = challenges.filter(challenge => 
    selectedCategory === 'all' || challenge.category === selectedCategory
  );

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100';
      case 'advanced': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100';
      case 'upcoming': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100';
      case 'completed': return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100';
    }
  };

  const leaderboard = [
    { rank: 1, name: "Alex Chen", points: 2450, avatar: "AC" },
    { rank: 2, name: "Sarah Johnson", points: 2380, avatar: "SJ" },
    { rank: 3, name: "Mike Rodriguez", points: 2290, avatar: "MR" },
    { rank: 4, name: "Emma Wilson", points: 2150, avatar: "EW" },
    { rank: 5, name: "David Kim", points: 2080, avatar: "DK" }
  ];

  return (
    <div className="min-h-screen bg-background py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            Learning <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Challenges</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Compete with other students, push your limits, and earn bigger rewards through exciting challenges.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <Card>
            <CardContent className="p-6 text-center">
              <Trophy className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">12</div>
              <div className="text-sm text-muted-foreground">Active Challenges</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">1,234</div>
              <div className="text-sm text-muted-foreground">Participants</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <DollarSign className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">$5,000</div>
              <div className="text-sm text-muted-foreground">Total Rewards</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Award className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">89%</div>
              <div className="text-sm text-muted-foreground">Completion Rate</div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Filters */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-8"
            >
              <div className="flex flex-wrap gap-2">
                <span className="text-sm font-medium text-muted-foreground mr-2">Filter by category:</span>
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className="capitalize"
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </motion.div>

            {/* Challenges Grid */}
            <div className="space-y-6">
              {filteredChallenges.map((challenge, index) => (
                <motion.div
                  key={challenge.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-lg transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-semibold">{challenge.title}</h3>
                            <Badge className={getStatusColor(challenge.status)}>
                              {challenge.status}
                            </Badge>
                          </div>
                          <p className="text-muted-foreground mb-4">{challenge.description}</p>
                          
                          <div className="flex items-center gap-6 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <DollarSign className="w-4 h-4" />
                              ${challenge.reward} reward
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              {challenge.participants} participants
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {challenge.timeLeft}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex flex-col items-end gap-2">
                          <Badge className={getDifficultyColor(challenge.difficulty)}>
                            {challenge.difficulty}
                          </Badge>
                          <Badge variant="secondary">{challenge.category}</Badge>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      {challenge.status === 'active' && (
                        <div className="mb-4">
                          <div className="flex justify-between text-sm mb-2">
                            <span>Challenge Progress</span>
                            <span>{challenge.progress}%</span>
                          </div>
                          <Progress value={challenge.progress} className="h-2" />
                        </div>
                      )}
                      
                      <div className="mb-4">
                        <h4 className="font-medium mb-2">Requirements:</h4>
                        <ul className="space-y-1">
                          {challenge.requirements.map((req, reqIndex) => (
                            <li key={reqIndex} className="flex items-center gap-2 text-sm text-muted-foreground">
                              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(challenge.startDate).toLocaleDateString()} - {new Date(challenge.endDate).toLocaleDateString()}
                          </div>
                        </div>
                        
                        <Button 
                          disabled={challenge.status === 'completed' || challenge.status === 'upcoming'}
                          className="ml-auto"
                        >
                          {challenge.status === 'active' ? 'Join Challenge' : 
                           challenge.status === 'upcoming' ? 'Coming Soon' : 'Completed'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Leaderboard */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5" />
                      Leaderboard
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {leaderboard.map((user) => (
                        <div
                          key={user.rank}
                          className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-900"
                        >
                          <div className="flex items-center gap-2">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                              user.rank === 1 ? 'bg-yellow-500 text-white' :
                              user.rank === 2 ? 'bg-gray-400 text-white' :
                              user.rank === 3 ? 'bg-orange-500 text-white' :
                              'bg-gray-200 text-gray-700'
                            }`}>
                              {user.rank}
                            </div>
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                              {user.avatar}
                            </div>
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-sm truncate">{user.name}</div>
                            <div className="text-xs text-muted-foreground">{user.points} points</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Challenge Tips */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="w-5 h-5" />
                      Pro Tips
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 text-sm">
                      <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                        <div className="font-medium text-blue-800 dark:text-blue-200 mb-1">
                          Start Early
                        </div>
                        <div className="text-blue-700 dark:text-blue-300">
                          Begin challenges as soon as they open to maximize your time.
                        </div>
                      </div>
                      
                      <div className="p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                        <div className="font-medium text-green-800 dark:text-green-200 mb-1">
                          Stay Consistent
                        </div>
                        <div className="text-green-700 dark:text-green-300">
                          Daily progress is better than cramming at the end.
                        </div>
                      </div>
                      
                      <div className="p-3 bg-purple-50 dark:bg-purple-950 rounded-lg">
                        <div className="font-medium text-purple-800 dark:text-purple-200 mb-1">
                          Join Communities
                        </div>
                        <div className="text-purple-700 dark:text-purple-300">
                          Connect with other participants for motivation and help.
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
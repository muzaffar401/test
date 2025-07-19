"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  MessageCircle, 
  Heart, 
  Share2, 
  Users, 
  TrendingUp,
  BookOpen,
  Award,
  Search,
  Plus,
  Filter,
  Star
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function CommunityPage() {
  const [selectedTab, setSelectedTab] = useState('feed');
  const [newPost, setNewPost] = useState('');

  const posts = [
    {
      id: 1,
      author: {
        name: "Sarah Johnson",
        avatar: "SJ",
        role: "Student",
        level: "Advanced"
      },
      content: "Just completed the Web Development Bootcamp! 🎉 The final project was challenging but so rewarding. Thanks to everyone who helped me debug my React components!",
      timestamp: "2 hours ago",
      likes: 24,
      comments: 8,
      shares: 3,
      tags: ["WebDevelopment", "React", "Success"],
      course: "Complete Web Development Bootcamp"
    },
    {
      id: 2,
      author: {
        name: "Mike Chen",
        avatar: "MC",
        role: "Student",
        level: "Intermediate"
      },
      content: "Looking for study partners for the Data Science challenge! Anyone interested in forming a study group? We could meet virtually twice a week to discuss concepts and work through problems together.",
      timestamp: "4 hours ago",
      likes: 15,
      comments: 12,
      shares: 5,
      tags: ["DataScience", "StudyGroup", "Challenge"],
      course: null
    },
    {
      id: 3,
      author: {
        name: "Emma Rodriguez",
        avatar: "ER",
        role: "Mentor",
        level: "Expert"
      },
      content: "Pro tip for new students: Don't rush through the videos! Take notes, pause to practice, and don't hesitate to rewatch sections. Quality over speed always wins. 📚✨",
      timestamp: "1 day ago",
      likes: 45,
      comments: 18,
      shares: 12,
      tags: ["Tips", "Learning", "Advice"],
      course: null
    },
    {
      id: 4,
      author: {
        name: "David Kim",
        avatar: "DK",
        role: "Student",
        level: "Beginner"
      },
      content: "First week at Save Ur Kids and I'm already loving it! The community here is so supportive. Special thanks to @EmmaRodriguez for the helpful feedback on my first project. 🙏",
      timestamp: "2 days ago",
      likes: 32,
      comments: 15,
      shares: 7,
      tags: ["NewStudent", "Gratitude", "Community"],
      course: "Digital Marketing Fundamentals"
    }
  ];

  const studyGroups = [
    {
      id: 1,
      name: "React Developers Circle",
      members: 156,
      description: "Weekly discussions about React best practices, new features, and project showcases.",
      category: "Programming",
      activity: "Very Active"
    },
    {
      id: 2,
      name: "Data Science Explorers",
      members: 89,
      description: "Analyzing datasets together, sharing insights, and preparing for data science challenges.",
      category: "Data Science",
      activity: "Active"
    },
    {
      id: 3,
      name: "Design Critique Group",
      members: 67,
      description: "Share your designs, get constructive feedback, and improve your creative skills.",
      category: "Design",
      activity: "Moderate"
    },
    {
      id: 4,
      name: "Marketing Masterminds",
      members: 134,
      description: "Discuss marketing strategies, share campaign ideas, and learn from real-world examples.",
      category: "Marketing",
      activity: "Very Active"
    }
  ];

  const leaderboard = [
    { rank: 1, name: "Alex Chen", points: 2450, contributions: 89, avatar: "AC" },
    { rank: 2, name: "Sarah Johnson", points: 2380, contributions: 76, avatar: "SJ" },
    { rank: 3, name: "Mike Rodriguez", points: 2290, contributions: 82, avatar: "MR" },
    { rank: 4, name: "Emma Wilson", points: 2150, contributions: 65, avatar: "EW" },
    { rank: 5, name: "David Kim", points: 2080, contributions: 71, avatar: "DK" }
  ];

  const tabs = [
    { id: 'feed', label: 'Community Feed', icon: MessageCircle },
    { id: 'groups', label: 'Study Groups', icon: Users },
    { id: 'leaderboard', label: 'Leaderboard', icon: TrendingUp }
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
            Learning <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Community</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Connect with fellow learners, share your progress, and grow together in our supportive community.
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
              <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">10,234</div>
              <div className="text-sm text-muted-foreground">Active Members</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <MessageCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">1,567</div>
              <div className="text-sm text-muted-foreground">Posts This Week</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <BookOpen className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">45</div>
              <div className="text-sm text-muted-foreground">Study Groups</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Award className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">892</div>
              <div className="text-sm text-muted-foreground">Success Stories</div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Navigation Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex justify-center mb-8"
        >
          <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-md transition-colors ${
                  selectedTab === tab.id
                    ? 'bg-white dark:bg-gray-700 shadow-sm'
                    : 'hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Content based on selected tab */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {selectedTab === 'feed' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="space-y-6"
              >
                {/* Create Post */}
                <Card>
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <Avatar>
                        <AvatarFallback>YU</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <Textarea
                          placeholder="Share your learning journey, ask questions, or celebrate achievements..."
                          value={newPost}
                          onChange={(e) => setNewPost(e.target.value)}
                          className="mb-4"
                          rows={3}
                        />
                        <div className="flex justify-between items-center">
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Plus className="w-4 h-4 mr-2" />
                              Add Image
                            </Button>
                            <Button variant="outline" size="sm">
                              <BookOpen className="w-4 h-4 mr-2" />
                              Tag Course
                            </Button>
                          </div>
                          <Button disabled={!newPost.trim()}>
                            Post
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Posts Feed */}
                {posts.map((post, index) => (
                  <Card key={post.id}>
                    <CardContent className="p-6">
                      <div className="flex gap-4">
                        <Avatar>
                          <AvatarFallback>{post.author.avatar}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-semibold">{post.author.name}</span>
                            <Badge variant="secondary" className="text-xs">
                              {post.author.role}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {post.author.level}
                            </Badge>
                            <span className="text-sm text-muted-foreground">•</span>
                            <span className="text-sm text-muted-foreground">{post.timestamp}</span>
                          </div>
                          
                          {post.course && (
                            <div className="mb-3">
                              <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">
                                <BookOpen className="w-3 h-3 mr-1" />
                                {post.course}
                              </Badge>
                            </div>
                          )}
                          
                          <p className="text-foreground mb-4 leading-relaxed">{post.content}</p>
                          
                          <div className="flex flex-wrap gap-2 mb-4">
                            {post.tags.map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                #{tag}
                              </Badge>
                            ))}
                          </div>
                          
                          <div className="flex items-center gap-6 text-sm text-muted-foreground">
                            <button className="flex items-center gap-1 hover:text-red-500 transition-colors">
                              <Heart className="w-4 h-4" />
                              {post.likes}
                            </button>
                            <button className="flex items-center gap-1 hover:text-blue-500 transition-colors">
                              <MessageCircle className="w-4 h-4" />
                              {post.comments}
                            </button>
                            <button className="flex items-center gap-1 hover:text-green-500 transition-colors">
                              <Share2 className="w-4 h-4" />
                              {post.shares}
                            </button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </motion.div>
            )}

            {selectedTab === 'groups' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="space-y-6"
              >
                {/* Search and Filter */}
                <Card>
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Search study groups..." className="pl-10" />
                      </div>
                      <Button variant="outline">
                        <Filter className="w-4 h-4 mr-2" />
                        Filter
                      </Button>
                      <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        Create Group
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Study Groups */}
                {studyGroups.map((group) => (
                  <Card key={group.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-semibold mb-2">{group.name}</h3>
                          <p className="text-muted-foreground mb-3">{group.description}</p>
                        </div>
                        <Badge className={
                          group.activity === 'Very Active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100' :
                          group.activity === 'Active' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100' :
                          'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100'
                        }>
                          {group.activity}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {group.members} members
                          </div>
                          <Badge variant="outline">{group.category}</Badge>
                        </div>
                        <Button>Join Group</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </motion.div>
            )}

            {selectedTab === 'leaderboard' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Community Leaderboard</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {leaderboard.map((user) => (
                        <div
                          key={user.rank}
                          className="flex items-center gap-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-900"
                        >
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                            user.rank === 1 ? 'bg-yellow-500 text-white' :
                            user.rank === 2 ? 'bg-gray-400 text-white' :
                            user.rank === 3 ? 'bg-orange-500 text-white' :
                            'bg-gray-200 text-gray-700'
                          }`}>
                            {user.rank}
                          </div>
                          
                          <Avatar>
                            <AvatarFallback>{user.avatar}</AvatarFallback>
                          </Avatar>
                          
                          <div className="flex-1">
                            <div className="font-semibold">{user.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {user.contributions} contributions this month
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <div className="font-bold text-lg">{user.points}</div>
                            <div className="text-sm text-muted-foreground">points</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Quick Stats */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Your Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Posts</span>
                        <span className="font-semibold">12</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Comments</span>
                        <span className="font-semibold">45</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Likes Given</span>
                        <span className="font-semibold">89</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Groups Joined</span>
                        <span className="font-semibold">3</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Trending Topics */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 1.0 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Trending Topics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {['#WebDevelopment', '#DataScience', '#ReactJS', '#MachineLearning', '#DigitalMarketing'].map((topic, index) => (
                        <div key={topic} className="flex items-center justify-between">
                          <span className="text-blue-600 hover:underline cursor-pointer">{topic}</span>
                          <span className="text-sm text-muted-foreground">{Math.floor(Math.random() * 100) + 20}</span>
                        </div>
                      ))}
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
"use client";

import { useQuery } from 'convex/react';
import { useUser } from '@clerk/nextjs';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  Award, 
  DollarSign, 
  Clock,
  TrendingUp,
  Play,
  CheckCircle,
  Calendar
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function DashboardPage() {
  const { user } = useUser();

  const userEnrollments = useQuery(
    api.enrollments.getUserEnrollments,
    user ? { userId: user.id as Id<"users"> } : "skip"
  );

  const userRewards = useQuery(
    api.rewards.getStudentRewards,
    user ? { studentId: user.id as Id<"users"> } : "skip"
  );

  const allCourses = useQuery(api.courses.getAllCourses);

  if (!user) {
    return (
      <div className="min-h-screen bg-background py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Please sign in to view your dashboard</h1>
            <Button asChild>
              <Link href="/sign-in">Sign In</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const totalRewards = userRewards?.reduce((sum, reward) => 
    reward.status === 'distributed' ? sum + reward.amount : sum, 0
  ) || 0;

  const completedCourses = userEnrollments?.filter(e => e.isCompleted).length || 0;
  const inProgressCourses = userEnrollments?.filter(e => !e.isCompleted).length || 0;

  const stats = [
    {
      title: "Total Earnings",
      value: `$${totalRewards}`,
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-100 dark:bg-green-900"
    },
    {
      title: "Completed Courses",
      value: completedCourses.toString(),
      icon: CheckCircle,
      color: "text-blue-600",
      bgColor: "bg-blue-100 dark:bg-blue-900"
    },
    {
      title: "In Progress",
      value: inProgressCourses.toString(),
      icon: BookOpen,
      color: "text-orange-600",
      bgColor: "bg-orange-100 dark:bg-orange-900"
    },
    {
      title: "Achievements",
      value: (completedCourses * 2).toString(),
      icon: Award,
      color: "text-purple-600",
      bgColor: "bg-purple-100 dark:bg-purple-900"
    }
  ];

  return (
    <div className="min-h-screen bg-background py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-2">
            Welcome back, {user.firstName || 'Student'}! 👋
          </h1>
          <p className="text-xl text-muted-foreground">
            Continue your learning journey and earn rewards.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {stats.map((stat, index) => (
            <Card key={index} className="dashboard-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </p>
                    <p className="text-3xl font-bold">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.bgColor}`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Current Courses */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    Your Courses
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {userEnrollments && userEnrollments.length > 0 ? (
                    <div className="space-y-4">
                      {userEnrollments.map((enrollment) => {
                        const timeRemaining = Math.max(0, enrollment.deadline - Date.now());
                        const daysRemaining = Math.ceil(timeRemaining / (1000 * 60 * 60 * 24));
                        
                        return (
                          <div
                            key={enrollment._id}
                            className="p-4 border rounded-lg hover:shadow-md transition-shadow"
                          >
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex-1">
                                <h3 className="font-semibold text-lg mb-1">
                                  {enrollment.course?.title}
                                </h3>
                                <p className="text-sm text-muted-foreground mb-2">
                                  {enrollment.course?.instructor}
                                </p>
                                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                  <div className="flex items-center gap-1">
                                    <Clock className="w-4 h-4" />
                                    {daysRemaining} days left
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <DollarSign className="w-4 h-4" />
                                    ${enrollment.course?.reward} reward
                                  </div>
                                </div>
                              </div>
                              <div className="flex flex-col items-end gap-2">
                                {enrollment.isCompleted ? (
                                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                                    Completed
                                  </Badge>
                                ) : (
                                  <Badge variant="outline">
                                    In Progress
                                  </Badge>
                                )}
                              </div>
                            </div>
                            
                            <div className="mb-3">
                              <div className="flex justify-between text-sm mb-1">
                                <span>Progress</span>
                                <span>{Math.round(enrollment.progress)}%</span>
                              </div>
                              <Progress value={enrollment.progress} className="h-2" />
                            </div>
                            
                            <div className="flex gap-2">
                              {enrollment.isCompleted ? (
                                <Button variant="outline" size="sm" asChild>
                                  <Link href={`/courses/${enrollment.courseId}`}>
                                    View Certificate
                                  </Link>
                                </Button>
                              ) : (
                                <Button size="sm" asChild>
                                  <Link href={`/learn/${enrollment.courseId}`}>
                                    <Play className="w-4 h-4 mr-2" />
                                    Continue Learning
                                  </Link>
                                </Button>
                              )}
                              <Button variant="outline" size="sm" asChild>
                                <Link href={`/courses/${enrollment.courseId}`}>
                                  View Details
                                </Link>
                              </Button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">No courses yet</h3>
                      <p className="text-muted-foreground mb-4">
                        Start your learning journey by enrolling in a course.
                      </p>
                      <Button asChild>
                        <Link href="/courses">Browse Courses</Link>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Recent Rewards */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="w-5 h-5" />
                      Recent Rewards
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {userRewards && userRewards.length > 0 ? (
                      <div className="space-y-3">
                        {userRewards.slice(0, 5).map((reward) => (
                          <div
                            key={reward._id}
                            className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-950 rounded-lg"
                          >
                            <div>
                              <div className="font-medium text-sm">
                                Course Completion
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {new Date(reward.createdAt).toLocaleDateString()}
                              </div>
                            </div>
                            <div className="text-green-600 font-semibold">
                              +${reward.amount}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-4">
                        <Award className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">
                          Complete courses to earn rewards!
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>

              {/* Recommended Courses */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5" />
                      Recommended
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {allCourses ? (
                      <div className="space-y-3">
                        {allCourses.slice(0, 3).map((course) => (
                          <div
                            key={course._id}
                            className="p-3 border rounded-lg hover:shadow-sm transition-shadow"
                          >
                            <h4 className="font-medium text-sm mb-1">
                              {course.title}
                            </h4>
                            <div className="flex items-center justify-between text-xs text-muted-foreground">
                              <span>{course.difficulty}</span>
                              <span className="text-green-600 font-medium">
                                ${course.reward}
                              </span>
                            </div>
                            <Button size="sm" variant="outline" className="w-full mt-2" asChild>
                              <Link href={`/courses/${course._id}`}>
                                View Course
                              </Link>
                            </Button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="animate-pulse space-y-3">
                        {[...Array(3)].map((_, i) => (
                          <div key={i} className="h-20 bg-gray-200 dark:bg-gray-700 rounded" />
                        ))}
                      </div>
                    )}
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
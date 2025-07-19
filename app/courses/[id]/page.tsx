"use client";

import { useState } from 'react';
import { useQuery, useMutation } from 'convex/react';
import { useUser } from '@clerk/nextjs';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Play, 
  Clock, 
  Users, 
  Star, 
  DollarSign,
  BookOpen,
  Award,
  CheckCircle,
  Lock,
  Calendar
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { toast } from '@/hooks/use-toast';

interface CoursePageProps {
  params: {
    id: string;
  };
}

export default function CoursePage({ params }: CoursePageProps) {
  const { user } = useUser();
  const router = useRouter();
  const [isEnrolling, setIsEnrolling] = useState(false);

  const course = useQuery(api.courses.getCourseById, { 
    courseId: params.id as Id<"courses"> 
  });

  const userEnrollments = useQuery(
    api.enrollments.getUserEnrollments,
    user ? { userId: user.id as Id<"users"> } : "skip"
  );

  const enrollInCourse = useMutation(api.enrollments.enrollInCourse);

  const enrollment = userEnrollments?.find(e => e.courseId === params.id);
  const isEnrolled = !!enrollment;

  const handleEnroll = async () => {
    if (!user) {
      router.push('/sign-in');
      return;
    }

    setIsEnrolling(true);
    try {
      await enrollInCourse({
        userId: user.id as Id<"users">,
        courseId: params.id as Id<"courses">
      });
      
      toast({
        title: "Successfully enrolled!",
        description: "You can now start learning this course.",
      });
      
      router.push(`/learn/${params.id}`);
    } catch (error) {
      toast({
        title: "Enrollment failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsEnrolling(false);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100';
      case 'advanced': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100';
    }
  };

  if (!course) {
    return (
      <div className="min-h-screen bg-background py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-4" />
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-8" />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded" />
              </div>
              <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  const timeRemaining = enrollment ? Math.max(0, enrollment.deadline - Date.now()) : 0;
  const daysRemaining = Math.ceil(timeRemaining / (1000 * 60 * 60 * 24));

  return (
    <div className="min-h-screen bg-background py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Course Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <div className="flex items-center gap-4 mb-4">
                <Badge className={getDifficultyColor(course.difficulty)}>
                  {course.difficulty}
                </Badge>
                <Badge variant="secondary">{course.category}</Badge>
                {isEnrolled && (
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                    Enrolled
                  </Badge>
                )}
              </div>
              
              <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
              <p className="text-xl text-muted-foreground mb-6">{course.description}</p>
              
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {course.enrollmentCount} students
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {course.timeLimit} days to complete
                </div>
                <div className="flex items-center gap-1">
                  <BookOpen className="w-4 h-4" />
                  {course.videos.length} videos
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  4.9 rating
                </div>
              </div>
            </motion.div>

            {/* Course Progress (if enrolled) */}
            {isEnrolled && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Card className="mb-8">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="w-5 h-5" />
                      Your Progress
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Course Progress</span>
                          <span>{Math.round(enrollment.progress)}%</span>
                        </div>
                        <Progress value={enrollment.progress} className="h-2" />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Videos Completed:</span>
                          <div className="font-semibold">
                            {enrollment.completedVideos.length} / {course.videos.length}
                          </div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Time Remaining:</span>
                          <div className="font-semibold flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {daysRemaining} days
                          </div>
                        </div>
                      </div>
                      
                      {enrollment.progress >= 100 && !enrollment.rewardClaimed && (
                        <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg">
                          <div className="flex items-center gap-2 text-green-800 dark:text-green-200">
                            <CheckCircle className="w-5 h-5" />
                            <span className="font-semibold">Course Completed!</span>
                          </div>
                          <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                            Your ${course.reward} reward is being processed.
                          </p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Course Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Course Content</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {course.videos.map((video, index) => {
                      const isCompleted = enrollment?.completedVideos.includes(video.id);
                      const isAccessible = isEnrolled && (index === 0 || enrollment?.completedVideos.includes(course.videos[index - 1].id));
                      
                      return (
                        <div
                          key={video.id}
                          className={`flex items-center gap-3 p-3 rounded-lg border ${
                            isCompleted 
                              ? 'bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800' 
                              : isAccessible 
                                ? 'bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800'
                                : 'bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800'
                          }`}
                        >
                          <div className="flex-shrink-0">
                            {isCompleted ? (
                              <CheckCircle className="w-5 h-5 text-green-600" />
                            ) : isAccessible ? (
                              <Play className="w-5 h-5 text-blue-600" />
                            ) : (
                              <Lock className="w-5 h-5 text-gray-400" />
                            )}
                          </div>
                          
                          <div className="flex-1">
                            <h4 className="font-medium">{video.title}</h4>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Clock className="w-3 h-3" />
                              {Math.floor(video.duration / 60)}:{(video.duration % 60).toString().padStart(2, '0')}
                            </div>
                          </div>
                          
                          <div className="text-sm text-muted-foreground">
                            {index + 1}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="sticky top-24"
            >
              <Card>
                <CardHeader>
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                      <DollarSign />
                    </div>
                    <div className="text-3xl font-bold text-green-600 mb-2">
                      ${course.reward}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Reward for completion
                    </p>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {isEnrolled ? (
                    <Button 
                      className="w-full" 
                      asChild
                    >
                      <a href={`/learn/${course._id}`}>
                        Continue Learning
                      </a>
                    </Button>
                  ) : (
                    <Button 
                      className="w-full" 
                      onClick={handleEnroll}
                      disabled={isEnrolling}
                    >
                      {isEnrolling ? 'Enrolling...' : 'Enroll for Free'}
                    </Button>
                  )}
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Instructor:</span>
                      <span className="font-medium">{course.instructor}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Duration:</span>
                      <span className="font-medium">{course.timeLimit} days</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Videos:</span>
                      <span className="font-medium">{course.videos.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Level:</span>
                      <span className="font-medium capitalize">{course.difficulty}</span>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <h4 className="font-medium mb-2">Skills you'll learn:</h4>
                    <div className="flex flex-wrap gap-2">
                      {course.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
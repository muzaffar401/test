"use client";

import { useState, useEffect } from 'react';
import { useQuery, useMutation } from 'convex/react';
import { useUser } from '@clerk/nextjs';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack, 
  CheckCircle,
  Clock,
  Award,
  BookOpen,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { toast } from '@/hooks/use-toast';

interface LearnPageProps {
  params: {
    id: string;
  };
}

export default function LearnPage({ params }: LearnPageProps) {
  const { user } = useUser();
  const router = useRouter();
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const course = useQuery(api.courses.getCourseById, { 
    courseId: params.id as Id<"courses"> 
  });

  const userEnrollments = useQuery(
    api.enrollments.getUserEnrollments,
    user ? { userId: user.id as Id<"users"> } : "skip"
  );

  const updateProgress = useMutation(api.enrollments.updateProgress);

  const enrollment = userEnrollments?.find(e => e.courseId === params.id);

  useEffect(() => {
    if (!user) {
      router.push('/sign-in');
      return;
    }

    if (course && !enrollment) {
      router.push(`/courses/${params.id}`);
      return;
    }

    if (enrollment) {
      setCurrentVideoIndex(enrollment.currentVideoIndex || 0);
    }
  }, [user, course, enrollment, router, params.id]);

  const handleVideoComplete = async () => {
    if (!enrollment || !course) return;

    const currentVideo = course.videos[currentVideoIndex];
    
    try {
      await updateProgress({
        enrollmentId: enrollment._id,
        videoId: currentVideo.id,
      });

      toast({
        title: "Video completed!",
        description: "Your progress has been saved.",
      });

      // Show quiz if this is the last video or move to next
      if (currentVideoIndex === course.videos.length - 1) {
        setShowQuiz(true);
      } else {
        setCurrentVideoIndex(prev => prev + 1);
      }
    } catch (error) {
      toast({
        title: "Error saving progress",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleQuizSubmit = async () => {
    if (!enrollment || !course) return;

    const currentVideo = course.videos[currentVideoIndex];
    const score = 85; // Mock quiz score

    try {
      await updateProgress({
        enrollmentId: enrollment._id,
        videoId: currentVideo.id,
        quizScore: score,
      });

      setQuizSubmitted(true);
      
      toast({
        title: "Quiz completed!",
        description: `You scored ${score}%`,
      });

      setTimeout(() => {
        if (currentVideoIndex < course.videos.length - 1) {
          setCurrentVideoIndex(prev => prev + 1);
          setShowQuiz(false);
          setQuizSubmitted(false);
          setQuizAnswers([]);
        }
      }, 2000);
    } catch (error) {
      toast({
        title: "Error submitting quiz",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

  if (!course || !enrollment) {
    return (
      <div className="min-h-screen bg-background py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-4" />
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <div className="lg:col-span-3">
                <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded" />
              </div>
              <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentVideo = course.videos[currentVideoIndex];
  const isVideoCompleted = enrollment.completedVideos.includes(currentVideo.id);
  const progress = (enrollment.completedVideos.length / course.videos.length) * 100;

  // Mock quiz questions
  const quizQuestions = [
    {
      question: "What is the main concept covered in this video?",
      options: ["Option A", "Option B", "Option C", "Option D"],
      correct: 1
    },
    {
      question: "Which technique was demonstrated?",
      options: ["Technique 1", "Technique 2", "Technique 3", "Technique 4"],
      correct: 2
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
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold">{course.title}</h1>
            <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
              {Math.round(progress)}% Complete
            </Badge>
          </div>
          <Progress value={progress} className="h-2" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Video Player */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card className="mb-6">
                <CardContent className="p-0">
                  <div className="aspect-video bg-black rounded-t-lg relative overflow-hidden">
                    {/* YouTube Video Embed */}
                    <iframe
                      src={`https://www.youtube.com/embed/${currentVideo.videoId}?autoplay=${isPlaying ? 1 : 0}`}
                      title={currentVideo.title}
                      className="w-full h-full"
                      allowFullScreen
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    />
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-xl font-semibold">{currentVideo.title}</h2>
                      {isVideoCompleted && (
                        <CheckCircle className="w-6 h-6 text-green-600" />
                      )}
                    </div>
                    
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        {Math.floor(currentVideo.duration / 60)}:{(currentVideo.duration % 60).toString().padStart(2, '0')}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Video {currentVideoIndex + 1} of {course.videos.length}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <Button
                        variant="outline"
                        onClick={() => setCurrentVideoIndex(Math.max(0, currentVideoIndex - 1))}
                        disabled={currentVideoIndex === 0}
                      >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Previous
                      </Button>
                      
                      {!isVideoCompleted && (
                        <Button onClick={handleVideoComplete}>
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Mark as Complete
                        </Button>
                      )}
                      
                      <Button
                        variant="outline"
                        onClick={() => setCurrentVideoIndex(Math.min(course.videos.length - 1, currentVideoIndex + 1))}
                        disabled={currentVideoIndex === course.videos.length - 1}
                      >
                        Next
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quiz Section */}
              {showQuiz && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="w-5 h-5" />
                      Video Quiz
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {!quizSubmitted ? (
                      <div className="space-y-6">
                        {quizQuestions.map((question, qIndex) => (
                          <div key={qIndex}>
                            <h3 className="font-medium mb-3">{question.question}</h3>
                            <div className="space-y-2">
                              {question.options.map((option, oIndex) => (
                                <label
                                  key={oIndex}
                                  className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
                                >
                                  <input
                                    type="radio"
                                    name={`question-${qIndex}`}
                                    value={oIndex}
                                    onChange={() => {
                                      const newAnswers = [...quizAnswers];
                                      newAnswers[qIndex] = oIndex;
                                      setQuizAnswers(newAnswers);
                                    }}
                                    className="w-4 h-4"
                                  />
                                  <span>{option}</span>
                                </label>
                              ))}
                            </div>
                          </div>
                        ))}
                        
                        <Button 
                          onClick={handleQuizSubmit}
                          disabled={quizAnswers.length < quizQuestions.length}
                          className="w-full"
                        >
                          Submit Quiz
                        </Button>
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold mb-2">Quiz Completed!</h3>
                        <p className="text-muted-foreground">
                          Great job! Moving to the next video...
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="sticky top-24"
            >
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="w-5 h-5" />
                    Course Progress
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Overall Progress</span>
                        <span>{Math.round(progress)}%</span>
                      </div>
                      <Progress value={progress} className="h-2" />
                    </div>
                    
                    <div className="text-sm">
                      <div className="flex justify-between mb-1">
                        <span className="text-muted-foreground">Completed:</span>
                        <span className="font-medium">
                          {enrollment.completedVideos.length} / {course.videos.length}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Reward:</span>
                        <span className="font-medium text-green-600">
                          ${course.reward}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Course Content</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {course.videos.map((video, index) => {
                      const isCompleted = enrollment.completedVideos.includes(video.id);
                      const isCurrent = index === currentVideoIndex;
                      
                      return (
                        <button
                          key={video.id}
                          onClick={() => setCurrentVideoIndex(index)}
                          className={`w-full text-left p-3 rounded-lg border transition-colors ${
                            isCurrent 
                              ? 'bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800' 
                              : isCompleted
                                ? 'bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800'
                                : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className="flex-shrink-0">
                              {isCompleted ? (
                                <CheckCircle className="w-4 h-4 text-green-600" />
                              ) : isCurrent ? (
                                <Play className="w-4 h-4 text-blue-600" />
                              ) : (
                                <div className="w-4 h-4 border-2 border-gray-300 rounded-full" />
                              )}
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-medium truncate">
                                {video.title}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {Math.floor(video.duration / 60)}:{(video.duration % 60).toString().padStart(2, '0')}
                              </div>
                            </div>
                            
                            <div className="text-xs text-muted-foreground">
                              {index + 1}
                            </div>
                          </div>
                        </button>
                      );
                    })}
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
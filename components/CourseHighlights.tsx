"use client";

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { 
  Clock, 
  Users, 
  Star, 
  Play, 
  DollarSign,
  BookOpen,
  Award,
  TrendingUp
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function CourseHighlights() {
  const courses = [
    {
      id: 1,
      title: "Complete Web Development Bootcamp",
      description: "Learn HTML, CSS, JavaScript, React, and Node.js from scratch. Build real-world projects and earn while you learn.",
      instructor: "Sarah Johnson",
      duration: "45 days",
      students: 1234,
      rating: 4.9,
      reward: 20,
      difficulty: "Beginner",
      category: "Programming",
      thumbnail: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=500",
      tags: ["HTML", "CSS", "JavaScript", "React"]
    },
    {
      id: 2,
      title: "Digital Marketing Mastery",
      description: "Master social media marketing, SEO, content marketing, and analytics. Start your digital marketing career today.",
      instructor: "Mike Chen",
      duration: "30 days",
      students: 987,
      rating: 4.8,
      reward: 15,
      difficulty: "Intermediate",
      category: "Marketing",
      thumbnail: "https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=500",
      tags: ["SEO", "Social Media", "Analytics", "Content"]
    },
    {
      id: 3,
      title: "Data Science with Python",
      description: "Learn Python programming, data analysis, machine learning, and visualization. Perfect for aspiring data scientists.",
      instructor: "Dr. Emily Rodriguez",
      duration: "60 days",
      students: 756,
      rating: 4.9,
      reward: 25,
      difficulty: "Advanced",
      category: "Data Science",
      thumbnail: "https://images.pexels.com/photos/1181673/pexels-photo-1181673.jpeg?auto=compress&cs=tinysrgb&w=500",
      tags: ["Python", "ML", "Data Analysis", "Visualization"]
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100';
      case 'Advanced': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100';
    }
  };

  return (
    <section className="py-24 bg-gradient-to-br from-blue-50/50 via-white to-purple-50/50 dark:from-gray-900/50 dark:via-gray-800 dark:to-gray-900/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold mb-6"
          >
            Featured <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Courses</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-muted-foreground"
          >
            Start your learning journey with our most popular courses. Each course is designed to help you succeed.
          </motion.p>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {courses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300 group overflow-hidden">
                {/* Course Thumbnail */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={course.thumbnail} 
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className={getDifficultyColor(course.difficulty)}>
                      {course.difficulty}
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <div className="flex items-center gap-1 bg-black/70 text-white px-2 py-1 rounded-md text-sm">
                      <DollarSign className="w-3 h-3" />
                      {course.reward}
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Play className="w-12 h-12 text-white" />
                  </div>
                </div>

                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary">{course.category}</Badge>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      {course.rating}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold leading-tight group-hover:text-blue-600 transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {course.description}
                  </p>
                </CardHeader>

                <CardContent className="pt-0">
                  {/* Course Stats */}
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {course.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {course.students.toLocaleString()}
                    </div>
                  </div>

                  {/* Instructor */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                      {course.instructor.split(' ').map(n => n[0]).join('')}
                    </div>
                    <span className="text-sm font-medium">{course.instructor}</span>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {course.tags.map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>

                <CardFooter className="pt-0">
                  <div className="w-full space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-1 text-green-600 font-semibold">
                        <Award className="w-4 h-4" />
                        Earn ${course.reward} reward
                      </span>
                      <span className="text-muted-foreground">Free to start</span>
                    </div>
                    <Button className="w-full group" asChild>
                      <Link href={`/courses/${course.id}`}>
                        <BookOpen className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                        Start Learning
                      </Link>
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* View All Courses CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link href="/courses">
            <Button size="lg" variant="outline" className="group">
              <TrendingUp className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              View All Courses
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
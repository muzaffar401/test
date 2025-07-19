"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  User, 
  GraduationCap, 
  DollarSign, 
  ArrowRight, 
  BookOpen,
  Award,
  Users,
  Shield
} from 'lucide-react';
import Link from 'next/link';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

export default function GetStarted() {
  const { isSignedIn, user } = useUser();
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<string>('');
  const [formData, setFormData] = useState({
    age: '',
    grade: '',
    interests: [] as string[],
    parentEmail: '',
    parentConsent: false,
  });

  const roles = [
    {
      id: 'student',
      title: 'Student (Ages 13-18)',
      description: 'Learn new skills and earn rewards for your progress',
      icon: GraduationCap,
      color: 'from-blue-500 to-cyan-500',
      benefits: [
        'Access to 500+ free courses',
        'Earn $5-$25 per course completion',
        'Certificates for completed courses',
        'Join a community of learners',
        'Track your progress and achievements'
      ]
    },
    {
      id: 'investor',
      title: 'Investor/Donor',
      description: 'Fund student education and see the impact of your investment',
      icon: DollarSign,
      color: 'from-green-500 to-emerald-500',
      benefits: [
        'Directly impact student lives',
        'Transparent fund usage reports',
        'Tax-deductible donations',
        'Regular impact updates',
        'Community recognition'
      ]
    },
    {
      id: 'parent',
      title: 'Parent/Guardian',
      description: 'Monitor your child\'s learning progress and achievements',
      icon: Shield,
      color: 'from-purple-500 to-violet-500',
      benefits: [
        'Track your child\'s progress',
        'Receive learning reports',
        'Safe, monitored environment',
        'Educational content curation',
        'Parent community access'
      ]
    }
  ];

  const interests = [
    'Programming & Web Development',
    'Digital Marketing',
    'Data Science & Analytics',
    'Graphic Design',
    'Photography & Video',
    'Music Production',
    'Business & Entrepreneurship',
    'Language Learning',
    'Science & Math',
    'Art & Creative Writing'
  ];

  const handleInterestChange = (interest: string, checked: boolean) => {
    if (checked) {
      setFormData(prev => ({
        ...prev,
        interests: [...prev.interests, interest]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        interests: prev.interests.filter(i => i !== interest)
      }));
    }
  };

  const handleSubmit = async () => {
    if (!isSignedIn) {
      router.push('/sign-in');
      return;
    }

    // Handle role-specific registration logic here
    if (selectedRole === 'student') {
      router.push('/dashboard');
    } else if (selectedRole === 'investor') {
      router.push('/invest');
    } else if (selectedRole === 'parent') {
      router.push('/parent-dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            Join <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Save Ur Kids</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Choose your role and start your journey with us. Whether you're here to learn, invest, or support, we have a place for you.
          </p>
        </div>

        {/* Role Selection */}
        {!selectedRole && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
            {roles.map((role) => (
              <Card 
                key={role.id} 
                className="cursor-pointer hover:shadow-lg transition-all duration-300 group border-2 hover:border-blue-200 dark:hover:border-blue-800"
                onClick={() => setSelectedRole(role.id)}
              >
                <CardHeader className="text-center pb-4">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${role.color} mb-4 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                    <role.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl mb-2">{role.title}</CardTitle>
                  <CardDescription className="text-sm">{role.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {role.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-center text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3 flex-shrink-0" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full mt-6 group-hover:bg-blue-600 transition-colors">
                    Select This Role
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Student Registration Form */}
        {selectedRole === 'student' && (
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="w-6 h-6 text-blue-600" />
                Student Registration
              </CardTitle>
              <CardDescription>
                Tell us a bit about yourself to personalize your learning experience.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="age">Age</Label>
                  <Select value={formData.age} onValueChange={(value) => setFormData(prev => ({ ...prev, age: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your age" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 6 }, (_, i) => i + 13).map((age) => (
                        <SelectItem key={age} value={age.toString()}>{age} years old</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="grade">Grade Level</Label>
                  <Select value={formData.grade} onValueChange={(value) => setFormData(prev => ({ ...prev, grade: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your grade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="8">8th Grade</SelectItem>
                      <SelectItem value="9">9th Grade</SelectItem>
                      <SelectItem value="10">10th Grade</SelectItem>
                      <SelectItem value="11">11th Grade</SelectItem>
                      <SelectItem value="12">12th Grade</SelectItem>
                      <SelectItem value="college">College</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label>Areas of Interest (Select up to 3)</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                  {interests.map((interest) => (
                    <div key={interest} className="flex items-center space-x-2">
                      <Checkbox
                        id={interest}
                        checked={formData.interests.includes(interest)}
                        onCheckedChange={(checked) => handleInterestChange(interest, checked as boolean)}
                        disabled={formData.interests.length >= 3 && !formData.interests.includes(interest)}
                      />
                      <Label htmlFor={interest} className="text-sm">{interest}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="parentEmail">Parent/Guardian Email (Required for under 18)</Label>
                <Input
                  id="parentEmail"
                  type="email"
                  placeholder="parent@example.com"
                  value={formData.parentEmail}
                  onChange={(e) => setFormData(prev => ({ ...prev, parentEmail: e.target.value }))}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="parentConsent"
                  checked={formData.parentConsent}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, parentConsent: checked as boolean }))}
                />
                <Label htmlFor="parentConsent" className="text-sm">
                  I have my parent/guardian's permission to join Save Ur Kids
                </Label>
              </div>

              <div className="flex gap-4 pt-4">
                <Button variant="outline" onClick={() => setSelectedRole('')} className="flex-1">
                  Back
                </Button>
                <Button onClick={handleSubmit} className="flex-1">
                  Complete Registration
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Investor Registration */}
        {selectedRole === 'investor' && (
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-6 h-6 text-green-600" />
                Investor Registration
              </CardTitle>
              <CardDescription>
                Join our mission to provide free education and meaningful rewards to students worldwide.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg">
                <h3 className="font-semibold text-green-800 dark:text-green-200 mb-2">Your Investment Impact</h3>
                <ul className="space-y-1 text-sm text-green-700 dark:text-green-300">
                  <li>• $100 funds 5 course completions</li>
                  <li>• $500 sponsors 25 students</li>
                  <li>• $1000 supports an entire classroom</li>
                </ul>
              </div>

              <div className="text-center">
                <p className="text-muted-foreground mb-4">
                  Ready to make a difference in students' lives?
                </p>
                <div className="flex gap-4">
                  <Button variant="outline" onClick={() => setSelectedRole('')} className="flex-1">
                    Back
                  </Button>
                  <Button onClick={() => router.push('/invest')} className="flex-1 bg-green-600 hover:bg-green-700">
                    Start Investing
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Parent Registration */}
        {selectedRole === 'parent' && (
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-6 h-6 text-purple-600" />
                Parent/Guardian Registration
              </CardTitle>
              <CardDescription>
                Create an account to monitor and support your child's learning journey.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg">
                <h3 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">Parent Benefits</h3>
                <ul className="space-y-1 text-sm text-purple-700 dark:text-purple-300">
                  <li>• Real-time progress tracking</li>
                  <li>• Weekly learning reports</li>
                  <li>• Safe, monitored environment</li>
                  <li>• Direct communication with instructors</li>
                </ul>
              </div>

              <div className="text-center">
                <p className="text-muted-foreground mb-4">
                  Help your child succeed in their educational journey.
                </p>
                <div className="flex gap-4">
                  <Button variant="outline" onClick={() => setSelectedRole('')} className="flex-1">
                    Back
                  </Button>
                  <Button onClick={handleSubmit} className="flex-1 bg-purple-600 hover:bg-purple-700">
                    Create Parent Account
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Trust Indicators */}
        <div className="flex flex-wrap justify-center gap-8 mt-16 text-center">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Users className="w-5 h-5" />
            <span className="text-sm">10,000+ Active Students</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Award className="w-5 h-5" />
            <span className="text-sm">$50,000+ Rewards Distributed</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <BookOpen className="w-5 h-5" />
            <span className="text-sm">500+ Quality Courses</span>
          </div>
        </div>
      </div>
    </div>
  );
}
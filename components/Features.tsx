"use client";

import { 
  BookOpen, 
  Trophy, 
  DollarSign, 
  Users, 
  Shield, 
  Clock,
  Target,
  Heart,
  Lightbulb
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function Features() {
  const features = [
    {
      icon: BookOpen,
      title: "100% Free Courses",
      description: "Access high-quality educational content without any upfront costs. All courses are completely free for students.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: DollarSign,
      title: "Real Cash Rewards",
      description: "Earn actual money ($5-$20) for completing courses and passing challenges. Get rewarded for your dedication to learning.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Trophy,
      title: "Challenge System",
      description: "Compete with other students in exciting challenges. Winners receive special rewards and recognition.",
      color: "from-purple-500 to-violet-500"
    },
    {
      icon: Clock,
      title: "Time-Based Learning",
      description: "Complete courses within set timeframes to maximize your rewards. Structured learning keeps you motivated.",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: Target,
      title: "Progress Tracking",
      description: "Monitor your learning journey with detailed progress reports. See how far you've come and what's next.",
      color: "from-pink-500 to-rose-500"
    },
    {
      icon: Users,
      title: "Community Support",
      description: "Join a community of learners and get help when you need it. Learn together, grow together.",
      color: "from-indigo-500 to-blue-500"
    },
    {
      icon: Shield,
      title: "Safe Environment",
      description: "Protect kids from harmful content and distractions. Focus on learning in a secure, monitored environment.",
      color: "from-teal-500 to-cyan-500"
    },
    {
      icon: Heart,
      title: "Parent Involvement",
      description: "Parents can track their children's progress and see the positive impact on their education journey.",
      color: "from-red-500 to-pink-500"
    },
    {
      icon: Lightbulb,
      title: "Curated Content",
      description: "All content is carefully selected and reviewed to ensure the highest quality educational experience.",
      color: "from-yellow-500 to-orange-500"
    }
  ];

  return (
    <section className="py-24 bg-background">
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
            Why Choose <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Save Ur Kids</span>?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-muted-foreground"
          >
            We're revolutionizing education by making it free, rewarding, and engaging for the next generation.
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div className="h-full p-8 rounded-2xl border bg-card hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} mb-6`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold mb-4 text-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover Effect Background */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 rounded-full text-sm font-medium text-muted-foreground mb-4">
            <Trophy className="w-4 h-4" />
            Join thousands of successful students
          </div>
        </motion.div>
      </div>
    </section>
  );
}
"use client";

import { motion } from 'framer-motion';
import { Users, DollarSign, BookOpen, Award, TrendingUp, Globe } from 'lucide-react';

export default function Stats() {
  const stats = [
    {
      icon: Users,
      value: "10,000+",
      label: "Active Students",
      description: "Students currently learning and earning rewards"
    },
    {
      icon: DollarSign,
      value: "$50,000+",
      label: "Rewards Distributed",
      description: "Total rewards earned by our students"
    },
    {
      icon: BookOpen,
      value: "500+",
      label: "Quality Courses",
      description: "Carefully curated educational content"
    },
    {
      icon: Award,
      value: "25,000+",
      label: "Certificates Earned",
      description: "Students who completed their courses"
    },
    {
      icon: TrendingUp,
      value: "95%",
      label: "Success Rate",
      description: "Students who complete their first course"
    },
    {
      icon: Globe,
      value: "50+",
      label: "Countries",
      description: "Students learning from around the world"
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
            Our <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Impact</span> So Far
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-muted-foreground"
          >
            See how we're making a difference in students' lives worldwide through free education and meaningful rewards.
          </motion.p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="text-center p-8 rounded-2xl border bg-card hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                {/* Icon */}
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 mb-6 group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>

                {/* Value */}
                <motion.div
                  initial={{ scale: 0.5 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
                  viewport={{ once: true }}
                  className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2"
                >
                  {stat.value}
                </motion.div>

                {/* Label */}
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {stat.label}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {stat.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950 rounded-full text-sm font-medium text-muted-foreground">
            <TrendingUp className="w-4 h-4 text-green-600" />
            Growing every day with new students and success stories
          </div>
        </motion.div>
      </div>
    </section>
  );
}
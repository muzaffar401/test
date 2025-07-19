"use client";

import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, DollarSign, BookOpen, Users } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function CTA() {
  const benefits = [
    { icon: BookOpen, text: "100% Free Courses" },
    { icon: DollarSign, text: "Real Cash Rewards" },
    { icon: Users, text: "Supportive Community" },
    { icon: Sparkles, text: "Proven Success" },
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-blue-600 to-purple-700 text-white overflow-hidden relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full -translate-x-20 -translate-y-20" />
        <div className="absolute top-20 right-10 w-24 h-24 bg-white rounded-full" />
        <div className="absolute bottom-10 left-10 w-32 h-32 bg-white rounded-full" />
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-white rounded-full translate-x-24 translate-y-24" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Join thousands of successful students
            </div>
            
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Start Your Learning Journey Today
            </h2>
            
            <p className="text-xl sm:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Don't wait to secure your future. Join Save Ur Kids and start earning while you learn valuable skills that will last a lifetime.
            </p>
          </motion.div>

          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          >
            {benefits.map((benefit, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-3">
                  <benefit.icon className="w-6 h-6" />
                </div>
                <span className="text-sm font-medium">{benefit.text}</span>
              </div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
          >
            <Link href="/get-started">
              <Button size="lg" className="w-full sm:w-auto bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg font-semibold">
                Get Started for Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            
            <Link href="/invest">
              <Button variant="outline" size="lg" className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg font-semibold">
                Invest in Education
              </Button>
            </Link>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row items-center justify-center gap-8 text-blue-100 text-sm"
          >
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>10,000+ Active Students</span>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              <span>$50,000+ Rewards Distributed</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span>95% Success Rate</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
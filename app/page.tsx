"use client";

import Hero from '@/components/Hero';
import Features from '@/components/Features';
import CourseHighlights from '@/components/CourseHighlights';
import Stats from '@/components/Stats';
import Testimonials from '@/components/Testimonials';
import CTA from '@/components/CTA';

export default function Home() {
  return (
    <div className="space-y-0">
      <Hero />
      <Features />
      <CourseHighlights />
      <Stats />
      <Testimonials />
      <CTA />
    </div>
  );
}
"use client";

import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Star, Quote } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: "Emma Thompson",
      age: 16,
      location: "California, USA",
      course: "Web Development",
      earned: 20,
      rating: 5,
      content: "I never thought I could learn programming for free and actually get paid for it! Save Ur Kids changed my life. I'm now building my own websites and have earned $60 so far.",
      avatar: "https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=100"
    },
    {
      id: 2,
      name: "Marcus Johnson",
      age: 14,
      location: "Texas, USA",
      course: "Digital Marketing",
      earned: 15,
      rating: 5,
      content: "My parents are so proud of me! I used to spend hours playing games, but now I'm learning digital marketing and earning money. The platform keeps me motivated every day.",
      avatar: "https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=100"
    },
    {
      id: 3,
      name: "Sophia Chen",
      age: 17,
      location: "New York, USA",
      course: "Data Science",
      earned: 25,
      rating: 5,
      content: "The Data Science course was challenging but so rewarding! I learned Python and machine learning, and the $25 reward motivated me to finish. Now I'm applying to computer science programs.",
      avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100"
    },
    {
      id: 4,
      name: "David Rodriguez",
      age: 15,
      location: "Florida, USA",
      course: "Photography",
      earned: 12,
      rating: 5,
      content: "I discovered my passion for photography through Save Ur Kids. The course was amazing and earning $12 for learning something I love was incredible. Thank you!",
      avatar: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100"
    },
    {
      id: 5,
      name: "Aisha Patel",
      age: 16,
      location: "Illinois, USA",
      course: "Graphic Design",
      earned: 18,
      rating: 5,
      content: "As someone who loves art, the graphic design course was perfect for me. I learned Adobe tools and earned $18. My portfolio has grown so much thanks to this platform!",
      avatar: "https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg?auto=compress&cs=tinysrgb&w=100"
    },
    {
      id: 6,
      name: "Ryan Williams",
      age: 14,
      location: "Georgia, USA",
      course: "Music Production",
      earned: 15,
      rating: 5,
      content: "I'm obsessed with music and this platform helped me learn how to produce beats! The instructors are amazing and getting paid $15 for learning was the best surprise ever.",
      avatar: "https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=100"
    }
  ];

  const parentTestimonials = [
    {
      id: 1,
      name: "Jennifer Thompson",
      relation: "Emma's Mother",
      content: "Save Ur Kids has been a blessing for our family. Emma used to be glued to her phone playing games, but now she's passionate about learning. We've seen such positive changes in her attitude and focus.",
      avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100"
    },
    {
      id: 2,
      name: "Michael Johnson",
      relation: "Marcus's Father",
      content: "I was skeptical at first, but this platform has exceeded all expectations. Marcus is more motivated than ever, and the fact that he's earning money while learning valuable skills is amazing.",
      avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100"
    }
  ];

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
            What Our <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Students</span> Say
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-muted-foreground"
          >
            Real stories from real students who are building their future while earning rewards.
          </motion.p>
        </div>

        {/* Student Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300 group">
                <CardContent className="p-6">
                  {/* Quote Icon */}
                  <Quote className="w-8 h-8 text-blue-500/20 mb-4" />

                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  {/* Content */}
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    "{testimonial.content}"
                  </p>

                  {/* Student Info */}
                  <div className="flex items-center gap-3 mb-4">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                      <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold text-foreground">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">
                        Age {testimonial.age} • {testimonial.location}
                      </div>
                    </div>
                  </div>

                  {/* Course and Earnings */}
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary">{testimonial.course}</Badge>
                    <div className="text-sm font-semibold text-green-600">
                      Earned ${testimonial.earned}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Parent Testimonials Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h3 className="text-2xl font-bold mb-2">What Parents Are Saying</h3>
          <p className="text-muted-foreground">Parents love seeing their children motivated and learning valuable skills.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {parentTestimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <Quote className="w-8 h-8 text-purple-500/20 mb-4" />
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                      <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold text-foreground">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.relation}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
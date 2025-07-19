"use client";

import { useState } from 'react';
import { useQuery, useMutation } from 'convex/react';
import { useUser } from '@clerk/nextjs';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  DollarSign, 
  Users, 
  TrendingUp, 
  Heart,
  BookOpen,
  Award,
  Target,
  PieChart
} from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from '@/hooks/use-toast';

export default function InvestPage() {
  const { user } = useUser();
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalInvestments = useQuery(api.investments.getTotalInvestments);
  const allInvestments = useQuery(api.investments.getAllInvestments);
  const allStudents = useQuery(api.users.getAllStudents);

  const createInvestment = useMutation(api.investments.createInvestment);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Please sign in",
        description: "You need to be signed in to make an investment.",
        variant: "destructive",
      });
      return;
    }

    if (!amount || parseFloat(amount) < 10) {
      toast({
        title: "Invalid amount",
        description: "Minimum investment amount is $10.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await createInvestment({
        investorId: user.id as Id<"users">,
        amount: parseFloat(amount),
        currency: 'USD',
        purpose: 'Student Education Fund',
        message: message || undefined,
      });

      toast({
        title: "Investment submitted!",
        description: "Thank you for supporting student education. Your investment is being processed.",
      });

      setAmount('');
      setMessage('');
    } catch (error) {
      toast({
        title: "Investment failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const impactStats = [
    {
      title: "Total Invested",
      value: `$${totalInvestments?.toLocaleString() || '0'}`,
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-100 dark:bg-green-900"
    },
    {
      title: "Students Supported",
      value: allStudents?.length.toLocaleString() || '0',
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-100 dark:bg-blue-900"
    },
    {
      title: "Courses Funded",
      value: "50+",
      icon: BookOpen,
      color: "text-purple-600",
      bgColor: "bg-purple-100 dark:bg-purple-900"
    },
    {
      title: "Success Rate",
      value: "95%",
      icon: TrendingUp,
      color: "text-orange-600",
      bgColor: "bg-orange-100 dark:bg-orange-900"
    }
  ];

  const investmentTiers = [
    {
      name: "Supporter",
      amount: "$25",
      description: "Fund 1-2 course completions",
      benefits: [
        "Monthly impact report",
        "Thank you certificate",
        "Community recognition"
      ]
    },
    {
      name: "Advocate",
      amount: "$100",
      description: "Support 5-8 students",
      benefits: [
        "Quarterly video updates",
        "Student success stories",
        "Investor community access",
        "Tax deduction receipt"
      ]
    },
    {
      name: "Champion",
      amount: "$500",
      description: "Sponsor an entire classroom",
      benefits: [
        "Direct student testimonials",
        "Annual impact presentation",
        "Priority support access",
        "Custom impact dashboard"
      ]
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
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            Invest in the <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Future</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Your investment directly funds student education and creates opportunities for the next generation. 
            See the real impact of your contribution with transparent reporting and student success stories.
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Heart className="w-4 h-4 text-red-500" />
            <span>100% of your investment goes directly to student rewards</span>
          </div>
        </motion.div>

        {/* Impact Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {impactStats.map((stat, index) => (
            <Card key={index} className="text-center">
              <CardContent className="p-6">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${stat.bgColor} mb-4`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div className="text-3xl font-bold mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.title}</div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Investment Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Make an Investment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="amount">Investment Amount (USD)</Label>
                    <div className="relative mt-1">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="amount"
                        type="number"
                        min="10"
                        step="1"
                        placeholder="100"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Minimum investment: $10
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="message">Message (Optional)</Label>
                    <Textarea
                      id="message"
                      placeholder="Share why you're investing in student education..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={4}
                    />
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                      Your Impact
                    </h4>
                    {amount && parseFloat(amount) >= 10 && (
                      <div className="text-sm text-blue-700 dark:text-blue-300">
                        <p>• Fund approximately {Math.floor(parseFloat(amount) / 15)} course completions</p>
                        <p>• Support {Math.floor(parseFloat(amount) / 25)} students directly</p>
                        <p>• Contribute to our 95% student success rate</p>
                      </div>
                    )}
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isSubmitting || !amount || parseFloat(amount) < 10}
                  >
                    {isSubmitting ? 'Processing...' : 'Invest Now'}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    Your investment is secure and tax-deductible. You'll receive a receipt and impact reports.
                  </p>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Investment Tiers */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-2xl font-bold mb-4">Investment Tiers</h2>
              <p className="text-muted-foreground mb-6">
                Choose an investment level that works for you. Every contribution makes a difference.
              </p>
            </div>

            {investmentTiers.map((tier, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold">{tier.name}</h3>
                      <p className="text-muted-foreground">{tier.description}</p>
                    </div>
                    <div className="text-2xl font-bold text-green-600">
                      {tier.amount}
                    </div>
                  </div>
                  
                  <ul className="space-y-2">
                    {tier.benefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="flex items-center gap-2 text-sm">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    variant="outline" 
                    className="w-full mt-4"
                    onClick={() => setAmount(tier.amount.replace('$', ''))}
                  >
                    Select {tier.name}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        </div>

        {/* Recent Investments */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="w-5 h-5" />
                Recent Investments
              </CardTitle>
            </CardHeader>
            <CardContent>
              {allInvestments && allInvestments.length > 0 ? (
                <div className="space-y-4">
                  {allInvestments.slice(0, 10).map((investment) => (
                    <div
                      key={investment._id}
                      className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                          {investment.investor?.name?.charAt(0) || 'A'}
                        </div>
                        <div>
                          <div className="font-medium">
                            {investment.investor?.name || 'Anonymous'}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {new Date(investment.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-green-600">
                          ${investment.amount}
                        </div>
                        <Badge 
                          variant={investment.status === 'confirmed' ? 'default' : 'secondary'}
                          className="text-xs"
                        >
                          {investment.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <DollarSign className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Be the first investor!</h3>
                  <p className="text-muted-foreground">
                    Start the movement by making the first investment in student education.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    clerkId: v.string(),
    email: v.string(),
    name: v.string(),
    role: v.union(v.literal("student"), v.literal("admin"), v.literal("investor")),
    credits: v.number(),
    totalRewards: v.number(),
    joinedAt: v.number(),
  }).index("by_clerk_id", ["clerkId"]),

  courses: defineTable({
    title: v.string(),
    description: v.string(),
    instructor: v.string(),
    youtubePlaylistId: v.string(),
    videos: v.array(v.object({
      id: v.string(),
      title: v.string(),
      videoId: v.string(),
      duration: v.number(),
      order: v.number(),
    })),
    difficulty: v.union(v.literal("beginner"), v.literal("intermediate"), v.literal("advanced")),
    reward: v.number(),
    timeLimit: v.number(), // in days
    category: v.string(),
    tags: v.array(v.string()),
    isActive: v.boolean(),
    enrollmentCount: v.number(),
    createdAt: v.number(),
  }),

  enrollments: defineTable({
    userId: v.id("users"),
    courseId: v.id("courses"),
    progress: v.number(), // percentage
    currentVideoIndex: v.number(),
    completedVideos: v.array(v.string()),
    quizScores: v.array(v.object({
      videoId: v.string(),
      score: v.number(),
      attempts: v.number(),
    })),
    startedAt: v.number(),
    completedAt: v.optional(v.number()),
    deadline: v.number(),
    isCompleted: v.boolean(),
    finalScore: v.optional(v.number()),
    rewardClaimed: v.boolean(),
  })
    .index("by_user", ["userId"])
    .index("by_course", ["courseId"])
    .index("by_user_course", ["userId", "courseId"]),

  quizzes: defineTable({
    courseId: v.id("courses"),
    videoId: v.string(),
    questions: v.array(v.object({
      id: v.string(),
      question: v.string(),
      options: v.array(v.string()),
      correctAnswer: v.number(),
      explanation: v.string(),
    })),
    passingScore: v.number(),
  })
    .index("by_course", ["courseId"])
    .index("by_video", ["videoId"]),

  investments: defineTable({
    investorId: v.id("users"),
    amount: v.number(),
    currency: v.string(),
    status: v.union(v.literal("pending"), v.literal("confirmed"), v.literal("failed")),
    transactionId: v.optional(v.string()),
    purpose: v.string(),
    message: v.optional(v.string()),
    createdAt: v.number(),
  }).index("by_investor", ["investorId"]),

  rewards: defineTable({
    studentId: v.id("users"),
    courseId: v.id("courses"),
    enrollmentId: v.id("enrollments"),
    amount: v.number(),
    type: v.union(v.literal("course_completion"), v.literal("challenge_win"), v.literal("bonus")),
    status: v.union(v.literal("pending"), v.literal("distributed"), v.literal("failed")),
    distributedAt: v.optional(v.number()),
    createdAt: v.number(),
  })
    .index("by_student", ["studentId"])
    .index("by_course", ["courseId"]),
});
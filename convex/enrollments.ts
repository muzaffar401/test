import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const enrollInCourse = mutation({
  args: {
    userId: v.id("users"),
    courseId: v.id("courses"),
  },
  handler: async (ctx, args) => {
    const course = await ctx.db.get(args.courseId);
    if (!course) throw new Error("Course not found");

    const existing = await ctx.db
      .query("enrollments")
      .withIndex("by_user_course", (q) => 
        q.eq("userId", args.userId).eq("courseId", args.courseId)
      )
      .first();

    if (existing) throw new Error("Already enrolled in this course");

    const deadline = Date.now() + (course.timeLimit * 24 * 60 * 60 * 1000);

    await ctx.db.patch(args.courseId, {
      enrollmentCount: course.enrollmentCount + 1,
    });

    return await ctx.db.insert("enrollments", {
      userId: args.userId,
      courseId: args.courseId,
      progress: 0,
      currentVideoIndex: 0,
      completedVideos: [],
      quizScores: [],
      startedAt: Date.now(),
      deadline,
      isCompleted: false,
      rewardClaimed: false,
    });
  },
});

export const getUserEnrollments = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const enrollments = await ctx.db
      .query("enrollments")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();

    const enrichedEnrollments = await Promise.all(
      enrollments.map(async (enrollment) => {
        const course = await ctx.db.get(enrollment.courseId);
        return { ...enrollment, course };
      })
    );

    return enrichedEnrollments;
  },
});

export const updateProgress = mutation({
  args: {
    enrollmentId: v.id("enrollments"),
    videoId: v.string(),
    quizScore: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const enrollment = await ctx.db.get(args.enrollmentId);
    if (!enrollment) throw new Error("Enrollment not found");

    const course = await ctx.db.get(enrollment.courseId);
    if (!course) throw new Error("Course not found");

    const updatedCompletedVideos = [...enrollment.completedVideos];
    if (!updatedCompletedVideos.includes(args.videoId)) {
      updatedCompletedVideos.push(args.videoId);
    }

    const updatedQuizScores = [...enrollment.quizScores];
    if (args.quizScore !== undefined) {
      const existingScoreIndex = updatedQuizScores.findIndex(s => s.videoId === args.videoId);
      if (existingScoreIndex >= 0) {
        updatedQuizScores[existingScoreIndex] = {
          ...updatedQuizScores[existingScoreIndex],
          score: Math.max(updatedQuizScores[existingScoreIndex].score, args.quizScore),
          attempts: updatedQuizScores[existingScoreIndex].attempts + 1,
        };
      } else {
        updatedQuizScores.push({
          videoId: args.videoId,
          score: args.quizScore,
          attempts: 1,
        });
      }
    }

    const progress = (updatedCompletedVideos.length / course.videos.length) * 100;
    const isCompleted = progress >= 100;

    await ctx.db.patch(args.enrollmentId, {
      completedVideos: updatedCompletedVideos,
      quizScores: updatedQuizScores,
      progress,
      isCompleted,
      completedAt: isCompleted ? Date.now() : undefined,
    });

    if (isCompleted && !enrollment.rewardClaimed) {
      await ctx.db.insert("rewards", {
        studentId: enrollment.userId,
        courseId: enrollment.courseId,
        enrollmentId: args.enrollmentId,
        amount: course.reward,
        type: "course_completion",
        status: "pending",
        createdAt: Date.now(),
      });
    }
  },
});
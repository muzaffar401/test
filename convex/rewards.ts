import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getPendingRewards = query({
  args: {},
  handler: async (ctx) => {
    const rewards = await ctx.db
      .query("rewards")
      .filter((q) => q.eq(q.field("status"), "pending"))
      .collect();

    const enrichedRewards = await Promise.all(
      rewards.map(async (reward) => {
        const student = await ctx.db.get(reward.studentId);
        const course = await ctx.db.get(reward.courseId);
        return { ...reward, student, course };
      })
    );

    return enrichedRewards;
  },
});

export const distributeReward = mutation({
  args: {
    rewardId: v.id("rewards"),
  },
  handler: async (ctx, args) => {
    const reward = await ctx.db.get(args.rewardId);
    if (!reward) throw new Error("Reward not found");

    // Update reward status
    await ctx.db.patch(args.rewardId, {
      status: "distributed",
      distributedAt: Date.now(),
    });

    // Update user credits
    const user = await ctx.db.get(reward.studentId);
    if (user) {
      await ctx.db.patch(reward.studentId, {
        credits: user.credits + reward.amount,
        totalRewards: user.totalRewards + reward.amount,
      });
    }

    // Update enrollment
    await ctx.db.patch(reward.enrollmentId, {
      rewardClaimed: true,
    });
  },
});

export const getStudentRewards = query({
  args: { studentId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("rewards")
      .withIndex("by_student", (q) => q.eq("studentId", args.studentId))
      .collect();
  },
});
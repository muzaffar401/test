import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getUserByClerkId = query({
  args: { clerkId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .first();
  },
});

export const createUser = mutation({
  args: {
    clerkId: v.string(),
    email: v.string(),
    name: v.string(),
    role: v.union(v.literal("student"), v.literal("admin"), v.literal("investor")),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("users", {
      ...args,
      credits: 0,
      totalRewards: 0,
      joinedAt: Date.now(),
    });
  },
});

export const updateUserCredits = mutation({
  args: {
    userId: v.id("users"),
    amount: v.number(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db.get(args.userId);
    if (!user) throw new Error("User not found");

    await ctx.db.patch(args.userId, {
      credits: user.credits + args.amount,
      totalRewards: user.totalRewards + Math.max(0, args.amount),
    });
  },
});

export const getAllStudents = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("role"), "student"))
      .collect();
  },
});

export const getAllInvestors = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("role"), "investor"))
      .collect();
  },
});
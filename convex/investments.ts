import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const createInvestment = mutation({
  args: {
    investorId: v.id("users"),
    amount: v.number(),
    currency: v.string(),
    purpose: v.string(),
    message: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("investments", {
      ...args,
      status: "pending",
      createdAt: Date.now(),
    });
  },
});

export const getAllInvestments = query({
  args: {},
  handler: async (ctx) => {
    const investments = await ctx.db.query("investments").collect();
    
    const enrichedInvestments = await Promise.all(
      investments.map(async (investment) => {
        const investor = await ctx.db.get(investment.investorId);
        return { ...investment, investor };
      })
    );

    return enrichedInvestments;
  },
});

export const updateInvestmentStatus = mutation({
  args: {
    investmentId: v.id("investments"),
    status: v.union(v.literal("pending"), v.literal("confirmed"), v.literal("failed")),
    transactionId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { investmentId, ...updates } = args;
    await ctx.db.patch(investmentId, updates);
  },
});

export const getTotalInvestments = query({
  args: {},
  handler: async (ctx) => {
    const investments = await ctx.db
      .query("investments")
      .filter((q) => q.eq(q.field("status"), "confirmed"))
      .collect();

    return investments.reduce((total, investment) => total + investment.amount, 0);
  },
});
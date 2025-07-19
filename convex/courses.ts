import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getAllCourses = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("courses")
      .filter((q) => q.eq(q.field("isActive"), true))
      .collect();
  },
});

export const getCourseById = query({
  args: { courseId: v.id("courses") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.courseId);
  },
});

export const createCourse = mutation({
  args: {
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
    timeLimit: v.number(),
    category: v.string(),
    tags: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("courses", {
      ...args,
      isActive: true,
      enrollmentCount: 0,
      createdAt: Date.now(),
    });
  },
});

export const updateCourse = mutation({
  args: {
    courseId: v.id("courses"),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    instructor: v.optional(v.string()),
    reward: v.optional(v.number()),
    isActive: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const { courseId, ...updates } = args;
    await ctx.db.patch(courseId, updates);
  },
});

export const searchCourses = query({
  args: { searchTerm: v.string() },
  handler: async (ctx, args) => {
    const courses = await ctx.db
      .query("courses")
      .filter((q) => q.eq(q.field("isActive"), true))
      .collect();

    return courses.filter(course => 
      course.title.toLowerCase().includes(args.searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(args.searchTerm.toLowerCase()) ||
      course.category.toLowerCase().includes(args.searchTerm.toLowerCase()) ||
      course.tags.some(tag => tag.toLowerCase().includes(args.searchTerm.toLowerCase()))
    );
  },
});
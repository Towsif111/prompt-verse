"use client";

import { motion } from "framer-motion";
import { Button, Input } from "@heroui/react";

const trendingTags = [
  "#AI Productivity",
  "#Creative Automation",
  "#Prompt Engineering",
  "#Generative Design",
  "#Workflow Optimization",
];

export default function HeroSection() {
  return (
    <section className="relative flex flex-col items-center justify-center text-center py-24 md:py-32 bg-white text-gray-900">
      {/* Headline */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold leading-tight mb-4">
          Supercharge your <span className="text-red-500">AI workflow</span>
        </h1>
        <p className="text-gray-600 text-base sm:text-lg md:text-xl mt-4">
          Discover, search, and explore prompts that boost creativity and productivity.
        </p>
      </motion.div>

      {/* Search Bar + Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="mt-8 w-full max-w-lg px-4 flex gap-2"
      >
        <Input
          placeholder="Search prompts..."
          className="w-full rounded-lg bg-gray-100 text-gray-900 border border-gray-300"
        />
        <Button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition">
          Search
        </Button>
      </motion.div>

      {/* Trending Tags */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="flex flex-col items-center mt-6 px-4"
      >
        <span className="text-gray-500 text-sm mb-2">Trending:</span>
        <div className="flex flex-wrap justify-center gap-3">
          {trendingTags.map((tag, index) => (
            <span
              key={index}
              className="px-4 py-2 bg-red-500 text-white rounded-full text-sm hover:bg-red-600 transition"
            >
              {tag}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Call-to-Action Button */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        className="mt-10"
      >
        <Button
          as={"a"}
          href="#all-prompts"
          className="bg-red-500 text-white font-semibold px-6 py-3 rounded-lg hover:bg-red-600 transition-all"
        >
          Explore Prompts
        </Button>
      </motion.div>
    </section>
  );
}

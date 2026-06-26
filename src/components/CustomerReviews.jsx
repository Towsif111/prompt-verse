"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const customerReviews = [
  {
    id: 1,
    userName: "Fahim Ahmed",
    rating: 5,
    comment: "Amazing prompt quality. I use it daily for client work.",
  },
  {
    id: 2,
    userName: "Jannatul Ferdaus",
    rating: 4,
    comment: "Very clean UI and the bookmark feature is super useful.",
  },
  {
    id: 3,
    userName: "Sajid Hasan",
    rating: 5,
    comment: "Premium prompts are worth it. Helped me automate many tasks.",
  },
];

export default function CustomerReviewsSection() {
  return (
    <section className="container-shell py-16 transition-colors duration-300" style={{ background: 'linear-gradient(to bottom, var(--color-bg), color-mix(in srgb, var(--color-bg) 95%, slate))' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-sm font-bold uppercase tracking-[0.35em] text-cyan-600 text-center">
          Testimonials
        </p>
        <h2 className="text-4xl font-black text-center mb-2 bg-gradient-to-r from-cyan-600 to-indigo-600 bg-clip-text text-transparent">
          What Our Users Say
        </h2>          <p className="text-center mb-10" style={{ color: 'var(--color-text-secondary)' }}>
          Hear from our community of creators and prompt enthusiasts
        </p>
      </motion.div>

      <div className="mx-auto max-w-5xl grid md:grid-cols-3 gap-6">
        {customerReviews.map((review, index) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.08 }}
            viewport={{ once: true }}
            className="group relative rounded-2xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-center" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface)' }}
          >
            {}
            <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-cyan-100 text-cyan-600">
              <Quote size={18} />
            </div>

            {}
            <div className="flex items-center justify-center gap-0.5 mb-3">
              {Array.from({ length: 5 }, (_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={i < review.rating ? "fill-amber-400 text-amber-400" : "fill-slate-200 text-slate-200"}
                />
              ))}
            </div>

            {}
            <p className="text-sm leading-relaxed mb-4 italic" style={{ color: 'var(--color-text-secondary)' }}>
              &ldquo;{review.comment}&rdquo;
            </p>

            {}
            <div className="mx-auto flex items-center justify-center gap-2 border-t pt-3" style={{ borderColor: 'var(--color-border-light)' }}>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-indigo-500 text-white text-xs font-bold">
                {review.userName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()
                  .slice(0, 2)}
              </div>
              <span className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>
                {review.userName}
              </span>
            </div>

            {}
            <div className="absolute bottom-0 left-0 right-0 h-1 w-0 bg-gradient-to-r from-cyan-400 to-indigo-500 transition-all duration-300 group-hover:w-full rounded-b-2xl" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
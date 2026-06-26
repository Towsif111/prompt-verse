"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What is PromptVerse?",
    answer: "PromptVerse is a platform where users can share and discover AI prompts. Browse hundreds of curated prompts across categories like content writing, programming, design, marketing, and more.",
  },
  {
    question: "Can I create my own prompts?",
    answer: "Yes, registered users can create and share their own prompts with the community. Sign up for a free account and start contributing today.",
  },
  {
    question: "Is PromptVerse free?",
    answer: "Yes, users can browse, search, and share prompts for free. Premium features and advanced analytics are available for power users.",
  },
  {
    question: "How are creators ranked?",
    answer: "Creators are ranked based on their total prompt count, average rating, and number of copies their prompts receive. The more quality prompts you share, the higher you rank.",
  },
  {
    question: "Can I save my favorite prompts?",
    answer: "Absolutely! Registered users can bookmark prompts for quick access later. Simply click the bookmark icon on any prompt card.",
  },
];

export default function FaqSection() {
  return (
    <section className="container-shell py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-sm font-bold uppercase tracking-[0.35em] text-cyan-600 text-center">
          Got questions?
        </p>
        <h2 className="text-4xl font-black text-center mb-2 bg-gradient-to-r from-cyan-600 to-indigo-600 bg-clip-text text-transparent">
          Frequently Asked Questions
        </h2>          <p className="text-center mb-10" style={{ color: 'var(--color-text-secondary)' }}>
          Everything you need to know about PromptVerse
        </p>
      </motion.div>

      <div className="mx-auto max-w-3xl space-y-3">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
          >
            <details className="group rounded-xl p-5 shadow-sm transition hover:shadow-md open:shadow-md" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface)' }}>
              <summary className="flex cursor-pointer items-center justify-between font-semibold list-none" style={{ color: 'var(--color-text)' }}>
                {faq.question}
                <ChevronDown
                  size={18}
                  className="shrink-0 text-slate-400 transition duration-200 group-open:rotate-180"
                />
              </summary>
              <p className="mt-3 text-sm leading-relaxed border-t pt-3" style={{ color: 'var(--color-text-secondary)', borderColor: 'var(--color-border-light)' }}>
                {faq.answer}
              </p>
            </details>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
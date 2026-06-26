"use client";

import { motion } from "framer-motion";
import { FileText, Users, FolderOpen, CopyCheck } from "lucide-react";

const statIcons = [FileText, Users, FolderOpen, CopyCheck];

export default function PlatformStats({ stats }) {
  const items = [
    { value: stats.totalPrompts, label: "Total Prompts" },
    { value: stats.totalCreators, label: "Creators" },
    { value: stats.totalCategories, label: "Categories" },
    { value: stats.totalCopies, label: "Total Copies" },
  ];

  return (
    <section className="container-shell py-16 transition-colors duration-300" style={{ background: 'linear-gradient(to right, color-mix(in srgb, var(--color-bg) 90%, cyan), var(--color-bg), color-mix(in srgb, var(--color-bg) 90%, indigo))' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold text-center mb-2">
          PromptVerse in Numbers
        </h2>
        <p className="text-center mb-10" style={{ color: 'var(--color-text-secondary)' }}>
          Our growing community at a glance
        </p>
      </motion.div>

      <div className="grid md:grid-cols-4 gap-6 text-center">
        {items.map((item, index) => {
          const Icon = statIcons[index];
          return (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.4 }}
              className="group rounded-2xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface)' }}
            >
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-indigo-500 text-white shadow-md group-hover:scale-110 transition-transform duration-300">
                <Icon size={22} />
              </div>
              <h3 className="text-4xl font-black bg-gradient-to-r from-cyan-600 to-indigo-600 bg-clip-text text-transparent">
                {item.value}+
              </h3>
              <p className="mt-1 text-sm font-medium" style={{ color: 'var(--color-text-secondary)' }}>
                {item.label}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
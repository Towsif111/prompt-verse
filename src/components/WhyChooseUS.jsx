"use client";

import { Card } from "@heroui/react";
import { motion } from "framer-motion";
import { ShieldCheck, Gauge, Users, BarChart3 } from "lucide-react";

const items = [
  { icon: ShieldCheck, title: "Moderated quality", text: "Every submitted prompt starts as pending and requires admin approval before marketplace visibility." },
  { icon: Gauge, title: "Fast discovery", text: "Backend search, filters, sorting, and pagination make large prompt libraries easy to browse." },
  { icon: Users, title: "Creator ecosystem", text: "Reviews, bookmarks, reports, dashboards, and top creator rankings keep the community active." },
  { icon: BarChart3, title: "Analytics ready", text: "Creator and admin dashboards use aggregation insights and charts for performance tracking." }
];

export default function WhyChooseUs() {
  return (
    <section className="container-shell py-20 bg-gradient-to-r from-cyan-50 via-white to-indigo-50">
      <div className="glass-card rounded-[2rem] p-8 md:p-12 backdrop-blur-md bg-white/60 dark:bg-slate-900/60 border border-white/20 shadow-lg">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.35em] text-primary">Why choose us</p>
          <h2 className="mt-2 text-4xl font-black bg-gradient-to-r from-primary to-pink-500 bg-clip-text text-transparent">
            Built for serious AI creators
          </h2>
          <p className="mt-3 text-default-500">A recruiter-friendly SaaS experience with secure auth, role management, premium access, and polished dashboards.</p>
        </div>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 place-items-center">
        {items.map((item, index) => (
          <motion.div key={item.title} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }}>
            <Card className="h-full p-6 backdrop-blur-md bg-white/70 dark:bg-slate-950/70 border border-white/20 shadow-md hover:shadow-xl transition-all duration-300">
              <motion.div whileHover={{ scale: 1.1, rotate: 3 }} transition={{ type: "spring", stiffness: 200 }}>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <item.icon size={24} />
                </div>
              </motion.div>
              <h3 className="font-black">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-default-500">{item.text}</p>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

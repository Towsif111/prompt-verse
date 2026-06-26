"use client";

import { motion } from "framer-motion";
import { Check, X, Crown, Sparkles, ArrowRight, Star } from "lucide-react";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Get started with basic access to the prompt marketplace.",
    popular: false,
    icon: Sparkles,
    features: [
      { text: "Browse public prompts", included: true },
      { text: "Search & filter prompts", included: true },
      { text: "Add up to 3 prompts", included: true },
      { text: "Basic bookmark & copy", included: true },
      { text: "Community reviews access", included: true },
      { text: "Premium (Private) prompts", included: false },
      { text: "Unlimited prompt creation", included: false },
      { text: "Priority support", included: false },
      { text: "Analytics dashboard", included: false },
    ],
    cta: "Get Started Free",
    href: "/auth/signup",
    color: "from-slate-400 to-slate-600",
  },
  {
    name: "Premium",
    price: "$5",
    period: "one-time payment",
    description: "Unlock the full power of PromptVerse with premium access.",
    popular: true,
    icon: Crown,
    features: [
      { text: "Everything in Free", included: true },
      { text: "Access to all Premium prompts", included: true },
      { text: "Unlimited prompt creation", included: true },
      { text: "Unlock private/paid prompts", included: true },
      { text: "Early access to new features", included: true },
      { text: "Priority customer support", included: true },
      { text: "Ad-free experience", included: true },
      { text: "Detailed analytics", included: true },
      { text: "Badge & recognition", included: true },
    ],
    cta: "Go Premium",
    href: "/payment",
    color: "from-amber-400 to-orange-600",
  },
];

const faqs = [
  {
    q: "What's the difference between Free and Premium?",
    a: "Premium unlocks all private/paid prompts, unlimited prompt creation, priority support, advanced analytics, and an ad-free experience.",
  },
  {
    q: "Is it a one-time payment or subscription?",
    a: "Premium is a one-time payment of $5. No recurring charges.",
  },
  {
    q: "Can I upgrade from Free to Premium later?",
    a: "Yes! You can upgrade anytime from your profile or dashboard settings.",
  },
  {
    q: "Is there a refund policy?",
    a: "Due to the digital nature of our service, all purchases are final. Please contact support if you experience any issues.",
  },
];

export default function PricingPage() {
  const { data: session } = useSession();
  const user = session?.user;
  const isPremium = user?.subscription === "Premium" || user?.subscription === "premium";

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-bg)' }}>
      {}
      <section className="relative overflow-hidden border-b transition-colors duration-300" style={{ borderColor: 'var(--color-border)', background: `linear-gradient(to bottom, var(--color-bg-secondary), var(--color-bg), var(--color-bg))` }}>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-gradient-to-br from-cyan-200/30 to-indigo-200/30 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-gradient-to-tr from-amber-200/20 to-orange-200/20 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-100 to-indigo-100 px-4 py-1.5 text-sm font-medium text-cyan-800 mb-6">
              <Sparkles className="h-4 w-4" />
              Simple, transparent pricing
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black leading-tight" style={{ color: 'var(--color-text)' }}>
              Choose your{" "}
              <span className="bg-gradient-to-r from-cyan-600 to-indigo-600 bg-clip-text text-transparent">
                plan
              </span>
            </h1>
            <p className="mt-4 text-lg max-w-2xl mx-auto" style={{ color: 'var(--color-text-secondary)' }}>
              Start for free, upgrade when you need more. No hidden fees, no monthly commitments.
            </p>
          </motion.div>

          {}
          <div className="mt-14 grid gap-8 lg:grid-cols-2 max-w-4xl mx-auto">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}                    className={`relative rounded-3xl border-2 p-8 shadow-sm transition-all duration-300 hover:shadow-xl`}
                    style={{
                      borderColor: plan.popular ? 'var(--color-border)' : 'var(--color-border)',
                      backgroundColor: plan.popular ? 'color-mix(in srgb, var(--color-bg) 95%, amber)' : 'var(--color-surface)'
                    }}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 px-4 py-1.5 text-xs font-bold text-white shadow-lg">
                      <Star className="h-3.5 w-3.5 fill-white" />
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className={`mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${plan.color} text-white shadow-md`}>
                      <plan.icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold" style={{ color: 'var(--color-text)' }}>{plan.name}</h3>
                    <p className="text-sm mt-1" style={{ color: 'var(--color-text-secondary)' }}>{plan.description}</p>
                  </div>
                </div>

                <div className="my-6">
                  <span className="text-5xl font-black" style={{ color: 'var(--color-text)' }}>{plan.price}</span>
                  <span className="ml-2 text-sm" style={{ color: 'var(--color-text-secondary)' }}>{plan.period}</span>
                </div>

                {isPremium && plan.name === "Premium" ? (
                  <div className="mb-6 rounded-xl bg-emerald-50 border border-emerald-200 px-4 py-3 text-center">
                    <p className="text-sm font-semibold text-emerald-700 flex items-center justify-center gap-2">
                      <Check className="h-4 w-4" />
                      You&apos;re on Premium!
                    </p>
                  </div>
                ) : (
                  <Link
                    href={plan.href}
                    className={`group mb-6 flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold text-white shadow-lg transition-all hover:shadow-xl ${
                      plan.popular
                        ? "bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700"
                        : "bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-600 hover:to-indigo-700"
                    }`}
                  >
                    {plan.cta}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                )}

                <ul className="space-y-3.5">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      {feature.included ? (
                        <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100">
                          <Check className="h-3 w-3 text-emerald-600" />
                        </div>
                      ) : (
                        <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-100">
                          <X className="h-3 w-3 text-slate-400" />
                        </div>
                      )}
                      <span className={`text-sm ${feature.included ? "" : ""}`} style={{ color: feature.included ? 'var(--color-text)' : 'var(--color-text-muted)' }}>
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {}
      <section className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-black" style={{ color: 'var(--color-text)' }}>
            Full Feature Comparison
          </h2>
          <p className="mt-3" style={{ color: 'var(--color-text-secondary)' }}>
            Everything you get with each plan, side by side.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="overflow-x-auto rounded-2xl shadow-sm" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface)' }}
        >
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b" style={{ borderColor: 'var(--color-border-light)', backgroundColor: 'var(--color-bg-secondary)' }}>
                <th className="px-6 py-4 text-left font-semibold" style={{ color: 'var(--color-text-secondary)' }}>Feature</th>
                <th className="px-6 py-4 text-center font-semibold text-slate-600">
                  <span className="text-cyan-700">Free</span>
                </th>
                <th className="px-6 py-4 text-center font-semibold text-amber-700">
                  <span className="flex items-center justify-center gap-1.5">
                    <Crown className="h-4 w-4" />
                    Premium
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                { feature: "Browse Public Prompts", free: true, premium: true },
                { feature: "Search & Filter", free: true, premium: true },
                { feature: "Bookmark Prompts", free: true, premium: true },
                { feature: "Community Reviews", free: true, premium: true },
                { feature: "Prompt Creation", free: "Up to 3", premium: "Unlimited" },
                { feature: "Premium/Private Prompts", free: false, premium: true },
                { feature: "Ad-Free Experience", free: false, premium: true },
                { feature: "Priority Support", free: false, premium: true },
                { feature: "Advanced Analytics", free: false, premium: true },
                { feature: "Premium Badge", free: false, premium: true },
              ].map((row, idx) => (
                <tr key={idx} className="border-b transition" style={{ borderColor: 'var(--color-border-light)' }}>
                  <td className="px-6 py-4 font-medium" style={{ color: 'var(--color-text)' }}>{row.feature}</td>
                  <td className="px-6 py-4 text-center">
                    {typeof row.free === "string" ? (
                      <span className="text-sm text-slate-500">{row.free}</span>
                    ) : row.free ? (
                      <Check className="mx-auto h-5 w-5 text-emerald-500" />
                    ) : (
                      <X className="mx-auto h-5 w-5 text-slate-300" />
                    )}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {typeof row.premium === "string" ? (
                      <span className="text-sm font-medium text-slate-700">{row.premium}</span>
                    ) : row.premium ? (
                      <Check className="mx-auto h-5 w-5 text-emerald-500" />
                    ) : (
                      <X className="mx-auto h-5 w-5 text-slate-300" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </section>

      {}
      <section className="border-t transition-colors duration-300" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-bg-secondary)' }}>
        <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl font-black" style={{ color: 'var(--color-text)' }}>Frequently Asked Questions</h2>
            <p className="mt-2" style={{ color: 'var(--color-text-secondary)' }}>Have more questions? We&apos;re here to help.</p>
          </motion.div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
              >
                <details className="group rounded-xl p-5 shadow-sm transition hover:shadow-md open:shadow-md" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface)' }}>
                  <summary className="flex cursor-pointer items-center justify-between font-semibold list-none" style={{ color: 'var(--color-text)' }}>
                    {faq.q}
                    <svg
                      className="h-5 w-5 shrink-0 text-slate-400 transition group-open:rotate-180"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed border-t pt-3" style={{ color: 'var(--color-text-secondary)', borderColor: 'var(--color-border-light)' }}>
                    {faq.a}
                  </p>
                </details>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <p className="mb-4" style={{ color: 'var(--color-text-secondary)' }}>Still have questions?</p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 px-6 py-3 text-sm font-bold text-white shadow-lg hover:shadow-xl transition-all"
            >
              Contact Support
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {}
      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-10 sm:p-14 text-center shadow-2xl"
        >
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-20 -right-20 h-60 w-60 rounded-full bg-gradient-to-br from-cyan-400/20 to-indigo-400/20 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-gradient-to-tr from-amber-400/10 to-orange-400/10 blur-3xl" />
          </div>

          <div className="relative">
            <Crown className="mx-auto h-12 w-12 text-amber-400 mb-4" />
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Ready to unlock the full potential?
            </h2>
            <p className="mt-3 text-slate-300 max-w-lg mx-auto">
              Join thousands of creators and get access to premium prompts, unlimited creation, and priority support.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              {user ? (
                isPremium ? (
                  <Link
                    href="/dashboard/profile"
                    className="inline-flex items-center gap-2 rounded-xl bg-white/10 border border-white/20 px-6 py-3 text-sm font-bold text-white hover:bg-white/20 transition-all backdrop-blur-sm"
                  >
                    View Your Profile
                  </Link>
                ) : (
                  <Link
                    href="/payment"
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 px-6 py-3 text-sm font-bold text-white shadow-lg hover:shadow-xl transition-all"
                  >
                    Upgrade to Premium — $5
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                )
              ) : (
                <>
                  <Link
                    href="/auth/signup"
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 px-6 py-3 text-sm font-bold text-white shadow-lg hover:shadow-xl transition-all"
                  >
                    Get Started Free
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/auth/signin"
                    className="inline-flex items-center gap-2 rounded-xl bg-white/10 border border-white/20 px-6 py-3 text-sm font-bold text-white hover:bg-white/20 transition-all backdrop-blur-sm"
                  >
                    Sign In
                  </Link>
                </>
              )}
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

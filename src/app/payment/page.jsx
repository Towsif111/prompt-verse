"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { Crown, CheckCircle, Sparkles, Lock, Zap, Star, Loader2, ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";
import Link from "next/link";

const PREMIUM_BENEFITS = [
  "Unlock all private/premium prompts",
  "Copy any prompt without restrictions",
  "Submit unlimited prompts",
  "Priority support",
  "Early access to new features",
  "Ad-free experience",
];

export default function PaymentPage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push("/auth/signin");
    }
  }, [session, isPending, router]);

  if (isPending) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-cyan-600" />
      </div>
    );
  }

  const user = session?.user;
  if (!user) {
    return null;
  }

  const isAlreadyPremium = user.subscription === "Premium" || user.subscription === "premium";

  const handleSubscribe = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user.email, userId: user.id }),
      });
      const data = await res.json();
      if (res.ok && data.url) {
        window.location.href = data.url;
      } else {
        toast.error(data.error || "Failed to create checkout session");
      }
    } catch (err) {
      toast.error("Failed to connect to payment server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen" style={{ background: `linear-gradient(to bottom, var(--color-bg-secondary), var(--color-bg))` }}>
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="group mb-6 inline-flex items-center gap-2 text-sm transition" style={{ color: 'var(--color-text-secondary)' }}
        >
          <ArrowLeft size={16} className="transition group-hover:-translate-x-0.5" />
          Back to Home
        </Link>

        <div className="text-center mb-10">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-orange-600 shadow-lg shadow-amber-500/20">
            <Crown className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-black bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">
            Upgrade to Premium
          </h1>
          <p className="mt-2 text-lg" style={{ color: 'var(--color-text-secondary)' }}>
            Unlock the full potential of PromptVerse
          </p>
        </div>

        <div className="mx-auto max-w-4xl grid gap-8 lg:grid-cols-2">
          {}
          <div className="space-y-6">
            <h2 className="text-xl font-bold" style={{ color: 'var(--color-text)' }}>What you get:</h2>
            <div className="space-y-3">
              {PREMIUM_BENEFITS.map((benefit, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 rounded-xl p-4 shadow-sm transition hover:shadow-md" style={{ borderColor: 'var(--color-border-light)', backgroundColor: 'var(--color-surface)' }}
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-100">
                    <CheckCircle className="h-5 w-5 text-emerald-600" />
                  </div>
                  <p className="text-sm pt-1" style={{ color: 'var(--color-text)' }}>{benefit}</p>
                </div>
              ))}
            </div>

            {}
            <div className="rounded-2xl p-5" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-bg-tertiary)' }}>
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="h-5 w-5 text-indigo-600" />
                <h3 className="font-bold text-indigo-800">Premium Prompts Included</h3>
              </div>
              <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                Get access to exclusive premium prompts created by top creators that are locked 
                for free users. Browse, copy, and use them for your projects.
              </p>
            </div>
          </div>

          {}
          <div>
            {isAlreadyPremium ? (
              <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-8 text-center shadow-xl">
                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
                  <Crown className="h-10 w-10 text-emerald-600" />
                </div>
                <h2 className="text-2xl font-bold text-emerald-800 mb-2">You are Premium!</h2>
                <p className="text-emerald-600 mb-6">
                  You already have full access to all premium features.
                </p>
                <Link
                  href="/all-prompts"
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-bold text-white shadow-lg hover:bg-emerald-700 transition"
                >
                  <Zap className="h-4 w-4" />
                  Browse All Prompts
                </Link>
              </div>
            ) : (
              <div className="group relative overflow-hidden rounded-3xl border-2 shadow-xl transition hover:shadow-2xl hover:-translate-y-1" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface)' }}>
                {}
                <div className="absolute -right-12 top-6 rotate-45 bg-gradient-to-r from-amber-500 to-orange-600 px-12 py-1 text-xs font-bold text-white shadow-md">
                  POPULAR
                </div>

                <div className="p-8">
                  {}
                  <div className="text-center mb-6">
                    <p className="text-sm mb-1" style={{ color: 'var(--color-text-secondary)' }}>One-time payment</p>
                    <div className="flex items-center justify-center gap-1">
                      <span className="text-3xl font-bold text-slate-400">$</span>
                      <span className="text-6xl font-black bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">
                        5
                      </span>
                      <span className="text-lg text-slate-400">.00</span>
                    </div>
                    <p className="text-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>Lifetime access</p>
                  </div>

                  {}
                  <div className="space-y-3 mb-8">
                    {[
                      "Unlock all private prompts",
                      "Copy premium content",
                      "Submit unlimited prompts",
                      "Lifetime access, no recurring fees",
                    ].map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <Star className="h-4 w-4 text-amber-500 shrink-0" />                          <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>{feature}</span>
                      </div>
                    ))}
                  </div>

                  {}
                  <button
                    onClick={handleSubscribe}
                    disabled={loading}
                    className="w-full rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-amber-500/20 transition hover:shadow-xl hover:shadow-amber-500/30 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <><Loader2 className="h-4 w-4 animate-spin" /> Processing...</>
                    ) : (
                      <><Lock className="h-4 w-4" /> Subscribe Now — $5</>
                    )}
                  </button>

                  <p className="text-center text-xs mt-3" style={{ color: 'var(--color-text-muted)' }}>
                    Secure payment powered by Stripe
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

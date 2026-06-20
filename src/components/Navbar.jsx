import Link from "next/link";
import { LogIn, Sparkles, UserPlus } from "lucide-react";

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 via-sky-500 to-indigo-600 shadow-lg shadow-cyan-500/20 ring-1 ring-white/10 transition duration-200 group-hover:scale-[1.03]">
            <Sparkles className="h-5 w-5 text-white" />
          </span>
          <span className="flex flex-col leading-tight">
            <span className="text-2xl font-semibold  text-cyan-700/80">
              Prompt Verse
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-2 md:flex">
          <Link
            href="/"
            className="btn btn-ghost btn-sm border border-transparent text-2xl text-slate-700 hover:border-slate-200 hover:bg-slate-100"
          >
            Home
          </Link>
          <Link
            href="#highlights"
            className="btn btn-ghost btn-sm border border-transparent text-2xl text-slate-700 hover:border-slate-200 hover:bg-slate-100"
          >
            All Prompts
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/login" className="user-profile" aria-label="Login">
            <span className="user-profile-inner">
              <LogIn />
              <span>Login</span>
            </span>
          </Link>
          <Link href="/register" className="user-profile" aria-label="Sign up">
            <span className="user-profile-inner">
              <UserPlus />
              <span>Sign Up</span>
            </span>
          </Link>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;

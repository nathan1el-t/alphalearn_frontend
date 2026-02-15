"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function SignInPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { signIn, signUp, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSignUp) {
      await signUp(email, password);
    } else {
      await signIn(email, password);
    }
  };

  return (
      <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-white font-['Plus_Jakarta_Sans'] min-h-screen flex flex-col relative overflow-x-hidden selection:bg-[#7c5cff] selection:text-white">
        {/* Background decorative elements */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          {/* Grid pattern overlay */}
          <div
            className="absolute inset-0 opacity-[0.15]"
            style={{
              backgroundImage:
                "linear-gradient(to right, #29204b 1px, transparent 1px), linear-gradient(to bottom, #29204b 1px, transparent 1px)",
              backgroundSize: "40px 40px",
              maskImage:
                "radial-gradient(circle at center, black 40%, transparent 100%)",
              WebkitMaskImage:
                "radial-gradient(circle at center, black 40%, transparent 100%)",
            }}
          ></div>
          {/* Glowing purple blob - top left */}
          <div
            className="absolute w-[500px] h-[500px] top-[-100px] left-[-100px] bg-[#7c5cff] rounded-full opacity-15 pointer-events-none"
            style={{ filter: "blur(120px)" }}
          ></div>
          {/* Glowing blue blob - bottom right */}
          <div
            className="absolute w-[400px] h-[400px] bottom-[-50px] right-[-50px] bg-blue-500 rounded-full opacity-10 pointer-events-none"
            style={{ filter: "blur(120px)" }}
          ></div>
        </div>



        {/* Main content area */}
        <main className="flex-grow flex items-center justify-center p-4 relative z-10">
          <div className={`w-full ${isSignUp ? 'lg:max-w-[1100px]' : 'lg:max-w-[500px]'} flex flex-col gap-6`}>
            {/* Main card container */}
            <div className="relative w-full bg-white dark:bg-[#181826] rounded-xl shadow-2xl overflow-hidden flex flex-col lg:flex-row border dark:border-[#29204b] border-gray-200">
              {/* Left Panel: Form Section */}
              <div className="flex-1 p-8 sm:p-12 lg:p-14 flex flex-col justify-center">
                {/* Header text - changes based on login/signup mode */}
                <div className="mb-8">
                  <h1 className="text-4xl text-center font-black tracking-tight leading-tight mb-2 dark:text-white text-slate-900">
                    {isSignUp
                      ? "Level Up Your Lore"
                      : "Welcome Back, Legend"}
                  </h1>
                  <p className="text-slate-500 text-center dark:text-[#9a8dce] text-lg font-normal">
                    {isSignUp
                      ? "Master the memes. Decode the slang."
                      : "Ready to break the internet again?"}
                  </p>
                </div>

                {/* Social login buttons - disabled placeholders */}
                <div className="grid grid-cols-1 gap-3 mb-6">
                  {/* Google button */}
                  <button
                    type="button"
                    disabled
                    className="flex items-center justify-center gap-2 h-12 rounded-lg bg-white dark:bg-[#29204b] border border-gray-200 dark:border-[#3a2e6b] text-slate-900 dark:text-white font-bold opacity-50 cursor-not-allowed"
                    title="Coming soon"
                  >
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      ></path>
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      ></path>
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                      ></path>
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      ></path>
                    </svg>
                    <span className="hidden sm:inline">Google</span>
                  </button>
                </div>

                {/* Divider */}
                <div className="relative flex items-center gap-2 mb-6">
                  <div className="h-px bg-gray-200 dark:bg-[#3a2e6b] flex-1"></div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                    {isSignUp ? "Or create account" : "Or continue with"}
                  </p>
                  <div className="h-px bg-gray-200 dark:bg-[#3a2e6b] flex-1"></div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  {/* Email field */}
                  <label className="flex flex-col gap-2">
                    <span className="text-white text-sm font-medium">
                      {isSignUp ? "Email" : "Username or Email"}
                    </span>
                    <div className="relative flex items-center">
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={
                          isSignUp ? "name@example.com" : "Enter your username"
                        }
                        className="w-full rounded-lg bg-gray-50 dark:bg-[#0F0F14] border border-gray-200 dark:border-[#3a2e6b] text-slate-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-[#6a5e95] focus:outline-none focus:ring-2 focus:ring-[#7c5cff] focus:border-transparent transition-all h-12 pl-11 pr-4 text-base"
                      />
                      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-[#6a5e95] text-[20px]">
                        mail
                      </span>
                    </div>
                  </label>

                  {/* Password field */}
                  <label className="flex flex-col gap-2">
                    <span className="text-white text-sm font-medium">
                      Password
                    </span>
                    <div className="relative flex items-center">
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        minLength={6}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder={
                          isSignUp ? "••••••••" : "Enter your password"
                        }
                        className="w-full rounded-lg bg-gray-50 dark:bg-[#0F0F14] border border-gray-200 dark:border-[#3a2e6b] text-slate-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-[#6a5e95] focus:outline-none focus:ring-2 focus:ring-[#7c5cff] focus:border-transparent transition-all h-12 pl-11 pr-12 text-base"
                      />
                      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-[#6a5e95] text-[20px]">
                        lock
                      </span>
                      {/* Password visibility toggle */}
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-0 top-0 h-full px-4 text-[#9a8dce] hover:text-white flex items-center justify-center transition-colors"
                      >
                        <span className="material-symbols-outlined text-[20px]">
                          {showPassword ? "visibility_off" : "visibility"}
                        </span>
                      </button>
                    </div>
                  </label>

                  {/* Utilities - Remember me & Forgot password (login only) */}
                  {!isSignUp && (
                    <div className="flex items-center justify-between pt-1">
                      <label className="flex items-center gap-2 cursor-pointer group">
                        <input
                          type="checkbox"
                          className="rounded border-none bg-[#29204b] text-[#7c5cff] focus:ring-offset-[#130f23] focus:ring-[#7c5cff] size-4 group-hover:bg-[#342a5e] transition-colors"
                        />
                        <span className="text-white text-sm">
                          Stay logged in
                        </span>
                      </label>
                      <a
                        href="#"
                        className="text-[#B3B3C6] hover:text-[#7c5cff] text-sm font-medium transition-colors"
                      >
                        Forgot password?
                      </a>
                    </div>
                  )}

                  {/* Submit button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="mt-4 flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-4 bg-[#7c5cff] hover:bg-[#6b4ce6] active:bg-[#5a3dc0] disabled:opacity-50 disabled:cursor-not-allowed text-white text-base font-bold tracking-[0.015em] transition-all duration-200 shadow-[0_0_20px_rgba(124,92,255,0.3)] hover:shadow-[0_0_30px_rgba(124,92,255,0.5)] transform hover:-translate-y-0.5 active:scale-[0.98]"
                  >
                    {isLoading
                      ? "Please wait..."
                      : isSignUp
                      ? "Join the Squad"
                      : "Resume Streak"}
                  </button>

                  {/* Terms text (signup only) */}
                  {isSignUp && (
                    <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                      By joining, you agree to our Terms of Service (no cap).
                    </p>
                  )}
                </form>

                {/* Toggle between login/signup */}
                <div className="mt-8 text-center">
                  <p className="text-slate-600 dark:text-[#9a8dce]">
                    {isSignUp
                      ? "Already have an account?"
                      : "New here?"}
                    <button
                      type="button"
                      onClick={() => setIsSignUp(!isSignUp)}
                      className="text-[#7c5cff] hover:text-white font-bold ml-1 transition-colors hover:underline"
                    >
                      {isSignUp ? "Log in" : "Start your origin story"}
                    </button>
                  </p>
                </div>
              </div>

              {/* Right Panel: Value Proposition (visible on desktop when in signup mode) */}
              {isSignUp && (
                <div className="hidden lg:flex w-[400px] bg-[#1d1736] dark:bg-[#130f24] border-l border-[#29204b] flex-col p-10 justify-center relative overflow-hidden">
                  {/* Background decorations */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-[#7c5cff]/20 rounded-full blur-[80px] -mr-32 -mt-32 pointer-events-none"></div>
                  <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] -ml-32 -mb-32 pointer-events-none"></div>

                  <div className="relative z-10">
                    <h2 className="text-3xl font-black text-white mb-2">
                      Why join?
                    </h2>
                    <p className="text-[#9a8dce] text-base mb-8">
                      Unlock the ultimate internet culture database.
                    </p>

                    <div className="flex flex-col gap-5">
                      {/* Feature 1: Streak */}
                      <div className="flex items-start gap-4 p-4 rounded-xl bg-[#1d1736] border border-[#3a2e6b] hover:border-[#7c5cff]/50 transition-colors group">
                        <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-[#29204b] flex items-center justify-center group-hover:bg-[#7c5cff]/20 transition-colors">
                          <span className="material-symbols-outlined text-orange-400 text-2xl">
                            local_fire_department
                          </span>
                        </div>
                        <div>
                          <h3 className="text-white font-bold text-lg leading-tight mb-1">
                            Keep the Streak
                          </h3>
                          <p className="text-[#9a8dce] text-sm leading-relaxed">
                            Daily drops of internet culture direct to your
                            brain.
                          </p>
                        </div>
                      </div>

                      {/* Feature 2: XP */}
                      <div className="flex items-start gap-4 p-4 rounded-xl bg-[#1d1736] border border-[#3a2e6b] hover:border-[#7c5cff]/50 transition-colors group">
                        <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-[#29204b] flex items-center justify-center group-hover:bg-[#7c5cff]/20 transition-colors">
                          <span className="material-symbols-outlined text-yellow-400 text-2xl">
                            star
                          </span>
                        </div>
                        <div>
                          <h3 className="text-white font-bold text-lg leading-tight mb-1">
                            Earn XP
                          </h3>
                          <p className="text-[#9a8dce] text-sm leading-relaxed">
                            Climb the leaderboards and flex on your friends.
                          </p>
                        </div>
                      </div>

                      {/* Feature 3: Badges */}
                      <div className="flex items-start gap-4 p-4 rounded-xl bg-[#1d1736] border border-[#3a2e6b] hover:border-[#7c5cff]/50 transition-colors group">
                        <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-[#29204b] flex items-center justify-center group-hover:bg-[#7c5cff]/20 transition-colors">
                          <span className="material-symbols-outlined text-purple-400 text-2xl">
                            military_tech
                          </span>
                        </div>
                        <div>
                          <h3 className="text-white font-bold text-lg leading-tight mb-1">
                            Collect Badges
                          </h3>
                          <p className="text-[#9a8dce] text-sm leading-relaxed">
                            Show off your meme mastery to the squad.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Floating cultural tags at bottom */}
            <div className="flex flex-wrap justify-center gap-2 opacity-50">
              <span className="px-3 py-1 rounded-full bg-[#29204b] border border-white/5 text-[10px] text-[#9a8dce] uppercase tracking-widest">
                #MemeEconomy
              </span>
              <span className="px-3 py-1 rounded-full bg-[#29204b] border border-white/5 text-[10px] text-[#9a8dce] uppercase tracking-widest">
                #CreatorMode
              </span>
            </div>
          </div>
        </main>
      </div>
  );
}

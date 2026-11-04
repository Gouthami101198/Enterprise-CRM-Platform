import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import {
  login,
  signup,
  forgotPassword,
  setAuthView,
  clearRecoveryStatus,
} from '../../store/slices/authSlice';
import { toggleTheme, addToast } from '../../store/slices/uiSlice';
import {
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Mail,
  User,
  Building,
  ArrowRight,
  Eye,
  EyeOff,
  Sun,
  Moon,
  Zap,
  KeyRound,
} from 'lucide-react';

export const AuthPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const authView = useAppSelector((state) => state.auth.authView);
  const recoverySentEmail = useAppSelector((state) => state.auth.recoverySentEmail);
  const theme = useAppSelector((state) => state.ui.theme);

  const [showPassword, setShowPassword] = useState(false);

  // Login form state
  const [loginEmail, setLoginEmail] = useState('priya.p@vanguardcrm.in');
  const [loginPassword, setLoginPassword] = useState('••••••••••••');

  // Sign up form state
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupCompany, setSignupCompany] = useState('');
  const [signupRole, setSignupRole] = useState('Enterprise AE');
  const [signupPassword, setSignupPassword] = useState('');

  // Forgot password form state
  const [forgotEmail, setForgotEmail] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail.trim()) {
      dispatch(addToast({ type: 'error', title: 'Email Required', message: 'Please enter your work email.' }));
      return;
    }
    dispatch(login({ email: loginEmail }));
    dispatch(addToast({ type: 'success', title: 'Welcome Back!', message: 'Signed in successfully.' }));
  };

  const handleDemoLogin = () => {
    dispatch(
      login({
        email: 'priya.p@vanguardcrm.in',
        name: 'Priya Patel',
        role: 'Senior Enterprise AE',
        company: 'Vanguard Systems India',
      })
    );
    dispatch(
      addToast({
        type: 'success',
        title: 'Demo Session Active',
        message: 'Signed in as Priya Patel (Senior Enterprise AE - Bengaluru).',
      })
    );
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!signupName.trim() || !signupEmail.trim() || !signupCompany.trim()) {
      dispatch(addToast({ type: 'error', title: 'Missing Information', message: 'Please complete all required fields.' }));
      return;
    }
    dispatch(
      signup({
        name: signupName,
        email: signupEmail,
        role: signupRole,
        company: signupCompany,
      })
    );
    dispatch(addToast({ type: 'success', title: 'Account Created 🎉', message: `Welcome to Vanguard CRM, ${signupName}!` }));
  };

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail.trim()) {
      dispatch(addToast({ type: 'error', title: 'Email Required', message: 'Please enter your registered email address.' }));
      return;
    }
    dispatch(forgotPassword(forgotEmail));
    dispatch(
      addToast({
        type: 'info',
        title: 'Password Reset Dispatched',
        message: `Recovery instructions sent to ${forgotEmail}.`,
      })
    );
  };

  return (
    <div className="min-h-screen w-full flex bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      {/* Theme Toggle in top right */}
      <button
        onClick={() => dispatch(toggleTheme())}
        className="absolute top-5 right-5 z-20 p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 shadow-xs transition cursor-pointer"
        title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      >
        {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
      </button>

      {/* Left Showcase Banner (Hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 p-12 text-white relative overflow-hidden flex-col justify-between">
        {/* Glow ambient effects */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Brand */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-black tracking-tight text-white leading-tight">
              Vanguard<span className="text-indigo-400">CRM</span>
            </h2>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Enterprise Sales OS
            </span>
          </div>
        </div>

        {/* Middle Value Proposition */}
        <div className="relative z-10 max-w-lg space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-xs font-semibold text-indigo-300">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>ISO 27001 & RBI Data Residency Compliant</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight text-white">
            High-velocity sales execution & customer intelligence.
          </h1>

          <p className="text-slate-300 text-sm leading-relaxed">
            Unified pipeline tracking, 360° customer relationship drawers, proactive task management, and executive revenue forecasting.
          </p>

          <div className="space-y-3 pt-2">
            {[
              'Interactive 6-stage sales pipeline with weighted forecasting',
              'Comprehensive 360° customer health scores & timeline logs',
              'Action item management with overdue warnings',
              'Built-in Recharts executive performance visualization',
            ].map((feat, idx) => (
              <div key={idx} className="flex items-center gap-3 text-xs text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Testimonial Box */}
        <div className="relative z-10 bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-xs">
          <p className="text-xs text-slate-300 italic leading-relaxed">
            "Vanguard CRM increased our enterprise pipeline velocity by 34% within the first quarter. The visual pipeline and customer 360 views are best-in-class."
          </p>
          <div className="mt-3 flex items-center gap-3">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
              alt="Ananya Iyer"
              className="w-8 h-8 rounded-full object-cover ring-2 ring-indigo-400/50"
            />
            <div>
              <span className="text-xs font-bold text-white block">Ananya Iyer</span>
              <span className="text-[10px] text-slate-400">Strategic Accounts Lead • Vanguard Systems India</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Form Card Container */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 overflow-y-auto">
        <div className="w-full max-w-md space-y-6">
          {/* Mobile Brand Header */}
          <div className="flex lg:hidden items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 flex items-center justify-center text-white shadow-md">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900 dark:text-white">
                Vanguard<span className="text-indigo-600 dark:text-indigo-400">CRM</span>
              </h2>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Enterprise Edition
              </span>
            </div>
          </div>

          {/* Quick Demo Login Pill Banner (Visible on Login) */}
          {authView === 'login' && (
            <div className="p-4 rounded-2xl bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-200/80 dark:border-indigo-800/60 shadow-xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-indigo-900 dark:text-indigo-200 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                  Quick Evaluation Access
                </span>
                <span className="text-[10px] uppercase font-bold text-indigo-600 dark:text-indigo-400 bg-white dark:bg-indigo-900 px-2 py-0.5 rounded-full">
                  Instant Demo
                </span>
              </div>
              <p className="text-[11px] text-indigo-700 dark:text-indigo-300 leading-snug mb-3">
                Pre-configured with enterprise sample data, pipeline deals, customer accounts, and sales metrics.
              </p>
              <button
                type="button"
                onClick={handleDemoLogin}
                className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition cursor-pointer shadow-sm shadow-indigo-300 dark:shadow-none flex items-center justify-center gap-2"
              >
                <span>⚡ Instant Login as Priya Patel</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* 1. LOGIN VIEW */}
          {authView === 'login' && (
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-5">
              <div>
                <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                  Account Sign In
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Access your enterprise workspace and client portfolios
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                    Work Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      placeholder="name@company.com"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      className="w-full pl-10 pr-3 py-2.5 text-sm bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl focus:bg-white dark:focus:bg-slate-800 focus:border-indigo-500 outline-none text-slate-900 dark:text-white transition"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        dispatch(clearRecoveryStatus());
                        dispatch(setAuthView('forgot-password'));
                      }}
                      className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
                    >
                      Forgot Password?
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="••••••••••••"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      className="w-full pl-10 pr-10 py-2.5 text-sm bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl focus:bg-white dark:focus:bg-slate-800 focus:border-indigo-500 outline-none text-slate-900 dark:text-white transition"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 pt-1">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="rounded accent-indigo-600 w-4 h-4 cursor-pointer"
                    />
                    <span>Remember my session</span>
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-xl transition cursor-pointer shadow-sm shadow-indigo-300 dark:shadow-none flex items-center justify-center gap-2"
                >
                  <span>Sign In to Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-center text-xs text-slate-500 dark:text-slate-400">
                <span>Don't have an enterprise account? </span>
                <button
                  onClick={() => dispatch(setAuthView('signup'))}
                  className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
                >
                  Create one now
                </button>
              </div>
            </div>
          )}

          {/* 2. SIGN UP VIEW */}
          {authView === 'signup' && (
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-5">
              <div>
                <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                  Join Vanguard CRM
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Create your team workspace profile
                </p>
              </div>

              <form onSubmit={handleSignup} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Priya Patel"
                      value={signupName}
                      onChange={(e) => setSignupName(e.target.value)}
                      className="w-full pl-10 pr-3 py-2 text-sm bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl focus:bg-white dark:focus:bg-slate-800 focus:border-indigo-500 outline-none text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                    Work Email *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      placeholder="priya.p@vanguardcrm.in"
                      value={signupEmail}
                      onChange={(e) => setSignupEmail(e.target.value)}
                      className="w-full pl-10 pr-3 py-2 text-sm bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl focus:bg-white dark:focus:bg-slate-800 focus:border-indigo-500 outline-none text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                      Company *
                    </label>
                    <div className="relative">
                      <Building className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. Vanguard Systems India"
                        value={signupCompany}
                        onChange={(e) => setSignupCompany(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl focus:bg-white dark:focus:bg-slate-800 focus:border-indigo-500 outline-none text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                      Role
                    </label>
                    <select
                      value={signupRole}
                      onChange={(e) => setSignupRole(e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl focus:bg-white dark:focus:bg-slate-800 focus:border-indigo-500 outline-none text-slate-900 dark:text-white cursor-pointer"
                    >
                      <option value="Enterprise AE">Enterprise AE</option>
                      <option value="Sales Director">Sales Director</option>
                      <option value="Account Manager">Account Manager</option>
                      <option value="RevOps Lead">RevOps Lead</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                    Password *
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="At least 8 characters"
                      value={signupPassword}
                      onChange={(e) => setSignupPassword(e.target.value)}
                      className="w-full pl-10 pr-10 py-2 text-sm bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl focus:bg-white dark:focus:bg-slate-800 focus:border-indigo-500 outline-none text-slate-900 dark:text-white"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
                  By clicking Register, you accept Vanguard CRM Master Services Terms and Privacy Policy.
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-xl transition cursor-pointer shadow-sm shadow-indigo-300 dark:shadow-none flex items-center justify-center gap-2 mt-2"
                >
                  <span>Create Account</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-center text-xs text-slate-500 dark:text-slate-400">
                <span>Already have an account? </span>
                <button
                  onClick={() => dispatch(setAuthView('login'))}
                  className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
                >
                  Sign in
                </button>
              </div>
            </div>
          )}

          {/* 3. FORGOT PASSWORD VIEW */}
          {authView === 'forgot-password' && (
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-5">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 flex items-center justify-center text-amber-600 dark:text-amber-400 mb-2">
                <KeyRound className="w-6 h-6" />
              </div>

              <div>
                <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                  Reset Password
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Enter your registered email address and we'll send verification instructions
                </p>
              </div>

              {recoverySentEmail ? (
                <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-emerald-800 dark:text-emerald-200 text-xs space-y-2">
                  <div className="flex items-center gap-2 font-bold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span>Instructions Sent!</span>
                  </div>
                  <p className="leading-relaxed">
                    We've dispatched password reset instructions to{' '}
                    <span className="font-bold underline">{recoverySentEmail}</span>. Please check your inbox and spam folders.
                  </p>
                  <button
                    onClick={() => {
                      dispatch(clearRecoveryStatus());
                      dispatch(setAuthView('login'));
                    }}
                    className="mt-2 inline-flex items-center gap-1 font-bold text-emerald-700 dark:text-emerald-300 hover:underline cursor-pointer"
                  >
                    <span>Return to Login</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <form onSubmit={handleForgotPassword} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                      Account Email
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        required
                        placeholder="name@company.com"
                        value={forgotEmail}
                        onChange={(e) => setForgotEmail(e.target.value)}
                        className="w-full pl-10 pr-3 py-2.5 text-sm bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl focus:bg-white dark:focus:bg-slate-800 focus:border-indigo-500 outline-none text-slate-900 dark:text-white transition"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-xl transition cursor-pointer shadow-sm shadow-indigo-300 dark:shadow-none flex items-center justify-center gap-2"
                  >
                    <span>Send Recovery Instructions</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-center text-xs text-slate-500 dark:text-slate-400">
                <button
                  onClick={() => {
                    dispatch(clearRecoveryStatus());
                    dispatch(setAuthView('login'));
                  }}
                  className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
                >
                  ← Back to Login
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};


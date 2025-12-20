// components/common/AuthModal.jsx
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  userLoginWithEmail,
  userRegistrationWithEmail,
} from "../../redux/actions";

export const AuthModal = ({ isOpen, onClose, defaultTab = "login" }) => {
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);

  const [tab, setTab] = useState(defaultTab);

  useEffect(() => {
    setTab(defaultTab);
  }, [defaultTab]);

  // Close when pressing ESC
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  if (auth.authenticate) {
    onClose();
    return null;
  }

  const isLogin = tab === "login";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-md mx-4">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header / Tabs */}
          <div className="flex border-b border-slate-200">
            <button
              className={`flex-1 py-3 text-sm font-medium ${
                isLogin
                  ? "text-[#2F5651] border-b-2 border-[#2F5651]"
                  : "text-slate-500 hover:text-slate-800"
              }`}
              onClick={() => setTab("login")}
            >
              Log in
            </button>
            <button
              className={`flex-1 py-3 text-sm font-medium ${
                !isLogin
                  ? "text-[#2F5651] border-b-2 border-[#2F5651]"
                  : "text-slate-500 hover:text-slate-800"
              }`}
              onClick={() => setTab("signup")}
            >
              Sign up
            </button>

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-2 right-3 h-8 w-8 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 text-sm"
            >
              ✕
            </button>
          </div>

          {/* Content */}
          <div className="p-5 sm:p-6">
            {isLogin ? (
              <LoginForm dispatch={dispatch} />
            ) : (
              <SignupForm dispatch={dispatch} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const LoginForm = ({ dispatch }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(userLoginWithEmail({ email, password }));
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-slate-900 mb-1">
          Welcome back
        </h2>
        <p className="text-xs text-slate-500">
          Log in to manage your orders, wishlist and account.
        </p>
      </div>

      <div className="space-y-3">
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">
            Email
          </label>
          <input
            type="email"
            required
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#2F5651] focus:border-[#2F5651]"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">
            Password
          </label>
          <input
            type="password"
            required
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#2F5651] focus:border-[#2F5651]"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="flex items-center justify-between text-xs">
          <label className="inline-flex items-center gap-2 text-slate-600">
            <input
              type="checkbox"
              className="rounded border-slate-300 text-[#2F5651] focus:ring-[#2F5651]"
            />
            Remember me
          </label>
          <button
            type="button"
            className="text-indigo-600 hover:text-indigo-700"
          >
            Forgot password?
          </button>
        </div>
      </div>

      <button
        type="submit"
        className="w-full rounded-lg bg-[#2F5651] py-2.5 text-sm font-semibold text-white hover:bg-[#24443f]"
      >
        Log in
      </button>

      <div className="flex items-center gap-2 text-[11px] text-slate-400">
        <span className="flex-1 h-px bg-slate-200" />
        OR
        <span className="flex-1 h-px bg-slate-200" />
      </div>

      <button
        type="button"
        className="w-full rounded-lg border border-slate-200 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 flex items-center justify-center gap-2"
      >
        <span>🔑</span>
        Continue with Google
      </button>
    </form>
  );
};

const SignupForm = ({ dispatch }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (password !== confirmPassword) {
      setError("Passwords do not match");
    } else {
      setError(null);
    }
  }, [password, confirmPassword]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(userRegistrationWithEmail({ name, email, password }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-slate-900 mb-1">
          Create your account
        </h2>
        <p className="text-xs text-slate-500">
          Sign up to start shopping and tracking your orders.
        </p>
      </div>

      <div className="space-y-3">
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">
            Full name
          </label>
          <input
            type="text"
            required
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#2F5651] focus:border-[#2F5651]"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">
            Email
          </label>
          <input
            type="email"
            required
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#2F5651] focus:border-[#2F5651]"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">
              Password
            </label>
            <input
              type="password"
              required
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#2F5651] focus:border-[#2F5651]"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">
              Confirm password
            </label>
            <input
              type="password"
              required
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#2F5651] focus:border-[#2F5651]"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {error && (
              <div className="text-[11px] text-red-500 mt-1">{error}</div>
            )}
          </div>
        </div>

        <p className="text-[11px] text-slate-500">
          By creating an account, you agree to our{" "}
          <button type="button" className="text-[#2F5651] underline">
            Terms
          </button>{" "}
          and{" "}
          <button type="button" className="text-[#2F5651] underline">
            Privacy Policy
          </button>
          .
        </p>
      </div>

      <button
        type="submit"
        className="w-full rounded-lg bg-[#2F5651] py-2.5 text-sm font-semibold text-white hover:bg-[#24443f] "
      >
        Sign up
      </button>
    </form>
  );
};

"use client";

import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { register } from "@/store/slices/authSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, ShieldCheck, Play, Wallet, TrendingUp } from "lucide-react";

export default function RegisterPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { loading, error } = useAppSelector((state) => state.auth);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [validationError, setValidationError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setValidationError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError("");

    if (!form.name || !form.email || !form.password || !form.password_confirmation) {
      setValidationError("All fields are required.");
      return;
    }

    if (form.password.length < 8) {
      setValidationError("Password must be at least 8 characters.");
      return;
    }

    if (form.password !== form.password_confirmation) {
      setValidationError("Passwords do not match.");
      return;
    }

    if (!agreed) {
      setValidationError("You must accept the terms and conditions.");
      return;
    }

    const result = await dispatch(register(form));
    if (register.fulfilled.match(result)) {
      router.push("/dashboard");
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Panel */}
      <div className="hidden w-1/2 bg-gradient-to-br from-green-700 via-green-600 to-emerald-500 lg:flex lg:flex-col lg:justify-between lg:p-12">
        <div>
          <h1 className="text-3xl font-bold text-white">Streamcrest</h1>
          <p className="mt-1 text-green-100">Sponsored video earnings</p>
        </div>

        <div className="space-y-8">
          <h2 className="text-2xl font-semibold text-white">
            Create your account
          </h2>
          <p className="text-lg text-green-100">
            Open your account to start watching sponsored videos and building
            withdrawable earnings with no hidden charges.
          </p>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="rounded-lg bg-white/10 p-3">
                <Play className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Watch and earn</h3>
                <p className="text-sm text-green-100">
                  Move quickly from sign in to watching sponsored videos and
                  building earnings.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="rounded-lg bg-white/10 p-3">
                <Wallet className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-white">
                  Multiple payout methods
                </h3>
                <p className="text-sm text-green-100">
                  Withdraw through PayPal, crypto, bank, or mobile money with no
                  hidden charges.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="rounded-lg bg-white/10 p-3">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Track your progress</h3>
                <p className="text-sm text-green-100">
                  Track your progress, available balance, and account activity in
                  one secure place.
                </p>
              </div>
            </div>
          </div>
        </div>

        <p className="text-sm text-green-200">
          &copy; {new Date().getFullYear()} Streamcrest. All rights reserved.
        </p>
      </div>

      {/* Right Panel - Register Form */}
      <div className="flex w-full items-center justify-center px-6 py-12 lg:w-1/2">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="mb-8 lg:hidden">
            <h1 className="text-2xl font-bold text-green-600">Streamcrest</h1>
            <p className="text-sm text-gray-500">Sponsored video earnings</p>
          </div>

          <div className="mb-6">
            <div className="mb-4 flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-green-600" />
              <span className="text-sm font-medium text-green-600">
                Protected account
              </span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              Member Registration
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Watch sponsored videos. Build withdrawable earnings.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {(validationError || error) && (
              <div className="rounded-md bg-red-50 p-3 text-sm text-red-600">
                {validationError || error}
              </div>
            )}

            <div>
              <label
                htmlFor="name"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Full name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 px-3 py-2.5 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 px-3 py-2.5 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 px-3 py-2.5 pr-10 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label
                htmlFor="password_confirmation"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Confirm password
              </label>
              <div className="relative">
                <input
                  id="password_confirmation"
                  name="password_confirmation"
                  type={showConfirm ? "text" : "password"}
                  value={form.password_confirmation}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 px-3 py-2.5 pr-10 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirm ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <input
                id="terms"
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-1 h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
              />
              <label htmlFor="terms" className="text-sm text-gray-600">
                I&apos;ve read and accept the{" "}
                <a href="#" className="text-green-600 hover:underline">
                  terms and conditions
                </a>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-md bg-green-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Creating account..." : "Create account"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="font-medium text-green-600 hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

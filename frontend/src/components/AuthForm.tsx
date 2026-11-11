import { useState, type FormEvent } from "react";
import type { AuthDetails } from "../types";

interface AuthFormProps {
  busy: boolean;
  error: string;
  onSubmit: (details: AuthDetails, isRegister: boolean) => void;
}

function AuthForm({ busy, error, onSubmit }: AuthFormProps) {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    onSubmit({ name: name.trim(), email: email.trim(), password }, isRegister);
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-100 px-4 py-10">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg space-y-6"
      >
        <div className="text-center space-y-2">
          <a
            href="/"
            className="text-2xl font-bold tracking-tight text-indigo-600"
          >
            Daymark
          </a>

          <p className="text-xs font-semibold tracking-widest text-slate-500">
            YOUR PERSONAL TO-DO LIST
          </p>

          <h1 className="text-2xl font-bold text-slate-800">
            {isRegister ? "Create an account" : "Welcome back"}
          </h1>

          <p className="text-sm text-slate-500">
            {isRegister
              ? "Sign up to start organizing your day."
              : "Sign in to see your tasks."}
          </p>
        </div>

        {error && (
          <p
            className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600"
            role="alert"
          >
            {error}
          </p>
        )}

        {isRegister && (
          <label className="block space-y-2">
            <span className="text-sm font-medium text-slate-700">Name</span>

            <input
              autoComplete="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Your name"
              required
              className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </label>
        )}

        <label className="block space-y-2">
          <span className="text-sm font-medium text-slate-700">Email</span>

          <input
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            required
            className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />
        </label>

        <label className="block space-y-2">
          <span className="text-sm font-medium text-slate-700">Password</span>

          <input
            type="password"
            autoComplete={isRegister ? "new-password" : "current-password"}
            minLength={isRegister ? 6 : undefined}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder={isRegister ? "At least 6 characters" : "Your password"}
            required
            className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />
        </label>

        <button
          type="submit"
          disabled={busy}
          className="w-full rounded-lg bg-indigo-600 px-4 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {busy ? "Please wait..." : isRegister ? "Create account" : "Sign in"}
        </button>

        <p className="text-center text-sm text-slate-600">
          {isRegister ? "Already have an account?" : "New here?"}

          <button
            type="button"
            onClick={() => setIsRegister((current) => !current)}
            className="ml-1 font-semibold text-indigo-600 hover:text-indigo-700 hover:underline"
          >
            {isRegister ? "Sign in" : "Create an account"}
          </button>
        </p>
      </form>
    </main>
  );
}

export default AuthForm;

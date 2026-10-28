import { useState } from "react";
import api from "../api/api";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setErrorMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.password
    ) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    if (formData.password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long.");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/auth/register", {
        ...formData,
        name: formData.name.trim(),
        email: formData.email.trim(),
      });

      console.log(response.data);
      localStorage.setItem("hasRegistered", "true");
      alert("Registration successful!");
      navigate("/login");
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-violet-50 via-white to-indigo-100 px-4 py-10 sm:px-6 sm:py-16">
      {/* Background decoration */}
      <div className="pointer-events-none absolute -left-24 top-10 h-64 w-64 rounded-full bg-violet-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-10 h-72 w-72 rounded-full bg-indigo-200/50 blur-3xl" />

      <div className="relative mx-auto flex min-h-[75vh] max-w-5xl items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-3xl border border-white/80 bg-white/90 shadow-2xl shadow-violet-200/40 backdrop-blur md:grid-cols-2">

          {/* Left panel */}
          <div className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-violet-700 via-violet-600 to-indigo-700 p-10 text-white md:flex lg:p-12">
            <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full border-[35px] border-white/10" />
            <div className="absolute -bottom-20 -left-16 h-64 w-64 rounded-full border-[40px] border-white/10" />

            <div className="relative">
              <Link to="/" className="inline-flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-xl font-extrabold text-violet-700 shadow-lg">
                  S
                </span>
                <span className="text-xl font-bold tracking-tight">
                  SkillSwap
                </span>
              </Link>

              <p className="mt-14 text-xs font-bold uppercase tracking-[0.25em] text-violet-200">
                Your journey starts here
              </p>

              <h1 className="mt-4 text-4xl font-extrabold leading-tight lg:text-5xl">
                Learn together.
                <span className="mt-2 block text-violet-200">
                  Grow together.
                </span>
              </h1>

              <p className="mt-6 max-w-sm text-base leading-7 text-violet-100">
                Build your profile, share your knowledge, and connect with
                people who are ready to exchange skills.
              </p>
            </div>

            <div className="relative rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-sm">
              <p className="text-sm font-medium text-violet-200">
                YOUR SKILLS. YOUR COMMUNITY.
              </p>
              <p className="mt-2 text-lg font-semibold">
                Learn • Share • Grow
              </p>
              <p className="mt-1 text-sm text-violet-100">
                Every expert was once a beginner.
              </p>
            </div>
          </div>

          {/* Registration form */}
          <div className="flex items-center justify-center p-6 sm:p-10 lg:p-12">
            <div className="w-full max-w-md">

              <Link
                to="/"
                className="mb-8 inline-flex items-center gap-2 md:hidden"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600 font-bold text-white">
                  S
                </span>
                <span className="text-lg font-bold text-gray-900">
                  SkillSwap
                </span>
              </Link>

              <div className="mb-8">
                <span className="inline-flex rounded-full bg-violet-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-violet-700">
                  Join the community
                </span>

                <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                  Create your
                  <span className="block text-violet-600">account</span>
                </h2>

                <p className="mt-3 text-sm leading-6 text-gray-500">
                  Start sharing skills and discovering new opportunities.
                </p>
              </div>

              {errorMessage && (
                <div
                  role="alert"
                  className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                >
                  {errorMessage}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    Full name
                  </label>

                  <input
                    id="name"
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    autoComplete="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-gray-200 bg-gray-50/70 px-4 py-3.5 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-100"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    Email address
                  </label>

                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-gray-200 bg-gray-50/70 px-4 py-3.5 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-100"
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    Password
                  </label>

                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Create a password"
                      autoComplete="new-password"
                      value={formData.password}
                      onChange={handleChange}
                      minLength={6}
                      required
                      className="w-full rounded-xl border border-gray-200 bg-gray-50/70 px-4 py-3.5 pr-20 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-100"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-4 text-sm font-semibold text-violet-600 hover:text-violet-800"
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>

                  <p className="mt-2 text-xs text-gray-400">
                    Use at least 6 characters.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-3.5 font-bold text-white shadow-lg shadow-violet-200 transition duration-200 hover:-translate-y-0.5 hover:from-violet-700 hover:to-indigo-700 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
                >
                  {loading ? "Creating account..." : "Create account"}
                  {!loading && (
                    <span className="transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  )}
                </button>
              </form>

              <div className="my-7 flex items-center gap-4">
                <div className="h-px flex-1 bg-gray-200" />
                <span className="text-xs font-medium text-gray-400">
                  ALREADY A MEMBER?
                </span>
                <div className="h-px flex-1 bg-gray-200" />
              </div>

              <Link
                to="/login"
                className="flex w-full items-center justify-center rounded-xl border border-violet-200 bg-white px-6 py-3.5 font-semibold text-violet-700 transition hover:border-violet-400 hover:bg-violet-50"
              >
                Sign in to your account
              </Link>

              <p className="mt-7 text-center text-xs leading-5 text-gray-400">
                Join SkillSwap and take the next step in your learning journey.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Register;
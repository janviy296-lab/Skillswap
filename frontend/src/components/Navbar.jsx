import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(
    () => Boolean(localStorage.getItem("token"))
  );

  const [hasRegistered, setHasRegistered] = useState(
    () => localStorage.getItem("hasRegistered") === "true"
  );

  const location = useLocation();
  const navigate = useNavigate();

  const closeMenu = () => setMenuOpen(false);

  // Update navbar when the page changes
  useEffect(() => {
    setIsLoggedIn(Boolean(localStorage.getItem("token")));
    setHasRegistered(
      localStorage.getItem("hasRegistered") === "true"
    );
    setMenuOpen(false);
  }, [location.pathname]);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
window.dispatchEvent(new
  Event("skillswap-auth-changed"));
    setIsLoggedIn(false);
    setMenuOpen(false);

    navigate("/");
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Matches", path: "/matches" },
    { name: "Sessions", path: "/sessions" },
    { name: "AI Assistant", path: "/ai-assistant" },
  ];

  // Account links shown in desktop and mobile menus
  const renderAccountLinks = (mobile = false) => {
    const commonClass = mobile
      ? "w-full rounded-xl px-4 py-3 text-center text-sm font-semibold transition"
      : "rounded-xl px-4 py-2.5 text-sm font-semibold transition";

    if (isLoggedIn) {
      return (
        <>
          <Link
            to="/profile"
            onClick={closeMenu}
            className={`${commonClass} bg-violet-50 text-violet-700 hover:bg-violet-100`}
          >
            👤 My Profile
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            className={`${commonClass} border border-red-200 text-red-600 hover:bg-red-50`}
          >
            Logout
          </button>
        </>
      );
    }

    if (hasRegistered) {
      return (
        <Link
          to="/login"
          onClick={closeMenu}
          className={`${commonClass} bg-violet-600 text-white hover:bg-violet-700`}
        >
          Login →
        </Link>
      );
    }

    return (
      <Link
        to="/register"
        onClick={closeMenu}
        className={`${commonClass} bg-violet-600 text-white hover:bg-violet-700`}
      >
        Create Account →
      </Link>
    );
  };

  return (
    <header className="relative z-50 bg-white px-4 py-4 md:px-8">
      <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-2xl border border-gray-200 bg-white px-5 py-3 shadow-sm">

        {/* Logo */}
        <Link
          to="/"
          onClick={closeMenu}
          className="flex items-center gap-2"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600 text-lg font-bold text-white">
            S
          </div>

          <div>
            <h1 className="text-xl font-bold text-gray-900">
              Skill<span className="text-violet-600">Swap</span>
            </h1>

            <p className="hidden text-[10px] font-medium uppercase tracking-widest text-gray-400 sm:block">
              Learn • Share • Grow
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-1 rounded-xl bg-gray-50 p-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition hover:bg-white hover:text-violet-600 hover:shadow-sm ${
                location.pathname === link.path
                  ? "bg-white text-violet-600 shadow-sm"
                  : "text-gray-700"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Desktop Account Options */}
        <div className="hidden items-center gap-2 md:flex">
          {renderAccountLinks()}
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMenuOpen((previous) => !previous)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-violet-200 bg-violet-50 text-xl text-violet-700 transition hover:bg-violet-100 md:hidden"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </nav>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="absolute left-4 right-4 top-full mx-auto mt-1 max-w-7xl rounded-2xl border border-gray-100 bg-white p-3 shadow-xl md:hidden">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={closeMenu}
                className={`rounded-xl px-4 py-3 text-sm font-medium transition hover:bg-violet-50 hover:text-violet-700 ${
                  location.pathname === link.path
                    ? "bg-violet-50 text-violet-700"
                    : "text-gray-700"
                }`}
              >
                {link.name}
              </Link>
            ))}

            <div className="my-2 border-t border-gray-100" />

            <div className="flex flex-col gap-2">
              {renderAccountLinks(true)}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
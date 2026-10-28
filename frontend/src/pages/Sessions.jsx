import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../api/api";

function Sessions() {
  const [searchParams] = useSearchParams();
  const selectedPartner = searchParams.get("partner");

  const [sessions, setSessions] = useState([]);
  const [currentUserId, setCurrentUserId] = useState("");
  const [partner, setPartner] = useState(selectedPartner || "");
  const [skill, setSkill] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [updatingId, setUpdatingId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const today = new Date();
  const minDate = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-");

  // Fetch logged-in user's profile
  const fetchCurrentUser = useCallback(async () => {
    try {
      const response = await api.get("/users/profile");
      const user =
        response.data.user || response.data;

      setCurrentUserId(user?._id || user?.id || "");
    } catch (error) {
      console.error("Failed to fetch profile:", error);
    }
  }, []);

  // Fetch all sessions
  const fetchSessions = useCallback(async () => {
    try {
      setErrorMessage("");

      const response = await api.get("/sessions");

      setSessions(response.data.sessions ?? []);
    } catch (error) {
      console.error("Failed to fetch sessions:", error);
      setErrorMessage(
        error.response?.data?.message ||
          "Unable to load sessions. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCurrentUser();
    fetchSessions();
  }, [fetchCurrentUser, fetchSessions]);

  // Schedule a new session
  const scheduleSession = async (e) => {
    e.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");

    if (!partner.trim() || !skill.trim() || !date || !time) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    if (date < minDate) {
      setErrorMessage("Please select today or a future date.");
      return;
    }

    try {
      setSubmitting(true);

      await api.post("/sessions", {
        partner: partner.trim(),
        skill: skill.trim(),
        date,
        time,
      });

      setSuccessMessage(
        "Session request sent successfully! Status: Pending."
      );

      setSkill("");
      setDate("");
      setTime("");

      await fetchSessions();
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message ||
          "Failed to schedule session."
      );
    } finally {
      setSubmitting(false);
    }
  };

  // Accept or reject a pending session
  const updateSessionStatus = async (sessionId, status) => {
    const action =
      status === "confirmed" ? "accept" : "reject";

    const confirmed = window.confirm(
      status === "confirmed"
        ? "Are you sure you want to accept this session?"
        : "Are you sure you want to reject this session?"
    );

    if (!confirmed) return;

    setUpdatingId(sessionId);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      await api.put(`/sessions/${sessionId}`, {
        status,
      });

      setSuccessMessage(
        status === "confirmed"
          ? "Session confirmed successfully!"
          : "Session request rejected."
      );

      await fetchSessions();
    } catch (error) {
      console.error(`${action} session failed:`, error);

      setErrorMessage(
        error.response?.data?.message ||
          `Could not ${action} the session.`
      );
    } finally {
      setUpdatingId("");
    }
  };

  // Get status styling
  const getStatusStyle = (status) => {
    switch (String(status || "pending").toLowerCase()) {
      case "confirmed":
        return "bg-green-100 text-green-700";

      case "cancelled":
        return "bg-red-100 text-red-700";

      default:
        return "bg-amber-100 text-amber-700";
    }
  };

  // Get a readable partner name
  const getPartnerName = (session) => {
    const person = session.partner;

    if (person && typeof person === "object") {
      return person.name || "SkillSwap member";
    }

    return "SkillSwap member";
  };

  // Show Accept/Reject only to the receiver of a pending request.
  // The backend must also enforce this permission.
  const canRespond = (session) => {
    const receiverId =
      session.partner?._id ||
      session.partner?.id ||
      session.partner;

    return (
      currentUserId &&
      receiverId &&
      String(receiverId) === String(currentUserId) &&
      String(session.status || "pending").toLowerCase() ===
        "pending"
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-indigo-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Page heading */}
        <div className="mb-10 text-center">
          <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-100 text-3xl">
            📅
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Learning Sessions
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-gray-600">
            Schedule a learning session, manage requests, and
            keep track of your learning journey.
          </p>
        </div>

        {/* Notifications */}
        {errorMessage && (
          <div
            role="alert"
            className="mb-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
          >
            {errorMessage}
          </div>
        )}

        {successMessage && (
          <div
            role="status"
            className="mb-5 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-700"
          >
            {successMessage}
          </div>
        )}

        <div className="grid items-start gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Schedule form */}
          <section className="rounded-3xl border border-gray-100 bg-white p-6 shadow-lg shadow-violet-100/60 sm:p-8">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                Schedule a Session
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Send a request to your learning partner.
              </p>
            </div>

            <form onSubmit={scheduleSession} className="space-y-5">
              <div>
                <label
                  htmlFor="partner"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Partner User ID
                </label>

                <input
                  id="partner"
                  type="text"
                  value={partner}
                  onChange={(e) => setPartner(e.target.value)}
                  placeholder="Enter your partner's user ID"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
                  required
                />

                <p className="mt-2 text-xs text-gray-500">
                  If you opened this page from Matches, the ID
                  may already be filled in.
                </p>
              </div>

              <div>
                <label
                  htmlFor="skill"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Skill to Learn
                </label>

                <input
                  id="skill"
                  type="text"
                  value={skill}
                  onChange={(e) => setSkill(e.target.value)}
                  placeholder="e.g. React, JavaScript, English"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
                  required
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="date"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    Date
                  </label>

                  <input
                    id="date"
                    type="date"
                    min={minDate}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 px-3 py-3 outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="time"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    Time
                  </label>

                  <input
                    id="time"
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 px-3 py-3 outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-5 py-3.5 font-semibold text-white shadow-md shadow-violet-200 transition hover:-translate-y-0.5 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting
                  ? "Sending Request..."
                  : "Send Session Request →"}
              </button>

              <p className="text-center text-xs text-gray-500">
                New requests remain Pending until accepted.
              </p>
            </form>
          </section>

          {/* Sessions list */}
          <section className="rounded-3xl border border-gray-100 bg-white p-6 shadow-lg shadow-violet-100/60 sm:p-8">
            <div className="mb-6 flex items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  My Sessions
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Track requests and their current status.
                </p>
              </div>

              <button
                type="button"
                onClick={fetchSessions}
                className="shrink-0 rounded-xl border border-violet-200 px-3 py-2 text-sm font-semibold text-violet-700 transition hover:bg-violet-50"
              >
                ↻ Refresh
              </button>
            </div>

            {loading ? (
              <div className="py-12 text-center">
                <div className="mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-4 border-violet-200 border-t-violet-600" />
                <p className="text-sm text-gray-500">
                  Loading sessions...
                </p>
              </div>
            ) : sessions.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-gray-200 px-5 py-12 text-center">
                <div className="mb-3 text-4xl">🗓️</div>

                <h3 className="font-bold text-gray-800">
                  No sessions yet
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                  Schedule your first learning session to get
                  started.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {sessions.map((session) => (
                  <article
                    key={session._id}
                    className="rounded-2xl border border-gray-100 bg-gray-50/70 p-5 transition hover:border-violet-200 hover:bg-white hover:shadow-md"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h3 className="break-words text-lg font-bold text-gray-900">
                          {session.skill || "Learning Session"}
                        </h3>

                        <p className="mt-1 text-sm text-gray-500">
                          Partner: {getPartnerName(session)}
                        </p>
                      </div>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold capitalize ${getStatusStyle(session.status)}`}
                      >
                        {session.status || "pending"}
                      </span>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-gray-600">
                      <span>
                        <span className="mr-1">📅</span>
                        {session.date
                          ? String(session.date).slice(0, 10)
                          : "Date not set"}
                      </span>

                      <span>
                        <span className="mr-1">🕒</span>
                        {session.time || "Time not set"}
                      </span>
                    </div>

                    {canRespond(session) && (
                      <div className="mt-5 border-t border-gray-200 pt-4">
                        <p className="mb-3 text-sm font-medium text-gray-700">
                          You received this request. Would you like
                          to accept it?
                        </p>

                        <div className="flex flex-wrap gap-3">
                          <button
                            type="button"
                            onClick={() =>
                              updateSessionStatus(
                                session._id,
                                "confirmed"
                              )
                            }
                            disabled={updatingId === session._id}
                            className="rounded-xl bg-green-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700 disabled:opacity-60"
                          >
                            {updatingId === session._id
                              ? "Updating..."
                              : "✓ Accept"}
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              updateSessionStatus(
                                session._id,
                                "cancelled"
                              )
                            }
                            disabled={updatingId === session._id}
                            className="rounded-xl bg-red-100 px-5 py-2.5 text-sm font-semibold text-red-700 transition hover:bg-red-200 disabled:opacity-60"
                          >
                            ✕ Reject
                          </button>
                        </div>
                      </div>
                    )}

                    {String(session.status).toLowerCase() ===
                      "confirmed" && (
                      <p className="mt-4 rounded-xl bg-green-50 p-3 text-sm text-green-700">
                        ✓ This session has been confirmed.
                      </p>
                    )}

                    {String(session.status).toLowerCase() ===
                      "cancelled" && (
                      <p className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">
                        This session request has been cancelled.
                      </p>
                    )}
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

export default Sessions;
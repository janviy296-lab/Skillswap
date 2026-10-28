import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";

function Rating() {
  const { userId } = useParams();

  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const fetchReviews = useCallback(async () => {
    if (!userId) {
      setLoadingReviews(false);
      return;
    }

    try {
      setLoadingReviews(true);

      const response = await api.get(`/reviews/${userId}`);

      setReviews(response.data.reviews ?? []);
    } catch (error) {
      console.error("FETCH REVIEWS ERROR:", error);
      setErrorMessage("Unable to load reviews. Please try again.");
    } finally {
      setLoadingReviews(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const submitReview = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!comment.trim()) {
      setErrorMessage("Please write a comment before submitting.");
      return;
    }

    try {
      setSubmitting(true);

      await api.post("/reviews", {
        reviewedUser: userId,
        rating,
        comment: comment.trim(),
      });

      setSuccessMessage("Your review has been submitted successfully!");
      setComment("");
      setRating(5);
      setHoverRating(0);

      await fetchReviews();
    } catch (error) {
      console.error("REVIEW ERROR:", error.response?.data);

      setErrorMessage(
        error.response?.data?.message || "Failed to submit your review."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((total, review) => total + review.rating, 0) /
          reviews.length
        ).toFixed(1)
      : "—";

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-violet-50 via-white to-indigo-50 px-4 py-10 sm:px-6 sm:py-14">
      <div className="pointer-events-none absolute -left-24 top-20 h-64 w-64 rounded-full bg-violet-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-20 h-72 w-72 rounded-full bg-indigo-200/40 blur-3xl" />

      <div className="relative mx-auto max-w-3xl">
        {/* Header */}
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-violet-100 bg-white px-4 py-2 text-sm font-semibold text-violet-700 shadow-sm">
            <span>✦</span> SkillSwap Community
          </span>

          <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
            Every experience
            <span className="block text-violet-600">deserves a voice.</span>
          </h1>

          <p className="mx-auto mt-4 max-w-xl leading-7 text-gray-500">
            Share your experience, appreciate your skill partner, and help
            others build meaningful learning connections.
          </p>
        </div>

        {/* Rating summary */}
        <div className="mt-9 grid grid-cols-2 gap-4">
          <div className="rounded-2xl border border-white bg-white/90 p-5 text-center shadow-sm">
            <p className="text-sm font-medium text-gray-500">
              Average rating
            </p>
            <p className="mt-2 text-3xl font-extrabold text-gray-900">
              {averageRating}
              <span className="ml-1 text-xl text-amber-400">★</span>
            </p>
          </div>

          <div className="rounded-2xl border border-white bg-white/90 p-5 text-center shadow-sm">
            <p className="text-sm font-medium text-gray-500">
              Total reviews
            </p>
            <p className="mt-2 text-3xl font-extrabold text-violet-600">
              {reviews.length}
            </p>
          </div>
        </div>

        {/* Review form */}
        <section className="mt-7 rounded-3xl border border-white bg-white p-6 shadow-xl shadow-violet-100/70 sm:p-9">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-violet-600">
              Your feedback
            </p>
            <h2 className="mt-2 text-2xl font-bold text-gray-900">
              Rate your skill partner
            </h2>
            <p className="mt-2 text-sm leading-6 text-gray-500">
              Tell the community how your learning experience went.
            </p>
          </div>

          {errorMessage && (
            <div
              role="alert"
              className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
            >
              {errorMessage}
            </div>
          )}

          {successMessage && (
            <div
              role="status"
              className="mt-5 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700"
            >
              {successMessage}
            </div>
          )}

          <form onSubmit={submitReview} className="mt-7 space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                How was your experience?
              </label>

              <div
                className="mt-3 flex flex-wrap items-center gap-2"
                aria-label={`Selected rating: ${rating} out of 5`}
              >
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    aria-label={`Rate ${star} out of 5 stars`}
                    aria-pressed={rating === star}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className={`rounded-xl p-2 text-3xl transition hover:scale-110 ${
                      star <= (hoverRating || rating)
                        ? "text-amber-400"
                        : "text-gray-200"
                    }`}
                  >
                    ★
                  </button>
                ))}

                <span className="ml-2 text-sm font-semibold text-gray-600">
                  {rating === 5
                    ? "Excellent!"
                    : rating === 4
                    ? "Very good"
                    : rating === 3
                    ? "Good"
                    : rating === 2
                    ? "Could be better"
                    : "Needs improvement"}
                </span>
              </div>
            </div>

            <div>
              <label
                htmlFor="review-comment"
                className="block text-sm font-semibold text-gray-700"
              >
                Your review
              </label>

              <textarea
                id="review-comment"
                placeholder="What did you learn? How was your experience with your partner?"
                value={comment}
                onChange={(e) => {
                  setComment(e.target.value);
                  setErrorMessage("");
                  setSuccessMessage("");
                }}
                rows={4}
                maxLength={1000}
                required
                className="mt-3 w-full resize-y rounded-xl border border-gray-200 bg-gray-50/70 px-4 py-3.5 text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-100"
              />

              <p className="mt-2 text-right text-xs text-gray-400">
                {comment.length}/1000 characters
              </p>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-3.5 font-bold text-white shadow-lg shadow-violet-200 transition hover:from-violet-700 hover:to-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "Submitting review..." : "Submit review"}
              {!submitting && <span>★</span>}
            </button>
          </form>
        </section>

        {/* Reviews list */}
        <section className="mt-10">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-violet-600">
                Community feedback
              </p>
              <h2 className="mt-1 text-2xl font-extrabold text-gray-900">
                Partner reviews
              </h2>
            </div>

            <button
              type="button"
              onClick={fetchReviews}
              disabled={loadingReviews}
              className="rounded-xl border border-violet-200 bg-white px-4 py-2.5 text-sm font-semibold text-violet-700 transition hover:bg-violet-50 disabled:opacity-60"
            >
              {loadingReviews ? "Refreshing..." : "↻ Refresh"}
            </button>
          </div>

          {loadingReviews ? (
            <div className="mt-5 rounded-2xl border border-gray-100 bg-white p-8 text-center text-gray-500 shadow-sm">
              Loading reviews...
            </div>
          ) : reviews.length === 0 ? (
            <div className="mt-5 rounded-2xl border border-dashed border-violet-200 bg-white/80 px-6 py-10 text-center">
              <div className="text-4xl">💬</div>
              <h3 className="mt-3 text-lg font-bold text-gray-800">
                No reviews yet
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                Be the first to share your experience with this skill partner.
              </p>
            </div>
          ) : (
            <div className="mt-5 space-y-4">
              {reviews.map((review) => (
                <article
                  key={review._id}
                  className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:shadow-md sm:p-6"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 text-lg font-bold text-white">
                      {(review.reviewer?.name || "U")
                        .charAt(0)
                        .toUpperCase()}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h3 className="font-bold text-gray-900">
                          {review.reviewer?.name || "SkillSwap member"}
                        </h3>

                        <span className="text-sm font-semibold text-gray-500">
                          {review.rating}/5
                        </span>
                      </div>

                      <div
                        className="mt-1 text-amber-400"
                        aria-label={`${review.rating} out of 5 stars`}
                      >
                        {"★".repeat(
                          Math.max(0, Math.min(5, Number(review.rating) || 0))
                        )}
                        <span className="text-gray-200">
                          {"★".repeat(
                            5 -
                              Math.max(
                                0,
                                Math.min(5, Number(review.rating) || 0)
                              )
                          )}
                        </span>
                      </div>

                      <p className="mt-3 whitespace-pre-wrap break-words text-sm leading-6 text-gray-600">
                        {review.comment || "No written comment."}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

export default Rating;
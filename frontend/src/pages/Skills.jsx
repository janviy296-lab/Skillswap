import { useMemo, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/api";

const emptyForm = {
  name: "",
  description: "",
  category: "",
  level: "Beginner",
};

function Skills() {
  const [formData, setFormData] = useState(emptyForm);
  const [editingSkillId, setEditingSkillId] = useState(null);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [notice, setNotice] = useState("");

  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["skills"],
    queryFn: async () => {
      const response = await api.get("/skills");
      return response.data;
    },
  });

  const skills = data?.skills ?? [];

  const categories = useMemo(
    () => ["All", ...new Set(skills.map((skill) => skill.category).filter(Boolean))],
    [skills]
  );

  const filteredSkills = skills.filter((skill) => {
    const term = search.trim().toLowerCase();
    const matchesSearch =
      skill.name?.toLowerCase().includes(term) ||
      skill.description?.toLowerCase().includes(term) ||
      skill.category?.toLowerCase().includes(term);

    const matchesCategory =
      selectedCategory === "All" || skill.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const saveMutation = useMutation({
    mutationFn: async (payload) => {
      if (editingSkillId) {
        const response = await api.put(`/skills/${editingSkillId}`, payload);
        return response.data;
      }

      const response = await api.post("/skills/add", payload);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["skills"] });
      setFormData(emptyForm);
      setEditingSkillId(null);
      setNotice(editingSkillId ? "Skill updated successfully!" : "Skill added successfully!");
    },
    onError: (error) => {
      setNotice(error.response?.data?.message || "Could not save the skill. Please try again.");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (skillId) => {
      const response = await api.delete(`/skills/${skillId}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["skills"] });
      setNotice("Skill deleted successfully!");
    },
    onError: (error) => {
      setNotice(error.response?.data?.message || "Could not delete the skill. Please try again.");
    },
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setNotice("");

    const payload = {
      name: formData.name.trim(),
      description: formData.description.trim(),
      category: formData.category.trim(),
      level: formData.level,
    };

    if (!payload.name || !payload.description || !payload.category) {
      setNotice("Please fill in all skill details.");
      return;
    }

    saveMutation.mutate(payload);
  };

  const startEditing = (skill) => {
    setEditingSkillId(skill._id);
    setFormData({
      name: skill.name || "",
      description: skill.description || "",
      category: skill.category || "",
      level: skill.level || "Beginner",
    });
    setNotice("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelEditing = () => {
    setEditingSkillId(null);
    setFormData(emptyForm);
    setNotice("");
  };

  if (isLoading) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-violet-50">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-violet-200 border-t-violet-600" />
          <p className="mt-4 font-semibold text-slate-600">Discovering skills...</p>
        </div>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-violet-50 px-5">
        <div className="rounded-3xl bg-white p-8 text-center shadow-lg">
          <p className="text-3xl">😕</p>
          <h2 className="mt-3 text-xl font-bold text-slate-800">Couldn't load skills</h2>
          <p className="mt-2 text-slate-500">Please check your connection and try again.</p>
          <button
            onClick={() => queryClient.invalidateQueries({ queryKey: ["skills"] })}
            className="mt-5 rounded-xl bg-violet-600 px-5 py-3 font-semibold text-white hover:bg-violet-700"
          >
            Try Again
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen overflow-hidden bg-gradient-to-b from-violet-50 via-white to-slate-50 text-slate-900">
      {/* Hero */}
      <section className="relative px-5 py-16 sm:px-8 sm:py-20 lg:py-24">
        <div className="pointer-events-none absolute -left-20 top-10 h-64 w-64 rounded-full bg-violet-200/40 blur-3xl" />
        <div className="pointer-events-none absolute right-0 top-20 h-72 w-72 rounded-full bg-indigo-200/40 blur-3xl" />

        <div className="relative mx-auto max-w-7xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white/80 px-4 py-2 text-sm font-semibold text-violet-700 shadow-sm">
            ✨ Skill Marketplace
          </div>

          <div className="mt-6 grid items-end gap-8 lg:grid-cols-[1.3fr_0.7fr]">
            <div>
              <h1 className="max-w-3xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                Discover skills.
                <span className="mt-2 block bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                  Share what you know.
                </span>
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
                Learn from the community, share your expertise, and find new ways to grow together.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-white bg-white/90 p-5 shadow-sm">
                <p className="text-3xl font-extrabold text-violet-700">{skills.length}</p>
                <p className="mt-1 text-sm text-slate-500">Community skills</p>
              </div>
              <div className="rounded-2xl border border-white bg-white/90 p-5 shadow-sm">
                <p className="text-3xl font-extrabold text-indigo-700">{categories.length - 1}</p>
                <p className="mt-1 text-sm text-slate-500">Skill categories</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Add / Edit form */}
      <section className="px-5 pb-16 sm:px-8">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl border border-violet-100 bg-white shadow-xl shadow-violet-100/50">
          <div className="bg-gradient-to-r from-violet-700 via-violet-600 to-indigo-600 px-6 py-6 text-white sm:px-8">
            <p className="text-sm font-medium text-violet-200">
              {editingSkillId ? "Make your changes" : "Your knowledge matters"}
            </p>
            <h2 className="mt-1 text-2xl font-bold sm:text-3xl">
              {editingSkillId ? "Update Your Skill" : "Share a New Skill"}
            </h2>
            <p className="mt-2 text-sm text-violet-100">
              Help someone learn something new today.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 sm:p-8">
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label htmlFor="skill-name" className="mb-2 block text-sm font-semibold text-slate-700">Skill name</label>
                <input
                  id="skill-name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. JavaScript"
                  required
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 outline-none transition focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-100"
                />
              </div>

              <div>
                <label htmlFor="skill-category" className="mb-2 block text-sm font-semibold text-slate-700">Category</label>
                <input
                  id="skill-category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  placeholder="e.g. Web Development"
                  required
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 outline-none transition focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-100"
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="skill-description" className="mb-2 block text-sm font-semibold text-slate-700">Description</label>
                <textarea
                  id="skill-description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="What can others learn from you?"
                  rows={3}
                  required
                  className="w-full resize-y rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 outline-none transition focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-100"
                />
              </div>

              <div>
                <label htmlFor="skill-level" className="mb-2 block text-sm font-semibold text-slate-700">Skill level</label>
                <select
                  id="skill-level"
                  name="level"
                  value={formData.level}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 outline-none transition focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-100"
                >
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>
              </div>
            </div>

            {notice && (
              <p role="status" className="mt-5 rounded-xl bg-violet-50 px-4 py-3 text-sm font-medium text-violet-800">
                {notice}
              </p>
            )}

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="submit"
                disabled={saveMutation.isPending}
                className="rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white shadow-lg shadow-violet-200 transition hover:-translate-y-0.5 hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saveMutation.isPending
                  ? "Saving..."
                  : editingSkillId
                    ? "Save Changes"
                    : "+ Add Skill"}
              </button>

              {editingSkillId && (
                <button
                  type="button"
                  onClick={cancelEditing}
                  className="rounded-xl border border-slate-200 px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      </section>

      {/* Explore skills */}
      <section className="px-5 pb-24 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-violet-600">Community Skills</p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">Explore Skills</h2>
              <p className="mt-3 text-slate-600">Find your next skill to learn or share.</p>
            </div>
            <p className="text-sm font-medium text-slate-500">
              Showing <span className="font-bold text-violet-700">{filteredSkills.length}</span> of {skills.length} skills
            </p>
          </div>

          {/* Search and category filters */}
          <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm sm:flex-row">
            <div className="relative flex-1">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg">⌕</span>
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search by skill, description or category..."
                aria-label="Search skills"
                className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(event) => setSelectedCategory(event.target.value)}
              aria-label="Filter by category"
              className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
            >
              {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          {filteredSkills.length === 0 ? (
            <div className="mt-8 rounded-3xl border border-dashed border-violet-200 bg-white px-6 py-14 text-center">
              <div className="text-4xl">🔎</div>
              <h3 className="mt-4 text-xl font-bold text-slate-800">
                {skills.length === 0 ? "No skills shared yet" : "No matching skills"}
              </h3>
              <p className="mt-2 text-slate-500">
                {skills.length === 0
                  ? "Be the first to share your knowledge with the community."
                  : "Try another search term or choose a different category."}
              </p>
              {skills.length > 0 && (
                <button
                  onClick={() => {
                    setSearch("");
                    setSelectedCategory("All");
                  }}
                  className="mt-5 rounded-xl bg-violet-50 px-5 py-2.5 font-semibold text-violet-700 hover:bg-violet-100"
                >
                  Clear filters
                </button>
              )}
            </div>
          ) : (
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filteredSkills.map((skill) => (
                <article
                  key={skill._id}
                  className="group flex h-full flex-col rounded-3xl border border-slate-100 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1.5 hover:border-violet-200 hover:shadow-xl hover:shadow-violet-100/60"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-100 to-indigo-100 text-xl text-violet-700 transition group-hover:from-violet-600 group-hover:to-indigo-600 group-hover:text-white">
                      ✦
                    </div>
                    <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700">
                      {skill.level}
                    </span>
                  </div>

                  <h3 className="mt-6 break-words text-xl font-bold text-slate-900">{skill.name}</h3>
                  <p className="mt-3 flex-1 break-words leading-7 text-slate-600">{skill.description}</p>

                  <div className="mt-5">
                    <span className="inline-flex rounded-full bg-violet-50 px-3 py-1.5 text-xs font-semibold text-violet-700">
                      {skill.category}
                    </span>
                  </div>

                  <div className="mt-6 flex gap-3 border-t border-slate-100 pt-5">
                    <button
                      type="button"
                      onClick={() => startEditing(skill)}
                      className="flex-1 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-violet-200 hover:bg-violet-50 hover:text-violet-700"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      disabled={deleteMutation.isPending}
                      onClick={() => {
                        if (window.confirm(`Delete "${skill.name}"?`)) {
                          deleteMutation.mutate(skill._id);
                        }
                      }}
                      className="flex-1 rounded-xl bg-rose-50 px-4 py-2.5 text-sm font-semibold text-rose-600 transition hover:bg-rose-100 disabled:opacity-60"
                    >
                      Delete
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default Skills;
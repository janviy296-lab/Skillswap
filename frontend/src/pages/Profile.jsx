import { useState } from "react";
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import api from "../api/api";

function Profile() {
  const [isEditing, setIsEditing] = useState(false);

  const [name, setName] = useState("");
  const [skillsToTeach, setSkillsToTeach] = useState("");
  const [skillsToLearn, setSkillsToLearn] = useState("");

  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const response = await api.get("/users/profile");
      return response.data;
    },
  });

  const updateProfileMutation = useMutation({
    mutationFn: async (updatedData) => {
      const response = await api.put("/users/profile", updatedData);
      return response.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["profile"],
      });

      setIsEditing(false);
      alert("Profile updated successfully");
    },

    onError: () => {
      alert("Failed to update profile");
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-violet-50">
        <h2 className="text-xl font-semibold text-gray-700">
          Loading profile...
        </h2>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-violet-50">
        <h2 className="text-xl font-semibold text-red-500">
          Failed to load profile
        </h2>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-violet-50 via-white to-white px-6 py-12">

      <div className="mx-auto max-w-5xl">

        {/* PROFILE HEADER */}
        <div className="mb-6 rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">

          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">

            <div className="flex items-center gap-5">

              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 text-2xl font-bold text-white shadow-lg shadow-violet-200">
                {data.user.name.charAt(0).toUpperCase()}
              </div>

              <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-violet-600">
                  My Profile
                </p>

                <h1 className="mt-1 text-2xl font-bold text-gray-900">
                  {data.user.name}
                </h1>

                <p className="mt-1 text-gray-500">
                  {data.user.email}
                </p>
              </div>

            </div>

            <button
              type="button"
              onClick={() => {
                setName(data.user.name);

                setSkillsToTeach(
                  data.user.skillsToTeach?.join(", ") || ""
                );

                setSkillsToLearn(
                  data.user.skillsToLearn?.join(", ") || ""
                );

                setIsEditing(true);
              }}
              className="rounded-xl bg-violet-600 px-5 py-3 font-semibold text-white shadow-lg shadow-violet-200 transition hover:bg-violet-700"
            >
              Edit Profile
            </button>

          </div>

        </div>


        {/* EDIT PROFILE */}
        {isEditing && (
          <div className="mb-6 rounded-3xl border border-violet-100 bg-white p-8 shadow-sm">

            <div className="mb-6">
              <p className="text-sm font-semibold uppercase tracking-widest text-violet-600">
                Update
              </p>

              <h2 className="mt-1 text-2xl font-bold text-gray-900">
                Edit Your Profile
              </h2>
            </div>

            <div className="space-y-5">

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Name
                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Skills You Can Teach
                </label>

                <input
                  type="text"
                  placeholder="e.g. JavaScript, React"
                  value={skillsToTeach}
                  onChange={(e) => setSkillsToTeach(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Skills You Want To Learn
                </label>

                <input
                  type="text"
                  placeholder="e.g. Node.js, MongoDB"
                  value={skillsToLearn}
                  onChange={(e) => setSkillsToLearn(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                />
              </div>

              <div className="flex flex-wrap gap-3">

                <button
                  type="button"
                  onClick={() => {
                    updateProfileMutation.mutate({
                      name,
                      skillsToTeach: skillsToTeach
                        .split(",")
                        .map((skill) => skill.trim())
                        .filter((skill) => skill !== ""),

                      skillsToLearn: skillsToLearn
                        .split(",")
                        .map((skill) => skill.trim())
                        .filter((skill) => skill !== ""),
                    });
                  }}
                  className="rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white transition hover:bg-violet-700"
                >
                  Save Changes
                </button>

                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="rounded-xl border border-gray-200 px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-50"
                >
                  Cancel
                </button>

              </div>

            </div>

          </div>
        )}


        {/* SKILLS */}
        <div className="grid gap-6 md:grid-cols-2">

          {/* TEACH */}
          <div className="rounded-3xl border border-violet-100 bg-white p-7 shadow-sm">

            <div className="flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-100 text-xl">
                🎓
              </div>

              <div>
                <p className="text-sm text-violet-600">
                  Share your knowledge
                </p>

                <h2 className="text-xl font-bold text-gray-900">
                  Skills I Can Teach
                </h2>
              </div>

            </div>

            {data.user.skillsToTeach?.length > 0 ? (
              <div className="mt-6 flex flex-wrap gap-2">

                {data.user.skillsToTeach.map((skill, index) => (
                  <span
                    key={index}
                    className="rounded-full bg-violet-50 px-4 py-2 text-sm font-medium text-violet-700"
                  >
                    {skill}
                  </span>
                ))}

              </div>
            ) : (
              <p className="mt-6 text-gray-500">
                No skills added yet.
              </p>
            )}

          </div>


          {/* LEARN */}
          <div className="rounded-3xl border border-indigo-100 bg-white p-7 shadow-sm">

            <div className="flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-100 text-xl">
                📚
              </div>

              <div>
                <p className="text-sm text-indigo-600">
                  Your learning goals
                </p>

                <h2 className="text-xl font-bold text-gray-900">
                  Skills I Want To Learn
                </h2>
              </div>

            </div>

            {data.user.skillsToLearn?.length > 0 ? (
              <div className="mt-6 flex flex-wrap gap-2">

                {data.user.skillsToLearn.map((skill, index) => (
                  <span
                    key={index}
                    className="rounded-full bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-700"
                  >
                    {skill}
                  </span>
                ))}

              </div>
            ) : (
              <p className="mt-6 text-gray-500">
                No learning goals added yet.
              </p>
            )}

          </div>

        </div>

      </div>

    </main>
  );
}

export default Profile;
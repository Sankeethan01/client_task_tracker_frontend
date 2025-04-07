import { useState } from "react";

type Props = {
  onSubmit: (project: ProjectInput) => void;
  clientIdOptions: { id: string; name: string }[];
  initialData?: ProjectInput;
};

export type ProjectInput = {
  name?: string;
  description?: string;
  status?: string;
  client_id: string;
  start_date?: string;
  due_date?: string;
};

export default function ProjectForm({ onSubmit, clientIdOptions, initialData }: Props) {
  const [form, setForm] = useState<ProjectInput>(
    initialData || { name: "", client_id: "", status: "active" }
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
    {/* Name */}
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        Project Name
      </label>
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Enter project name"
        className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
      />
    </div>

    {/* Description */}
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        Description
      </label>
      <textarea
        name="description"
        value={form.description || ""}
        onChange={handleChange}
        placeholder="Optional project description"
        className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm resize-y focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
      />
    </div>

    {/* Client Select */}
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        Client
      </label>
      <select
        name="client_id"
        value={form.client_id}
        onChange={handleChange}
        className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
      >
        <option value="">Select Client</option>
        {clientIdOptions.map((client) => (
          <option key={client.id} value={client.id}>
            {client.name}
          </option>
        ))}
      </select>
    </div>

    {/* Status */}
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        Status
      </label>
      <select
        name="status"
        value={form.status}
        onChange={handleChange}
        className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
      >
        <option value="active">Active</option>
        <option value="completed">Completed</option>
        <option value="on_hold">On Hold</option>
      </select>
    </div>

    {/* Dates */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Start Date
        </label>
        <input
          type="date"
          name="start_date"
          value={form.start_date || ""}
          onChange={handleChange}
          className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Due Date
        </label>
        <input
          type="date"
          name="due_date"
          value={form.due_date || ""}
          onChange={handleChange}
          className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
        />
      </div>
    </div>

    {/* Submit */}
    <button
      type="submit"
      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition"
    >
      {initialData ? "Update" : "Create"} Project
    </button>
  </form>
  );
}

import { useState } from "react";

type Props = {
  onSubmit: (client: ClientInput) => void;
  initialData?: ClientInput;
};

export type ClientInput = {
  name: string;
  email: string;
  phone: string;
};

export default function ClientForm({ onSubmit, initialData }: Props) {
  const [form, setForm] = useState<ClientInput>(
    initialData || { name: "", email: "", phone: "" }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
  <div>
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
    <input
      name="name"
      value={form.name}
      onChange={handleChange}
      placeholder="Client Name"
      className="w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
    />
  </div>
  <div>
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
    <input
      name="email"
      value={form.email}
      onChange={handleChange}
      placeholder="Email"
      className="w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
    />
  </div>
  <div>
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone</label>
    <input
      name="phone"
      value={form.phone}
      onChange={handleChange}
      placeholder="Phone"
      className="w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
    />
  </div>
  <button
    type="submit"
    className="w-full mt-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
  >
    {initialData ? "Update" : "Create"} Client
  </button>
</form>

  );
}

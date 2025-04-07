'use client';

import { useEffect, useState } from 'react';
import api from '@/api/route';
import ProjectForm, { ProjectInput } from '@/components/ProjectForm';
import Modal from '@/components/model';

type Client = { id: string; name: string };
type Project = ProjectInput & { id: string };

export default function Projects() {

  const [projects, setProjects] = useState<Project[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [filteredClient, setFilteredClient] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  // 🔹 Fetch projects
  const fetchProjects = async () => {
    try {
      const res = await api.get<Project[]>('/projects');
      setProjects(res.data);
    } catch (err) {
      console.error('Failed to fetch projects:', err);
    }
  };

  // 🔹 Fetch clients for dropdown
  const fetchClients = async () => {
    try {
      const res = await api.get<Client[]>('/clients');
      setClients(res.data);
    } catch (err) {
      console.error('Failed to fetch clients:', err);
    }
  };

  // 🔹 Handle create / update
  const handleSubmit = async (form: ProjectInput) => {
    try {
      if (editingProject) {
        const res = await api.put(`/projects/${editingProject.id}`, form);
        setProjects((prev) =>
          prev.map((p) => (p.id === editingProject.id ? res.data : p))
        );
      } else {
        const res = await api.post('/projects', form);
        setProjects((prev) => [res.data, ...prev]);
      }
      setShowForm(false);
      setEditingProject(null);
    } catch (err) {
      console.error('Error saving project:', err);
    }
  };

  // 🔹 Delete
  const handleDelete = async (id: string) => {
    if (!confirm('Delete this project?')) return;
    try {
      await api.delete(`/projects/${id}`);
      setProjects((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error('Failed to delete project:', err);
    }
  };

  useEffect(() => {
    fetchProjects();
    fetchClients();
  }, []);

  // Filter projects if a client is selected
  const visibleProjects = filteredClient
    ? projects.filter((p) => p.client_id === filteredClient)
    : projects;


  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Projects</h1>
          <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
            A list of all projects including their name, client, status, and due date.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            onClick={() => {
              setEditingProject(null);
              setShowForm(true);
            }}
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-auto"
          >
            New Project
          </button>
        </div>
      </div>
     
     {/* Client Filter */}
      <div>
        <label htmlFor="client" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Filter by Client
        </label>
        <select
          id="client"
          name="client"
          onChange={(e) => setFilteredClient(e.target.value)}
          value={filteredClient}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-white"
        >
          <option value="">All Clients</option>
          {clients.map((client) => (
            <option key={client.id} value={client.id}>
              {client.name}
            </option>
          ))}
        </select>
      </div>

      {/* Modal for Create / Edit */}
      {showForm && (
        <Modal
          title={editingProject ? 'Edit Project' : 'New Project'}
          onClose={() => {
            setShowForm(false);
            setEditingProject(null);
          }}
        >
          <ProjectForm
            initialData={editingProject ?? undefined}
            onSubmit={handleSubmit}
            clientIdOptions={clients}
          />
        </Modal>
      )}

      {/* Table */}
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
              <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-white sm:pl-6">
                      Name
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                      Client
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                      Status
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                      Due Date
                    </th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-900">
                {visibleProjects.map((project) => (
                    <tr key={project.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 dark:text-white sm:pl-6">
                       {project.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                      {clients.find((c) => c.id === project.client_id)?.name ?? '—'}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm">
                      <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5
                          ${project.status === 'completed' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                            : project.status === 'on_hold' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                              : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'}`}>
                          {project.status}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                      {project.due_date || '—'}
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <button
                        onClick={() => {
                          setEditingProject(project);
                          setShowForm(true);
                        }}
                        className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 mr-4">
                          Edit
                        </button>
                        <button 
                        onClick={() => handleDelete(project.id)}
                        className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                  {visibleProjects.length === 0 && (
                    <tr>
                      <td colSpan={5} className="text-center text-sm py-4 text-gray-500">
                        No projects found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
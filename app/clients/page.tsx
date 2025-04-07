'use client';

import {useState,useEffect} from 'react';
import api from '@/api/route';
import ClientForm, { ClientInput } from '@/components/ClientForm';
import Modal from '@/components/model';

type Client = ClientInput & { id: string };

export default function Clients() {

  const [clients, setClients] = useState<Client[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);

  // Fetch clients from the API
  const fetchClients = async () => {
    try {
      const response = await api.get<Client[]>('/clients');
      setClients(response.data);
    }
    catch (error) {
      console.error('Error fetching clients:', error);
    }
  };

  // POST or PUT request to create or update a client
  const handleClientSubmit = async (form: ClientInput) => {
    try{
      if (editingClient) {
        // Update existing client
        const res = await api.put(`/clients/${editingClient.id}`, form);
        setClients((prev) =>
          prev.map((client) => (client.id === editingClient.id ? res.data : client))  
        );
      } else {
        // Create new client
        const res = await api.post('/clients', form);
        setClients((prev) => [...prev, res.data]);
      }
      setShowForm(false);
      setEditingClient(null);
    }
    catch (error) {
      console.error('Error submitting client:', error);
    }
  };

  // delete a client
  const handleDeleteClient = async (id: string) => {
    if(!confirm('Are you sure you want to delete this client?')) return;
    try {
      await api.delete(`/clients/${id}`);
      setClients((prev) => prev.filter((client) => client.id !== id));
    }
    catch (error) { 
      console.error('Error deleting client:', error);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);


  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Clients</h1>
          <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
            A list of all clients including their name, email, and phone number.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-auto cursor-pointer"
            onClick={() => {
              setEditingClient(null);
              setShowForm(true);
            } }
          >
            New Client
          </button>
        </div>
      </div>

      {/* Show the form when showForm is true */}
      {showForm && (
  <Modal
    title={editingClient ? "Edit Client" : "New Client"}
    onClose={() => {
      setShowForm(false);
      setEditingClient(null);
    }}
  >
    <ClientForm
      initialData={editingClient ?? undefined}
      onSubmit={handleClientSubmit}
    />
  </Modal>
)}


      {/* Client table */}

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
                      Email
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                      Phone
                    </th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-900">
                  {clients.map((client) => (
                    <tr key={client.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 dark:text-white sm:pl-6">
                        {client.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                        {client.email}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                        {client.phone}
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <button className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 mr-4 cursor-pointer"
                          onClick={() => {
                            setEditingClient(client);
                            setShowForm(true);
                          } } >
                          Edit
                        </button>
                        <button className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 cursor-pointer"
                        onClick={() => handleDeleteClient(client.id) }
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                  {clients.length === 0 && (
                    <tr>
                      <td colSpan={4} className="px-4 py-4 text-center text-sm text-gray-500">  
                        No clients found.
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
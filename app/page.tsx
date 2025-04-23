//import Image from "next/image";
"use client";
import api from "@/api/route";
interface Project {
  id: string;
  name: string;
  client?: { name: string };
  status: string;
}
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [clientCount, setClientCount] = useState(0);
  const [projectCount, setProjectCount] = useState(0);
  const [taskCount, setTaskCount] = useState(0);
  const [recentProjects, setRecentProjects] = useState<Project[]>([]);
  const [taskOverview, setTaskOverview] = useState<{
    total: number;
    inProgress: number;
  }>({
    total: 0,
    inProgress: 0,
  });

  const fetchClientNo = async () => {
    try {
      const response = await api.get("/clients/count");
      console.log("client count Response:", response.data);
      setClientCount(response.data.totalCount);
    } catch (error) {
      console.error("Error fetching no of clients:", error);
    }
  };

  const fetchProjectNo = async () => {
    try {
      const response = await api.get("/projects/count");
      console.log("projects count Response:", response.data);
      setProjectCount(response.data.totalCount);
    } catch (error) {
      console.error("Error fetching no of projects:", error);
    }
  };

  const fetchTaskNo = async () => {
    try {
      const response = await api.get("/tasks/count");
      console.log("tasks count Response:", response.data);
      setTaskCount(response.data.totalCount);
    } catch (error) {
      console.error("Error fetching no of tasks:", error);
    }
  };

  const fetchRecent = async () => {
    try {
      const res = await api.get("/projects/recent");
      console.log("recent projects Response:", res.data);
      setRecentProjects(res.data);
    } catch (err) {
      console.error("Failed to fetch recent projects:", err);
    }
  };

  const fetchTaskOverview = async () => {
    try {
      const res = await api.get('/tasks/overview');
      setTaskOverview(res.data);
    } catch (err) {
      console.error('Error fetching task overview:', err);
    }
  };

  useEffect(() => {
    fetchClientNo();
    fetchProjectNo();
    fetchTaskNo();
    fetchRecent();
    fetchTaskOverview();
  }, []);

  const percentage = taskOverview.total
  ? Math.round((taskOverview.inProgress / taskOverview.total) * 100)
  : 0;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
              Clients
            </dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900 dark:text-white">
              {clientCount}
            </dd>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
              Projects
            </dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900 dark:text-white">
              {projectCount}
            </dd>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
              Tasks
            </dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900 dark:text-white">
              {taskCount}
            </dd>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Recent Projects
            </h3>
            <div className="mt-4">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Client
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {recentProjects.map((project) => (
                    <tr key={project.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {project.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {project.client?.name ?? "—"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {project.status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Tasks Overview
            </h3>
            <div className="mt-4">
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200 dark:text-blue-200 dark:bg-blue-800">
                      In Progress
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold inline-block text-blue-600 dark:text-blue-200">
                      {percentage}%
                    </span>
                  </div>
                </div>
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200 dark:bg-blue-800">
                  <div
                    style={{ width: `${percentage}%` }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

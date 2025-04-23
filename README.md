# Client Task Tracker – Frontend

A modern and responsive web interface for managing clients, projects, and tasks, built using **Next.js**, **TypeScript**, and **Tailwind CSS**.

## 🌐 Live URL

Hosted on [Vercel](https://vercel.com)  
👉 (https://client-task-tracker-frontend.vercel.app/)

 **Tech Stack**

- **Next.js 15+** with App Router
- **TypeScript** – Type safety and maintainability
- **Tailwind CSS** – Fast, utility-first styling
- **Axios** – For API calls to backend
- **Responsive UI** – Mobile-first, dark mode supported

## 🚀 Features

- Manage clients: Add, update, and delete clients.
- Manage projects: Link projects to clients, track status and due dates.
- Manage tasks: Assign to projects, update statuses, and prioritize.
- Dashboard: Visual summary with progress bars and project/task highlights.

## 🛠️ Getting Started

```bash
# 1. Clone the repository
git clone https://github.com/your-username/client-task-tracker-frontend.git
cd client-task-tracker-frontend

# 2. Install dependencies
npm install

# 3. Set environment variables (you need NEXT_PUBLIC_API_BASE_URL, normally you can pointout http://localhost:3000/)
touch .env.local

# Add your API base URL
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/

# 4. Run the development server
npm run dev

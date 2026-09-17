Quiz Builder

A full-stack app for creating quizzes with True/False, short answer and multiple choice questions.

Stack: Next.js, React, TypeScript, Express, Prisma, SQLite.

Requirements

Node.js 20.9 or newer.

Backend
bash
cd backend
npm install
cp .env.example .env
Database setup

The project uses SQLite, so no database server is needed. This command creates the database file and applies migrations:

bash
npm run db:migrate
Start
bash
npm run dev

The API runs at http://localhost:4000.

Frontend

In a second terminal:

bash
cd frontend
npm install
cp .env.example .env
npm run dev

Open http://localhost:3000.

Create a sample quiz

Run the seed script from the backend folder:

bash
npm run db:seed

It adds two sample quizzes. You can also create a quiz manually at http://localhost:3000/create.
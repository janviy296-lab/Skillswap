SkillSwap — Skill Exchange Platform

Table of Contents

- "Overview" (#overview)
- "Core Features" (#core-features)
- "Tech Stack" (#tech-stack)
- "System Architecture" (#system-architecture)
- "Folder Structure" (#folder-structure)
- "Getting Started" (#getting-started)
- "Environment Variables" (#environment-variables)
- "Future Scope" (#future-scope)

Overview

SkillSwap is a MERN stack web application designed to help people exchange knowledge and learn skills from each other. Users can share skills they teach, discover skills they want to learn, connect with suitable learning partners, and manage their learning journey.

Core Features

- User Authentication: Register and log in to an account.
- Profile Management: Manage personal information and teaching/learning skills.
- Skill Management: Add, explore, update, and delete skills.
- Skill Matching: Find potential learning partners based on skills.
- Real-Time Chat: Communicate with other users.
- Learning Sessions: Schedule and manage skill-sharing sessions.
- Reviews and Ratings: Share feedback about learning partners.
- AI Learning Assistant: Generate personalized learning roadmaps using Google Gemini AI.
- Progress Tracking: Track learning progress.
- Skill Assessment: Use the assessment feature to support skill development.

Tech Stack

Technology| Purpose
React.js| User interface
Tailwind CSS| Styling and responsive design
JavaScript| Frontend and backend logic
Node.js| Backend runtime
Express.js| REST API and server
MongoDB| Database
JWT| Authentication
Socket.IO| Real-time communication
Google Gemini API| AI-generated learning roadmaps
Axios| HTTP requests
TanStack Query| Server-state and API data management

System Architecture

SkillSwap follows a client-server architecture.

1. Frontend: React provides the pages and components users interact with.
2. Backend: Express.js handles API requests, application logic, and authentication.
3. Database: MongoDB stores application data.
4. External AI Service: Google Gemini API generates learning roadmaps.
5. Real-Time Communication: Socket.IO supports chat functionality.

The frontend communicates with the backend through HTTP API requests. The backend processes requests and interacts with the database or external AI service when required.

Folder Structure

skillswap/
├── frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── vite.config.js
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
├── .gitignore
└── README.md

Getting Started

Prerequisites

- Node.js and npm
- MongoDB database
- Google Gemini API key for the AI feature

1. Set Up the Backend

Open a terminal in the "backend" directory and install dependencies:

npm install

Create or update "backend/.env" with the environment variables required by the backend.

Start the backend using the script configured in "backend/package.json". For example:

npm run dev

2. Set Up the Frontend

Open a separate terminal in the "frontend" directory:

npm install
npm run dev

Open the local URL shown in the terminal to access SkillSwap.

Environment Variables

The backend uses environment variables for configuration. Depending on the backend code, these may include:

Variable| Purpose
"PORT"| Backend server port
"MONGO_URI"| MongoDB connection string
"JWT_SECRET"| Secret used for JWT authentication
"GEMINI_API_KEY"| API key for Google Gemini

Use the exact variable names expected by your backend configuration. Keep ".env" private and never commit API keys, database credentials, or JWT secrets to GitHub.

Future Scope

- Improved skill recommendations and matching.
- More detailed learning analytics.
- Enhanced user experience and accessibility.
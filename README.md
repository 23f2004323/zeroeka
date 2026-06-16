# LearnTrack - Learning Progress Tracker

A full-stack web application that helps students track their learning progress across courses with AI-powered topic explanations.

### Features

-  Track topics with status (Not Started / In Progress / Completed)
-  Real-time progress dashboard with percentage completion
-  AI-powered explanations using Groq's Llama 4 model
-  Add, update, and delete topics
-  Filter topics by category
-  Persistent MongoDB storage

### Tech Stack

| Technology | Purpose |
|------------|---------|
| React 18 + Vite | Frontend UI |
| Node.js + Express | Backend API |
| MongoDB + Mongoose | Database |
| Groq AI (Llama 4) | AI explanations |

### Prerequisites

- Node.js (v18 or higher)
- MongoDB Atlas account (free) or local MongoDB
- Groq API key from [console.groq.com](https://console.groq.com)

###Installation

### 1. Clone the repository
```bash
git clone https://github.com/23f2004323/learntrack-app.git
cd learntrack-app
2. Install Backend Dependencies
bash
cd server
npm install
3. Install Frontend Dependencies
bash
cd ../client
npm install
4. Environment Variables
Create .env file in the server folder:

env
PORT=5000
MONGODB_URI=your_mongodb_connection_string_here
GROQ_API_KEY=your_groq_api_key_here
5. Start the Application
Terminal 1 - Backend:

bash
cd server
npm run dev
Terminal 2 - Frontend:

bash
cd client
npm run dev
6. Open Browser
Navigate to http://localhost:3000

### Project Structure
text
learntrack/
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
├── server/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
└── README.md
### API Endpoints
Method	Endpoint	Description
GET	/api/topics	Get all topics
POST	/api/topics	Create new topic
PATCH	/api/topics/:id	Update topic status
DELETE	/api/topics/:id	Delete topic
POST	/api/topics/:id/explain	Get AI explanation
### Features
Topic Management
Create topics with name, category, and status

Update status using dropdown

Delete topics with confirmation

Filter by category

Progress Dashboard
Total topics count

Completed/In Progress/Not Started breakdown

Visual progress bar with percentage

Real-time updates

AI Explanations
Click "What is this?" on any topic

Powered by Groq's Llama 4 model

Student-friendly explanations

###Database Schema
javascript
{
  name: String,
  category: String,
  status: String,
  createdAt: Date,
  updatedAt: Date
}
### What I'd Improve
User authentication with JWT

Study timer integration

Export progress as PDF

Quiz generation for topics

Dark mode support

### Screenshots
Dashboard View
https://screenshot-1.png

AI Explanation
https://screenshot-2.png

### Author
Komal
BS Data Science @ IIT Madras (2028)

###Troubleshooting
Issue	Solution
MongoDB connection error	Check MongoDB is running
Groq API error	Verify API key in .env
Modules not found	Run npm install in both folders
Built for ZeroEka Full-Stack Intern Trial Task

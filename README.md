# Resume Matcher & Skill Gap Analyzer - Frontend

A modern React-based frontend for the Resume Matcher & Skill Gap Analyzer application.

This application allows users to upload their resumes, analyze skills, view matching job opportunities, and identify skill gaps through an interactive dashboard.

## Features

- PDF Resume Upload
- Drag & Drop Support
- Resume Skill Extraction Display
- Job Match Recommendations
- Skill Gap Analysis
- Compatibility Score Visualization
- Responsive User Interface
- FastAPI Backend Integration

## Tech Stack

- React.js
- JavaScript
- Axios
- CSS
- Chart.js / Recharts (if used)
- Vite

## Project Structure
src/
│
├── components/
│ ├── UploadZone
│ ├── SkillsPanel
│ ├── JobMatches
│ ├── GapAnalysis
│ └── ScoreChart
│<br>
├── services/
│ └── api.js
│<br>
├── App.jsx
└── main.jsx

**Install Dependencies
<br>
npm install
<br>
**Run Development Server
<br>
npm run dev

**Application will run on:

http://localhost:5173

**Backend Configuration

Update API URL inside:

src/services/api.js

**Example:

const BASE_URL = "https://your-backend.onrender.com";

**Deployment

Frontend is deployed using Vercel.

**Future Enhancements
<br>
ATS Score Calculation
Course Recommendations
User Authentication
Real-Time Job Listings
Mobile Application

**Author

Riya Ranaware
M.Sc. Data Science

**License

This project is developed for educational and learning purposes.


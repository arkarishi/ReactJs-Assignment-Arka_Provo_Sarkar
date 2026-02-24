# ReactJS Employee Dashboard

A 4-screen React application showcasing dynamic data visualization, interactive map rendering, and a camera capture feature. Built as part of a ReactJS Assignment.

## 📺 Project Walkthrough

Watch the complete end-to-end screen recording to see the application in action:
[View Project Demo on Loom](https://www.loom.com/share/3bf552ca2d6e43c1a5873527cb9f45a0)

## ✨ key Features

- **Screen 1: Secure Login**
  - Sleek glassmorphism UI.
  - Form validation with hardcoded credentials (`testuser` / `Test123`).
  - Stores local authentication state upon success.
  <br/>
  <img src="/screenshots/login.png" alt="Login Screen" width="600"/>

- **Screen 2: Employee Dashboard**
  - Fetches and displays data from the provided REST API.
  - Searchable employee directory table.
  - Interactive map integration plotting office locations using `react-leaflet`.
  - Responsive Top 10 Salaries Bar Chart rendered using `recharts`.
  <br/>
  <img src="/screenshots/dashboard.png" alt="Dashboard Screen" width="600"/>
  <img src="/screenshots/charts.png" alt="Charts View" width="600"/>
  <img src="/screenshots/map.png" alt="Locations Map View" width="600"/>

- **Screen 3: Profile & Camera Integration**
  - Individual profile card with full details (Location, Ext, Salary, Start Date).
  - Hardware integration via `react-webcam` allowing users to capture an identity verification photo.

- **Screen 4: Photo Result**
  - Clean view to review the captured photo.
  - Easy options to retake the image or navigate back to the dashboard.
  <br/>
  <img src="/screenshots/details_camera.png" alt="Photo Result Screen" width="600"/>

## 🚀 Technologies Used
- **React.js (Vite)**
- **React Router** for routing between the 4 screens.
- **Lucide React** for beautiful minimalist icons.
- **Recharts** for rendering data charts.
- **React-Leaflet** for rendering dynamic maps.
- **React Webcam** for capturing photo identities.

## 💻 Running the Project Locally

1. Clone or download the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open the displayed local host link (typically `http://localhost:5173`) in your browser.

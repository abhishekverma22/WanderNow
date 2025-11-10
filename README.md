# WanderNow 🌍✈️

**WanderNow**is a modern travel web application designed to help users explore
trips, discover destinations, and plan their travels efficiently. It provides a
user-friendly interface with dynamic trip data, real-time updates, and secure
Google OAuth authentication.

The app is suitable for travelers, students, and developers learning modern web
technologies.

## Project Type

Frontend | Backend (Firebase)

## **Project Overview**

WanderNow was developed to provide an intuitive platform for travelers to
**explore trips and itineraries**, **save favorites**, and **authenticate
securely with Google**.  
It combines modern **frontend technologies** and **cloud backend services** to
deliver:

- **Fast and responsive UI:** TailwindCSS ensures mobile-first design and smooth
  animations.
- **Real-time data management:** Firebase Firestore allows users to see trip
  updates instantly.
- **Secure authentication:** Google OAuth ensures users’ accounts are safe.
- **Easy deployment:** Vite provides optimized builds for modern browsers.

The project is ideal for students and developers learning **React modular
architecture, Firebase integration, and deployment pipelines**.

---

## **Features**

- User Authentication - Secure Google OAuth login for users - Firebase
  Authentication ensures secure access - Role-based access for admins and normal
  users

- Trip Browsing - Explore trips by traveler type (Solo, Couple, Family,
  Friends) - Dynamic content rendering based on traveler type - Detailed trip
  pages with information and visuals

- Real-Time Data - All trip data and user actions are synced using Firebase
  Firestore - Changes appear instantly across the app

- Interactive UI - Responsive design using Tailwind CSS - Smooth animations with
  Framer Motion - Live notifications using React Toastify

- API Integration - Google OAuth API for authentication - Optional integrations
  with Google Maps API for location-based trip suggestions

- Additional Features - Modular component-based React architecture - Optimized
  builds with Vite chunking - Live footer clock on some pages (example: Rick and
  Morty Wiki project inspiration) - Clean and modern UI design

- **Google OAuth Login** – Secure sign-in using Google accounts
- **Trip Browsing** – Users can explore trips by category and type
- **Firestore Integration** – Store user and trip data with real-time updates
- **Responsive Design** – Works perfectly across mobile, tablet, and desktop
- **Animated UI** – Framer Motion animations for a smooth user experience
- **Notifications** – React Toastify for instant feedback on actions
- **Optimized Builds** – Vite’s chunking strategy reduces load time
- **Error Handling** – Robust error notifications for login and data fetching

---

## **Tech Stack**

- **Frontend:** React, Vite, TailwindCSS, Framer Motion
- **Authentication:** Firebase Authentication (Google Sign-In)
- **Database:** Firebase Firestore
- **APIs:** Google OAuth, Google Maps, Gemini API
- **Deployment:** Vercel
- **Utilities:** React Router DOM, Axios, React Toastify, lucide-react,
  google-gen-ai, react.google/mapapi etc..

---

## **Setup & Installation**

1. **Clone the repository**

```bash

git clone https://github.com/abhishekverma22/WanderNow.git
cd WanderNow

```

2. **Enter root directore on Wander Now and Install dependencies**

```base
npm install

```

3. **Firebase Setup**

- Go to Firebase Console and create a new project.
- Enable Authentication → Google Sign-In for users.
- Create a Firestore Database to store trips, users, and other data.
- Copy your Firebase config credentials and replace them in
- src/services/FireBaseConfig.js:

4. **Set up environment variables**

- Create a .env file in the project root:

```env

VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id

```

4. Ready to run

```bash
npm run dev
```

## **Folder Structure**

![File and Folder Structure](./src/assets/fileAndFloder.png)

## Usage

- Users can sign in with Google.
- Browse trips based on traveler type (Solo, Couple, Family, Friends).
- View detailed trip pages with images, descriptions, and itineraries.
- Admins can manage trips and monitor user activity (if extended).
- Real-time updates ensure any changes in trips or user data are instantly
  reflected.
- Include screenshots for key pages if possible for better presentation.

## Screenshots

### Login Page

![Login Page](/login-page.webp)

### Trip Creation Page

![Trip Creation Page](/Trip-create-page.webp)

### View Trip Details

![View Trip Details](/view-trip-details.webp)

### Daily Itinerary - Part 1

![Daily Itinerary 1](/view-trip-details-daily-itineray-1.webp)

### Daily Itinerary - Part 2

![Daily Itinerary 2](/view-trip-details-daily-itineray-2.webp)

### Daily Itinerary - Part 3

![Daily Itinerary 3](/view-trip-details-daily-itineray-3.webp)

### All Trips Overview

![All Trips Overview](/Show-you-all-trip.webp)

## Technology Stack

### Frontend

- **React.js** – Core library for building dynamic user interfaces
- **React Router DOM** – Handles routing for multiple pages
- **Tailwind CSS** – Responsive and modern UI
- **Framer Motion** – Smooth animations
- **React Toastify** – Notifications
- **React Icons & Lucide React** – Scalable vector icons

### Backend / Database

- **Firebase Authentication** – Secure login system
- **Firebase Firestore** – Real-time database for trips, users, and
  notifications
- **Firebase Storage (Optional)** – Store images or media

### Development Tools

- **Node.js** – Runtime environment for npm
- **npm** – Dependency management
- **VS Code** – Recommended editor

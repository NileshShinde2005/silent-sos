# Silent SOS 🚨

Silent SOS is a web-based emergency safety application designed to help users quickly send an SOS alert and manage their emergency contacts.

The application provides a simple and accessible interface where users can trigger an emergency alert using a press-and-hold SOS button, manage emergency contacts, view alert history, and control safety-related settings.

## 🌐 Live Demo

https://silent-sos-sigma.vercel.app/

## ✨ Features

- 🚨 Press-and-hold SOS button to trigger an emergency alert
- ⏱️ SOS progress indicator during activation
- 📍 Location sharing using browser geolocation
- 👥 Add, edit, delete and manage emergency contacts
- ⭐ Set a primary emergency contact
- 📊 Dynamic emergency contact count
- 📋 View previous emergency alerts
- ✅ Mark alerts as resolved
- 🗑️ Clear alert history
- 👤 Edit and manage user profile
- ⚙️ Safety and application settings
- 💾 LocalStorage-based data persistence
- 📱 Responsive design for different screen sizes
- 🧭 React-based navigation between application pages

## 🖥️ Application Pages

- Landing Page
- Login
- Register
- Dashboard
- Emergency Contacts
- Alert History
- Profile
- Settings

## 🛠️ Technologies Used

- React.js
- Vite
- JavaScript
- HTML5
- CSS3
- React Router
- Lucide React Icons
- Browser Geolocation API
- LocalStorage
- Git & GitHub
- Vercel

## 📁 Project Structure

```text
silent-sos/
│
├── public/
│
├── src/
│   ├── components/
│   │   └── Navbar.jsx
│   │
│   ├── pages/
│   │   ├── LandingPage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── RegisterPage.jsx
│   │   ├── DashboardPage.jsx
│   │   ├── EmergencyContactsPage.jsx
│   │   ├── AlertHistory.jsx
│   │   ├── ProfilePage.jsx
│   │   └── SettingsPage.jsx
│   │
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
│
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
├── vercel.json
└── README.md
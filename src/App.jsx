import "./App.css";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import EmergencyContactsPage from "./pages/EmergencyContactsPage";
import AlertHistory from "./pages/AlertHistory";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<LandingPage />}
        />

        <Route
          path="/login"
          element={<LoginPage />}
        />

        <Route
          path="/register"
          element={<RegisterPage />}
        />

        <Route
          path="/dashboard"
          element={<DashboardPage />}
        />

        <Route
          path="/contacts"
          element={<EmergencyContactsPage />}
        />

        <Route
          path="/history"
          element={<AlertHistory />}
        />

        <Route
          path="/profile"
          element={<ProfilePage />}
        />

        <Route
          path="/settings"
          element={<SettingsPage />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
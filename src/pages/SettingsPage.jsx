import { useState } from "react";
import {
  ArrowLeft,
  Bell,
  Check,
  History,
  LayoutDashboard,
  LogOut,
  MapPin,
  RotateCcw,
  Settings,
  ShieldCheck,
  UserRound,
  Users,
} from "lucide-react";
import "./SettingsPage.css";

const DEFAULT_SETTINGS = {
  emergencyAlerts: true,
  locationSharing: true,
  browserNotifications: false,
};

function SettingsPage() {
  const loadSettings = () => {
    try {
      const saved = JSON.parse(
        localStorage.getItem("silentSOSSettings")
      );

      return {
        ...DEFAULT_SETTINGS,
        ...(saved || {}),
      };
    } catch {
      return DEFAULT_SETTINGS;
    }
  };

  const [settings, setSettings] = useState(loadSettings);
  const [saved, setSaved] = useState(false);

  const user = (() => {
    try {
      return JSON.parse(
        localStorage.getItem("silentSOSUser")
      );
    } catch {
      return null;
    }
  })();

  const userName = user?.name || "User";
  const initial = userName.charAt(0).toUpperCase();

  const updateSetting = (key) => {
    setSettings((current) => {
      const updated = {
        ...current,
        [key]: !current[key],
      };

      localStorage.setItem(
        "silentSOSSettings",
        JSON.stringify(updated)
      );

      return updated;
    });

    setSaved(true);
  };

  const resetSettings = () => {
    const confirmed = window.confirm(
      "Reset all Silent SOS settings to their default values?"
    );

    if (!confirmed) return;

    localStorage.setItem(
      "silentSOSSettings",
      JSON.stringify(DEFAULT_SETTINGS)
    );

    setSettings(DEFAULT_SETTINGS);
    setSaved(true);
  };

  const clearAppData = () => {
    const confirmed = window.confirm(
      "This will remove your saved contacts, alert history, profile changes, and settings from this browser. Continue?"
    );

    if (!confirmed) return;

    localStorage.removeItem("silentSOSContacts");
    localStorage.removeItem("silentSOSAlertHistory");
    localStorage.removeItem("silentSOSActiveAlert");
    localStorage.removeItem("silentSOSSettings");

    setSettings(DEFAULT_SETTINGS);
    setSaved(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("silentSOSLoggedIn");
    window.location.href = "/login";
  };

  return (
    <div className="settings-page">
      <aside className="settings-sidebar">
        <div className="settings-logo">
          <div className="settings-logo-icon">
            <ShieldCheck size={20} />
          </div>
          <span>Silent SOS</span>
        </div>

        <nav className="settings-nav">
          <p className="settings-nav-label">MENU</p>

          <a href="/dashboard" className="settings-nav-item">
            <LayoutDashboard size={17} />
            <span>Dashboard</span>
          </a>

          <a href="/contacts" className="settings-nav-item">
            <Users size={17} />
            <span>Emergency Contacts</span>
          </a>

          <a href="/history" className="settings-nav-item">
            <History size={17} />
            <span>Alert History</span>
          </a>

          <p className="settings-nav-label settings-nav-label-space">
            ACCOUNT
          </p>

          <a href="/profile" className="settings-nav-item">
            <UserRound size={17} />
            <span>Profile</span>
          </a>

          <a href="/settings" className="settings-nav-item active">
            <Settings size={17} />
            <span>Settings</span>
          </a>
        </nav>

        <div className="settings-sidebar-bottom">
          <div className="settings-sidebar-help">
            <ShieldCheck size={16} />
            <div>
              <strong>You're protected</strong>
              <span>Safety network ready</span>
            </div>
          </div>

          <button
            className="settings-logout-button"
            onClick={handleLogout}
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </aside>

      <main className="settings-main">
        <header className="settings-header">
          <p>YOUR SAFETY DASHBOARD</p>

          <div className="settings-header-user">
            <div className="settings-header-avatar">
              {initial}
            </div>

            <div>
              <strong>{userName}</strong>
              <span>Protected</span>
            </div>
          </div>
        </header>

        <div className="settings-content">
          <a href="/dashboard" className="settings-back-link">
            <ArrowLeft size={14} />
            Back to dashboard
          </a>

          <div className="settings-title">
            <p className="settings-kicker">PREFERENCES</p>
            <h1>Settings</h1>
            <p>
              Control how Silent SOS behaves during an emergency.
            </p>
          </div>

          <section className="settings-card">
            <div className="settings-card-heading">
              <div>
                <h2>Emergency preferences</h2>
                <p>
                  These settings are saved on this device.
                </p>
              </div>

              {saved && (
                <span className="settings-saved">
                  <Check size={13} />
                  Saved
                </span>
              )}
            </div>

            <div className="settings-option">
              <div className="settings-option-icon emergency-setting-icon">
                <ShieldCheck size={18} />
              </div>

              <div className="settings-option-copy">
                <strong>Emergency alerts</strong>
                <span>
                  Keep the SOS emergency feature enabled.
                </span>
              </div>

              <button
                type="button"
                className={
                  settings.emergencyAlerts
                    ? "settings-toggle on"
                    : "settings-toggle"
                }
                onClick={() => updateSetting("emergencyAlerts")}
                aria-label="Toggle emergency alerts"
                aria-pressed={settings.emergencyAlerts}
              >
                <span></span>
              </button>
            </div>

            <div className="settings-option">
              <div className="settings-option-icon location-setting-icon">
                <MapPin size={18} />
              </div>

              <div className="settings-option-copy">
                <strong>Location sharing</strong>
                <span>
                  Allow the app to request your current location when SOS is activated.
                </span>
              </div>

              <button
                type="button"
                className={
                  settings.locationSharing
                    ? "settings-toggle on"
                    : "settings-toggle"
                }
                onClick={() => updateSetting("locationSharing")}
                aria-label="Toggle location sharing"
                aria-pressed={settings.locationSharing}
              >
                <span></span>
              </button>
            </div>

            <div className="settings-option">
              <div className="settings-option-icon notification-setting-icon">
                <Bell size={18} />
              </div>

              <div className="settings-option-copy">
                <strong>Browser notifications</strong>
                <span>
                  Allow browser notifications for supported safety events.
                </span>
              </div>

              <button
                type="button"
                className={
                  settings.browserNotifications
                    ? "settings-toggle on"
                    : "settings-toggle"
                }
                onClick={() => updateSetting("browserNotifications")}
                aria-label="Toggle browser notifications"
                aria-pressed={settings.browserNotifications}
              >
                <span></span>
              </button>
            </div>
          </section>

          <section className="settings-card">
            <div className="settings-card-heading">
              <div>
                <h2>App data</h2>
                <p>
                  Manage the information stored locally by this prototype.
                </p>
              </div>
            </div>

            <div className="settings-data-row">
              <div className="settings-option-icon reset-setting-icon">
                <RotateCcw size={18} />
              </div>

              <div className="settings-option-copy">
                <strong>Reset settings</strong>
                <span>
                  Return emergency preferences to their default values.
                </span>
              </div>

              <button
                type="button"
                className="settings-secondary-button"
                onClick={resetSettings}
              >
                Reset
              </button>
            </div>

            <div className="settings-data-row danger-row">
              <div className="settings-option-icon danger-setting-icon">
                <RotateCcw size={18} />
              </div>

              <div className="settings-option-copy">
                <strong>Clear app data</strong>
                <span>
                  Remove contacts, alert history, active alert and local settings.
                </span>
              </div>

              <button
                type="button"
                className="settings-danger-button"
                onClick={clearAppData}
              >
                Clear data
              </button>
            </div>
          </section>

          <div className="settings-note">
            <ShieldCheck size={15} />
            <span>
              Silent SOS is currently a frontend prototype. Browser permissions and device capabilities still apply.
            </span>
          </div>
        </div>
      </main>
    </div>
  );
}

export default SettingsPage;

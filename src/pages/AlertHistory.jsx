import { useState } from "react";
import {
  ArrowLeft,
  Clock3,
  History,
  LayoutDashboard,
  LogOut,
  MapPin,
  Settings,
  ShieldCheck,
  Trash2,
  UserRound,
  Users,
} from "lucide-react";
import "./AlertHistory.css";

function AlertHistory() {
  const [alerts, setAlerts] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem("silentSOSAlertHistory")
      ) || [];
    } catch {
      return [];
    }
  });

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

  const handleLogout = () => {
    localStorage.removeItem("silentSOSLoggedIn");
    window.location.href = "/login";
  };

  const clearHistory = () => {
    const confirmed = window.confirm(
      "Are you sure you want to clear your alert history?"
    );

    if (!confirmed) return;

    localStorage.removeItem("silentSOSAlertHistory");
    setAlerts([]);
  };

  const formatDate = (value) => {
    if (!value) return "Unknown date";

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return "Unknown date";
    }

    return date.toLocaleDateString([], {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatTime = (value) => {
    if (!value) return "Unknown time";

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return "Unknown time";
    }

    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="history-page">
      <aside className="history-sidebar">
        <div className="history-logo">
          <div className="history-logo-icon">
            <ShieldCheck size={20} />
          </div>
          <span>Silent SOS</span>
        </div>

        <nav className="history-nav">
          <p className="history-nav-label">MENU</p>

          <a
            href="/dashboard"
            className="history-nav-item"
          >
            <LayoutDashboard size={17} />
            <span>Dashboard</span>
          </a>

          <a
            href="/contacts"
            className="history-nav-item"
          >
            <Users size={17} />
            <span>Emergency Contacts</span>
          </a>

          <a
            href="/history"
            className="history-nav-item active"
          >
            <History size={17} />
            <span>Alert History</span>
          </a>

          <p className="history-nav-label history-nav-label-space">
            ACCOUNT
          </p>

          <a
            href="/profile"
            className="history-nav-item"
          >
            <UserRound size={17} />
            <span>Profile</span>
          </a>

          <a
            href="/settings"
            className="history-nav-item"
          >
            <Settings size={17} />
            <span>Settings</span>
          </a>
        </nav>

        <div className="history-sidebar-bottom">
          <div className="history-sidebar-help">
            <ShieldCheck size={16} />
            <div>
              <strong>You're protected</strong>
              <span>Safety network ready</span>
            </div>
          </div>

          <button
            className="history-logout-button"
            onClick={handleLogout}
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </aside>

      <main className="history-main">
        <header className="history-header">
          <p>YOUR SAFETY DASHBOARD</p>

          <div className="history-user">
            <div className="history-avatar">
              {userName.charAt(0).toUpperCase()}
            </div>

            <div>
              <strong>{userName}</strong>
              <span>Protected</span>
            </div>
          </div>
        </header>

        <div className="history-content">
          <a
            href="/dashboard"
            className="history-back-link"
          >
            <ArrowLeft size={14} />
            Back to dashboard
          </a>

          <div className="history-title-row">
            <div>
              <p className="history-kicker">ACTIVITY</p>
              <h1>Alert history</h1>
              <p className="history-subtitle">
                A record of your previous emergency alerts.
              </p>
            </div>

            {alerts.length > 0 && (
              <button
                className="clear-history-button"
                onClick={clearHistory}
              >
                <Trash2 size={15} />
                Clear history
              </button>
            )}
          </div>

          <section className="history-summary-card">
            <div className="history-summary-icon">
              <Clock3 size={20} />
            </div>

            <div>
              <strong>
                {alerts.length}{" "}
                {alerts.length === 1 ? "alert" : "alerts"} recorded
              </strong>
              <span>
                Your previous SOS activity is stored locally on this device.
              </span>
            </div>
          </section>

          {alerts.length === 0 ? (
            <section className="history-empty-card">
              <div className="history-empty-icon">
                <ShieldCheck size={25} />
              </div>

              <h2>No alert history</h2>

              <p>
                Resolved emergency alerts will appear here after you use
                the SOS feature.
              </p>

              <a
                href="/dashboard"
                className="history-dashboard-button"
              >
                Go to dashboard
              </a>
            </section>
          ) : (
            <section className="history-list">
              {alerts.map((alert) => (
                <article
                  className="history-alert-card"
                  key={alert.id}
                >
                  <div className="history-alert-icon">
                    <ShieldCheck size={20} />
                  </div>

                  <div className="history-alert-main">
                    <div className="history-alert-heading">
                      <div>
                        <h2>Emergency SOS alert</h2>
                        <span>
                          {formatDate(alert.time)} at{" "}
                          {formatTime(alert.time)}
                        </span>
                      </div>

                      <span className="history-resolved-badge">
                        {alert.status || "Resolved"}
                      </span>
                    </div>

                    <div className="history-alert-details">
                      <div>
                        <Clock3 size={14} />
                        <span>
                          Activated {formatTime(alert.time)}
                        </span>
                      </div>

                      <div>
                        <MapPin size={14} />
                        <span>
                          {alert.location
                            ? `${alert.location.latitude.toFixed(6)}, ${alert.location.longitude.toFixed(6)}`
                            : "Location unavailable"}
                        </span>
                      </div>
                    </div>

                    {alert.resolvedAt && (
                      <small>
                        Resolved on {formatDate(alert.resolvedAt)} at{" "}
                        {formatTime(alert.resolvedAt)}
                      </small>
                    )}
                  </div>
                </article>
              ))}
            </section>
          )}

          <div className="history-note">
            <ShieldCheck size={15} />
            <span>
              Alert history is stored locally in this frontend prototype.
            </span>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AlertHistory;

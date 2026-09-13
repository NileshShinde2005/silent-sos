import { useState } from "react";
import {
  ArrowLeft,
  Check,
  Edit3,
  History,
  LayoutDashboard,
  LogOut,
  Mail,
  Phone,
  Save,
  Settings,
  ShieldCheck,
  UserRound,
  Users,
} from "lucide-react";
import "./ProfilePage.css";

function ProfilePage() {
  const getStoredUser = () => {
    try {
      return JSON.parse(localStorage.getItem("silentSOSUser")) || {};
    } catch {
      return {};
    }
  };

  const storedUser = getStoredUser();

  const [formData, setFormData] = useState({
    name: storedUser.name || "",
    email: storedUser.email || "",
    phone: storedUser.phone || "",
  });

  const [saved, setSaved] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    setSaved(false);
  };

  const handleSave = (event) => {
    event.preventDefault();

    const updatedUser = {
      ...storedUser,
      ...formData,
    };

    localStorage.setItem(
      "silentSOSUser",
      JSON.stringify(updatedUser)
    );

    setSaved(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("silentSOSLoggedIn");
    window.location.href = "/login";
  };

  const initial = (formData.name || "U").charAt(0).toUpperCase();

  return (
    <div className="profile-page">
      <aside className="profile-sidebar">
        <div className="profile-logo">
          <div className="profile-logo-icon">
            <ShieldCheck size={20} />
          </div>
          <span>Silent SOS</span>
        </div>

        <nav className="profile-nav">
          <p className="profile-nav-label">MENU</p>

          <a href="/dashboard" className="profile-nav-item">
            <LayoutDashboard size={17} />
            <span>Dashboard</span>
          </a>

          <a href="/contacts" className="profile-nav-item">
            <Users size={17} />
            <span>Emergency Contacts</span>
          </a>

          <a href="/history" className="profile-nav-item">
            <History size={17} />
            <span>Alert History</span>
          </a>

          <p className="profile-nav-label profile-nav-label-space">
            ACCOUNT
          </p>

          <a href="/profile" className="profile-nav-item active">
            <UserRound size={17} />
            <span>Profile</span>
          </a>

          <a href="/settings" className="profile-nav-item">
            <Settings size={17} />
            <span>Settings</span>
          </a>
        </nav>

        <div className="profile-sidebar-bottom">
          <div className="profile-sidebar-help">
            <ShieldCheck size={16} />
            <div>
              <strong>You're protected</strong>
              <span>Safety network ready</span>
            </div>
          </div>

          <button
            className="profile-logout-button"
            onClick={handleLogout}
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </aside>

      <main className="profile-main">
        <header className="profile-header">
          <p>YOUR SAFETY DASHBOARD</p>

          <div className="profile-header-user">
            <div className="profile-header-avatar">
              {initial}
            </div>

            <div>
              <strong>{formData.name || "User"}</strong>
              <span>Protected</span>
            </div>
          </div>
        </header>

        <div className="profile-content">
          <a href="/dashboard" className="profile-back-link">
            <ArrowLeft size={14} />
            Back to dashboard
          </a>

          <div className="profile-title">
            <p className="profile-kicker">ACCOUNT</p>
            <h1>Your profile</h1>
            <p>
              Manage the personal information connected to your Silent SOS account.
            </p>
          </div>

          <section className="profile-card">
            <div className="profile-card-heading">
              <div className="profile-large-avatar">
                {initial}
              </div>

              <div>
                <h2>{formData.name || "Your name"}</h2>
                <span>Your Silent SOS profile</span>
              </div>

              <div className="profile-verified">
                <Check size={13} />
                Protected
              </div>
            </div>

            <form onSubmit={handleSave}>
              <div className="profile-form-grid">
                <label className="profile-field">
                  <span>Full name</span>
                  <div className="profile-input-wrap">
                    <UserRound size={16} />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      required
                    />
                  </div>
                </label>

                <label className="profile-field">
                  <span>Email address</span>
                  <div className="profile-input-wrap">
                    <Mail size={16} />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                    />
                  </div>
                </label>

                <label className="profile-field">
                  <span>Phone number</span>
                  <div className="profile-input-wrap">
                    <Phone size={16} />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter your phone number"
                    />
                  </div>
                </label>
              </div>

              <div className="profile-form-footer">
                <span>
                  Your profile information is stored locally in this frontend prototype.
                </span>

                <button
                  type="submit"
                  className="profile-save-button"
                >
                  {saved ? <Check size={15} /> : <Save size={15} />}
                  {saved ? "Saved" : "Save changes"}
                </button>
              </div>
            </form>
          </section>

          <section className="profile-security-card">
            <div className="profile-security-icon">
              <ShieldCheck size={19} />
            </div>

            <div>
              <strong>Safety profile</strong>
              <span>
                Your profile works with your emergency contacts and SOS activity.
              </span>
            </div>
          </section>

          <div className="profile-note">
            <Edit3 size={14} />
            <span>
              Keep your contact information up to date so your safety network has the right details.
            </span>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ProfilePage;

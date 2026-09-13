import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Bell,
  ChevronDown,
  Clock3,
  History,
  LayoutDashboard,
  LogOut,
  MapPin,
  Menu,
  Settings,
  ShieldCheck,
  Users,
  UserRound,
} from "lucide-react";


function DashboardPage() {

  const navigate = useNavigate();

  /* =====================================================
     USER
  ===================================================== */

  const user = JSON.parse(
    localStorage.getItem("silentSOSUser")
  );

  const userName = user?.name || "User";


  /* =====================================================
     SOS STATE
  ===================================================== */

  const [isHolding, setIsHolding] = useState(false);

  const [holdProgress, setHoldProgress] = useState(0);

  const [alertActive, setAlertActive] = useState(false);

  const [alertTime, setAlertTime] = useState("");

  const [locationStatus, setLocationStatus] = useState("Ready");

  const [locationData, setLocationData] = useState(null);

  const holdTimer = useRef(null);

  const progressTimer = useRef(null);

  const holdDuration = 2000;


  /* =====================================================
     START HOLD
  ===================================================== */

  const startHold = () => {

  if (alertActive) {
    return;
  }

  setIsHolding(true);
  setHoldProgress(0);

  let progress = 0;

  progressTimer.current = setInterval(() => {

    progress += 1;

    setHoldProgress(progress);

    if (progress >= 100) {
      clearInterval(progressTimer.current);
    }

  }, 20);


  holdTimer.current = setTimeout(() => {

    activateSOS();

  }, holdDuration);
};



  /* =====================================================
     CANCEL HOLD
  ===================================================== */

  const cancelHold = () => {

    if (alertActive) {
      return;
    }

    clearTimeout(holdTimer.current);

    clearInterval(progressTimer.current);

    setIsHolding(false);

    setHoldProgress(0);
  };


  /* =====================================================
     ACTIVATE SOS
  ===================================================== */

  const activateSOS = () => {

    clearTimeout(holdTimer.current);

    clearInterval(progressTimer.current);

    const now = new Date();

    const formattedTime = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });


    setAlertActive(true);

    setAlertTime(formattedTime);

    setIsHolding(false);

    setHoldProgress(100);

    setLocationStatus("Getting location...");

    setLocationData(null);


    const saveAlert = (location) => {

      const newAlert = {
        id: `${new Date().getTime()}`,

        time: now.toISOString(),

        status: "Active",

        location,
      };

      localStorage.setItem(
        "silentSOSActiveAlert",
        JSON.stringify(newAlert)
      );
    };


    let locationSharingEnabled = true;

    try {
      const savedSettings = JSON.parse(
        localStorage.getItem("silentSOSSettings")
      );

      if (savedSettings?.locationSharing === false) {
        locationSharingEnabled = false;
      }
    } catch {
      locationSharingEnabled = true;
    }

    if (!locationSharingEnabled) {
      setLocationStatus("Location sharing off");
      saveAlert(null);
      return;
    }


    if (!navigator.geolocation) {

      setLocationStatus("Location unavailable");

      saveAlert(null);

      return;
    }


    navigator.geolocation.getCurrentPosition(

      (position) => {

        const currentLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
        };

        setLocationData(currentLocation);

        setLocationStatus("Location shared");

        saveAlert(currentLocation);
      },

      (error) => {

        console.log("Location error:", error.message);

        setLocationStatus("Location unavailable");

        saveAlert(null);
      },

      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };


  /* =====================================================
     RESOLVE SOS
  ===================================================== */

  const resolveSOS = () => {

    const savedAlert = localStorage.getItem(
      "silentSOSActiveAlert"
    );


    if (savedAlert) {

      const alert = JSON.parse(savedAlert);

      const resolvedAlert = {
        ...alert,

        status: "Resolved",

        resolvedAt: new Date().toISOString(),
      };


      const existingHistory =
        JSON.parse(
          localStorage.getItem("silentSOSAlertHistory")
        ) || [];


      localStorage.setItem(
        "silentSOSAlertHistory",
        JSON.stringify([
          resolvedAlert,
          ...existingHistory,
        ])
      );
    }


    localStorage.removeItem(
      "silentSOSActiveAlert"
    );


    setAlertActive(false);

    setAlertTime("");

    setHoldProgress(0);
  };


  /* =====================================================
     LOGOUT
  ===================================================== */

  const handleLogout = () => {

    localStorage.removeItem(
      "silentSOSLoggedIn"
    );

    window.location.href = "/login";
  };


  return (
    <div className="dashboard-page">


      {/* =====================================================
          SIDEBAR
      ===================================================== */}

      <aside className="dashboard-sidebar">

        <div className="dashboard-logo">

          <div className="dashboard-logo-icon">
            <ShieldCheck size={20} />
          </div>

          <span>
            Silent SOS
          </span>

        </div>


        <nav className="dashboard-nav">

          <p className="nav-label">
            MENU
          </p>


          <a
            href="/dashboard"
            className="dashboard-nav-item active"
            onClick={(event) => {
              event.preventDefault();
              navigate("/dashboard");
            }}
          >
            <LayoutDashboard size={17} />

            <span>
              Dashboard
            </span>
          </a>


          <a
            href="/contacts"
            className="dashboard-nav-item"
            onClick={(event) => {
              event.preventDefault();
              navigate("/contacts");
            }}
          >
            <Users size={17} />

            <span>
              Emergency Contacts
            </span>
          </a>


          <a
            href="/history"
            className="dashboard-nav-item"
          >
            <History size={17} />

            <span>
              Alert History
            </span>
          </a>


          <p className="nav-label nav-label-space">
            ACCOUNT
          </p>


          <a
            href="/profile"
            className="dashboard-nav-item"
          >
            <UserRound size={17} />

            <span>
              Profile
            </span>
          </a>


          <a
            href="/settings"
            className="dashboard-nav-item"
          >
            <Settings size={17} />

            <span>
              Settings
            </span>
          </a>

        </nav>


        <div className="dashboard-sidebar-bottom">

          <div className="sidebar-help">

            <ShieldCheck size={16} />

            <div>

              <strong>
                You're protected
              </strong>

              <span>
                Safety network ready
              </span>

            </div>

          </div>


          <button
            className="logout-button"
            onClick={handleLogout}
          >

            <LogOut size={16} />

            Logout

          </button>

        </div>

      </aside>


      {/* =====================================================
          MAIN
      ===================================================== */}

      <main className="dashboard-main">


        {/* HEADER */}

        <header className="dashboard-header">

          <button className="mobile-menu-button">
            <Menu size={20} />
          </button>


          <div className="dashboard-header-left">

            <p className="dashboard-date">
              YOUR SAFETY DASHBOARD
            </p>

          </div>


          <div className="dashboard-header-right">

            <button className="notification-button">

              <Bell size={18} />

              <span></span>

            </button>


            <div className="dashboard-user">

              <div className="user-avatar">
                {userName.charAt(0).toUpperCase()}
              </div>


              <div className="user-details">

                <strong>
                  {userName}
                </strong>

                <span>
                  {alertActive
                    ? "Emergency active"
                    : "Protected"}
                </span>

              </div>


              <ChevronDown size={15} />

            </div>

          </div>

        </header>


        {/* =====================================================
            CONTENT
        ===================================================== */}

        <div className="dashboard-content">


          {/* WELCOME */}

          <div className="dashboard-welcome">

            <div>

              <h1>
                Good morning, {userName}.
              </h1>

              <p>
                Your safety network is ready when you need it.
              </p>

            </div>


            <div
              className={
                alertActive
                  ? "protection-status alert-status"
                  : "protection-status"
              }
            >

              <span></span>

              {alertActive
                ? "Emergency active"
                : "Protected"}

            </div>

          </div>


          {/* =====================================================
              SOS CARD
          ===================================================== */}

          <section
            className={
              alertActive
                ? "sos-dashboard-card sos-active-card"
                : "sos-dashboard-card"
            }
          >


            <div className="sos-card-heading">

              <div>

                <p className="section-kicker">
                  {alertActive
                    ? "EMERGENCY ACTIVE"
                    : "EMERGENCY ACTION"}
                </p>


                <h2>
                  {alertActive
                    ? "SOS alert is active"
                    : "Need help?"}
                </h2>


                <p>
                  {alertActive
                    ? `Alert activated at ${alertTime}.`
                    : "Hold the button to silently send an SOS alert."}
                </p>

              </div>


              <div className="sos-card-status">

                <span></span>

                {alertActive
                  ? "Alert active"
                  : "System ready"}

              </div>

            </div>


            {/* =================================================
                SOS ACTION
            ================================================= */}

            <div className="sos-action-area">


              {!alertActive ? (

                <>

                  <button
                    className={
                      isHolding
                        ? "dashboard-sos-button sos-button-holding"
                        : "dashboard-sos-button"
                    }

                    onPointerDown={startHold}

                    onPointerUp={cancelHold}

                    onPointerLeave={cancelHold}

                    onPointerCancel={cancelHold}

                    onContextMenu={(event) =>
                      event.preventDefault()
                    }

                    aria-label="Hold to activate emergency SOS"
                  >


                    <div
                      className="sos-button-progress"
                      style={{
                        background: `conic-gradient(
                          #ffffff ${holdProgress}%,
                          transparent ${holdProgress}%
                        )`,
                      }}
                    ></div>


                    <div className="sos-button-inner">

                      <ShieldCheck size={30} />


                      <strong>
                        SOS
                      </strong>


                      <span>
                        {isHolding
                          ? "KEEP HOLDING"
                          : "HOLD TO ALERT"}
                      </span>

                    </div>

                  </button>


                  <p className="sos-instruction">

                    {isHolding
                      ? "Keep holding to activate the emergency alert."
                      : "Press and hold for 2 seconds to silently alert your contacts."}

                  </p>

                </>

              ) : (

                <>


                  <div className="sos-active-indicator">

                    <div className="active-icon">

                      <ShieldCheck size={30} />

                    </div>


                    <strong>
                      SOS SENT
                    </strong>


                    <span>
                      Your emergency alert is active.
                    </span>

                  </div>


                  <button
                    className="resolve-alert-button"
                    onClick={resolveSOS}
                  >
                    Resolve alert
                  </button>


                  <p className="sos-instruction">

                    Your trusted contacts have been notified.

                  </p>


                  {locationData && (

                    <div className="sos-location-details">

                      <MapPin size={14} />

                      <span>
                        Location shared
                      </span>

                      <small>
                        {locationData.latitude.toFixed(6)},
                        {" "}
                        {locationData.longitude.toFixed(6)}
                      </small>

                    </div>

                  )}

                </>

              )}

            </div>

          </section>


          {/* =====================================================
              STATUS CARDS
          ===================================================== */}

          <section className="dashboard-status-grid">


            <div className="dashboard-info-card">

              <div className="info-card-icon location-icon">

                <MapPin size={19} />

              </div>


              <div className="info-card-content">

                <span>
                  Location sharing
                </span>

                <strong>
                  {locationStatus}
                </strong>

                <small>
                  {locationData
                    ? `Accuracy ±${Math.round(locationData.accuracy)}m`
                    : alertActive
                      ? "Getting your current location"
                      : "Location available for emergencies"}
                </small>

              </div>


              <div className="status-check">
                ✓
              </div>

            </div>


            <div className="dashboard-info-card">

              <div className="info-card-icon contacts-icon">

                <Users size={19} />

              </div>


              <div className="info-card-content">

                <span>
                  Trusted contacts
                </span>

                <strong>
                  3 contacts ready
                </strong>

                <small>
                  Your safety network is active
                </small>

              </div>


              <div className="status-check">
                ✓
              </div>

            </div>


            <div className="dashboard-info-card">

              <div className="info-card-icon history-icon">

                <Clock3 size={19} />

              </div>


              <div className="info-card-content">

                <span>
                  Alert status
                </span>

                <strong>
                  {alertActive
                    ? "Emergency active"
                    : "No active alerts"}
                </strong>

                <small>
                  {alertActive
                    ? "Response network notified"
                    : "Everything is currently clear"}
                </small>

              </div>


              <div className="status-check">
                ✓
              </div>

            </div>


          </section>


          {/* =====================================================
              ACTIVITY
          ===================================================== */}

          <section className="activity-section">


            <div className="activity-heading">

              <div>

                <p className="section-kicker">
                  ACTIVITY
                </p>

                <h2>
                  Recent alerts
                </h2>

              </div>


              <a href="/history">
                View history
              </a>

            </div>


            <div className="empty-alert-card">


              <div className="empty-alert-icon">

                <ShieldCheck size={20} />

              </div>


              <div>

                <strong>
                  {alertActive
                    ? "Emergency alert is active"
                    : "No recent emergency alerts"}
                </strong>


                <span>

                  {alertActive
                    ? `Alert started at ${alertTime}.`
                    : "Your alert activity will appear here."}

                </span>

              </div>


              <div className="empty-status">

                {alertActive
                  ? "Active"
                  : "All clear"}

              </div>


            </div>


          </section>


        </div>

      </main>

    </div>
  );
}


export default DashboardPage;
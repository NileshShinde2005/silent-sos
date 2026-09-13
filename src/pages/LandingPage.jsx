import {
  ArrowRight,
  Check,
  MapPin,
  ShieldCheck,
  Users,
} from "lucide-react";

import Navbar from "../components/Navbar";

function LandingPage() {
  return (
    <div className="landing-page">

      <Navbar />

      <main>

        {/* ================= HERO ================= */}

        <section className="hero-section">

          {/* Decorative background elements */}

          <div className="decorative-circle decorative-circle-left"></div>
          <div className="decorative-circle decorative-circle-right"></div>

          <div className="hero-route hero-route-left"></div>
          <div className="hero-route hero-route-right"></div>

          <div className="hero-content">

            <div className="hero-badge">
              <ShieldCheck size={15} />
              <span>Personal safety, simplified</span>
            </div>

            <h1>
              Safety when
              <br />
              <span>you need it most.</span>
            </h1>

            <p className="hero-description">
              Send a silent emergency alert and share your
              location with people you trust.
            </p>

            <div className="hero-actions">

              <a href="#get-started" className="primary-button">
                Get started
                <ArrowRight size={17} />
              </a>

              <a href="#how-it-works" className="secondary-button">
                How it works
              </a>

            </div>

            <div className="trust-line">
              <ShieldCheck size={16} />
              <span>
                Designed for moments when speaking isn't possible
              </span>
            </div>

          </div>


          {/* ================= SOS CARD ================= */}

          <div className="hero-visual">

            <div className="visual-card">

              <div className="visual-top">

                <div>
                  <span className="visual-label">
                    SAFETY STATUS
                  </span>

                  <h3>
                    You're protected
                  </h3>
                </div>

                <div className="status-indicator">
                  <span></span>
                </div>

              </div>


              <div className="sos-wrapper">

                <div className="sos-ring"></div>

                <div className="sos-circle">

                  <div className="sos-content">

                    <ShieldCheck
                      size={32}
                      strokeWidth={1.8}
                    />

                    <strong>SOS</strong>

                    <span>
                      HOLD TO ALERT
                    </span>

                  </div>

                </div>

              </div>


              <div className="location-box">

                <div className="location-icon">
                  <MapPin size={18} />
                </div>

                <div className="location-info">

                  <span>
                    Location sharing
                  </span>

                  <strong>
                    Ready
                  </strong>

                </div>

                <div className="location-check">
                  <Check size={14} />
                </div>

              </div>

            </div>


            {/* Small floating decorative pin */}

            <div className="floating-pin">
              <MapPin size={19} />
            </div>

          </div>

        </section>


        {/* ================= HOW IT WORKS ================= */}

        <section
          className="how-section"
          id="how-it-works"
        >

          <div className="section-heading">

            <span>HOW IT WORKS</span>

            <h2>
              One simple action.
            </h2>

          </div>


          <div className="steps">

            <div className="step-card">

              <div className="step-number">
                01
              </div>

              <h3>
                Trigger SOS
              </h3>

              <p>
                Hold the SOS button to silently activate an alert.
              </p>

            </div>


            <div className="step-card">

              <div className="step-number">
                02
              </div>

              <h3>
                Share location
              </h3>

              <p>
                Your current location is shared with your trusted contacts.
              </p>

            </div>


            <div className="step-card">

              <div className="step-number">
                03
              </div>

              <h3>
                Get help
              </h3>

              <p>
                Your safety network receives the alert and can respond.
              </p>

            </div>

          </div>

        </section>


        {/* ================= FEATURES ================= */}

        <section
          className="features-section"
          id="features"
        >

          <div className="feature-card">

            <div className="feature-icon">
              <ShieldCheck size={22} />
            </div>

            <div>
              <h3>
                Silent alerts
              </h3>

              <p>
                No call or conversation required.
              </p>
            </div>

          </div>


          <div className="feature-card">

            <div className="feature-icon">
              <MapPin size={22} />
            </div>

            <div>
              <h3>
                Live location
              </h3>

              <p>
                Keep your location available during an alert.
              </p>
            </div>

          </div>


          <div className="feature-card">

            <div className="feature-icon">
              <Users size={22} />
            </div>

            <div>
              <h3>
                Trusted contacts
              </h3>

              <p>
                Keep your emergency network ready.
              </p>
            </div>

          </div>

        </section>


        {/* ================= GET STARTED ANCHOR ================= */}

        <div id="get-started" className="page-anchor"></div>

        <div id="login" className="page-anchor"></div>

      </main>

    </div>
  );
}

export default LandingPage;
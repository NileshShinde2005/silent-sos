import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  LockKeyhole,
  Mail,
  ShieldCheck,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const successMessage = location.state?.message || "";

  const handleSubmit = (event) => {
    event.preventDefault();

    setError("");

    const savedUser = localStorage.getItem("silentSOSUser");

    if (!savedUser) {
      setError("No account found. Please create an account first.");
      return;
    }

    const user = JSON.parse(savedUser);

    const enteredEmail = email.trim().toLowerCase();

    if (!enteredEmail || !password) {
      setError("Please enter your email and password.");
      return;
    }

    if (enteredEmail !== user.email) {
      setError("Email or password is incorrect.");
      return;
    }

    if (password !== user.password) {
      setError("Email or password is incorrect.");
      return;
    }

    // Save login state
    localStorage.setItem(
      "silentSOSLoggedIn",
      "true"
    );

    // Open dashboard
    navigate("/dashboard");
  };

  return (
    <div className="auth-page">

      {/* Left side */}

      <section className="auth-visual">

        <a href="/" className="auth-brand">
          <span className="auth-brand-icon">
            <ShieldCheck size={20} />
          </span>

          <span>Silent SOS</span>
        </a>

        <div className="auth-message">

          <div className="auth-small-label">
            <ShieldCheck size={14} />
            YOUR SAFETY NETWORK
          </div>

          <h1>
            Be ready
            <br />
            <span>when it matters.</span>
          </h1>

          <p>
            Access your safety dashboard and keep
            your trusted contacts ready.
          </p>

        </div>

        <div className="auth-visual-footer">
          <ShieldCheck size={15} />
          <span>Your safety comes first.</span>
        </div>

      </section>


      {/* Right side */}

      <section className="auth-form-section">

        <div className="auth-form-container">

          <a href="/" className="back-link">
            <ArrowLeft size={15} />
            Back to home
          </a>


          <div className="form-heading">

            <h2>
              Welcome back
            </h2>

            <p>
              Sign in to access your safety dashboard.
            </p>

          </div>


          <form
            className="auth-form"
            onSubmit={handleSubmit}
          >

            {/* Success message */}

            {successMessage && (
              <div className="form-success">
                {successMessage}
              </div>
            )}


            {/* Email */}

            <div className="form-group">

              <label htmlFor="email">
                Email address
              </label>

              <div className="input-wrapper">

                <Mail size={17} />

                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    setError("");
                  }}
                />

              </div>

            </div>


            {/* Password */}

            <div className="form-group">

              <div className="password-label">

                <label htmlFor="password">
                  Password
                </label>

                <a href="#forgot">
                  Forgot password?
                </a>

              </div>

              <div className="input-wrapper">

                <LockKeyhole size={17} />

                <input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                    setError("");
                  }}
                />

              </div>

            </div>


            {/* Error */}

            {error && (
              <div className="form-error">
                {error}
              </div>
            )}


            {/* Submit */}

            <button
              type="submit"
              className="auth-submit"
            >
              Sign in
              <ArrowRight size={17} />
            </button>

          </form>


          <div className="auth-divider">
            <span>or</span>
          </div>


          <p className="auth-switch">
            Don't have an account?

            <a href="/register">
              Create account
            </a>
          </p>


          <div className="auth-security">

            <ShieldCheck size={15} />

            <span>
              Your information is kept private and secure.
            </span>

          </div>

        </div>

      </section>

    </div>
  );
}

export default LoginPage;
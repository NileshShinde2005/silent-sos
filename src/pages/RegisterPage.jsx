import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  LockKeyhole,
  Mail,
  ShieldCheck,
  User,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });

  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));

    setError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const name = formData.name.trim();
    const email = formData.email.trim().toLowerCase();

    if (!name) {
      setError("Please enter your full name.");
      return;
    }

    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    if (!email.includes("@") || !email.includes(".")) {
      setError("Please enter a valid email address.");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!formData.terms) {
      setError("Please accept the terms and privacy policy.");
      return;
    }

    const existingUser = localStorage.getItem("silentSOSUser");

    if (existingUser) {
      const savedUser = JSON.parse(existingUser);

      if (savedUser.email === email) {
        setError("An account with this email already exists.");
        return;
      }
    }

    const user = {
      name,
      email,
      password: formData.password,
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem("silentSOSUser", JSON.stringify(user));

    navigate("/login", {
      state: {
        message: "Account created successfully. Please sign in.",
      },
    });
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
            Stay connected
            <br />
            <span>when it matters.</span>
          </h1>

          <p>
            Create your safety profile and keep
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
              Create your account
            </h2>

            <p>
              Set up your profile to get started.
            </p>

          </div>


          <form
            className="auth-form"
            onSubmit={handleSubmit}
          >

            {/* Full name */}

            <div className="form-group">

              <label htmlFor="name">
                Full name
              </label>

              <div className="input-wrapper">

                <User size={17} />

                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                />

              </div>

            </div>


            {/* Email */}

            <div className="form-group">

              <label htmlFor="register-email">
                Email address
              </label>

              <div className="input-wrapper">

                <Mail size={17} />

                <input
                  id="register-email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                />

              </div>

            </div>


            {/* Password */}

            <div className="form-group">

              <label htmlFor="register-password">
                Password
              </label>

              <div className="input-wrapper">

                <LockKeyhole size={17} />

                <input
                  id="register-password"
                  name="password"
                  type="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                />

              </div>

            </div>


            {/* Confirm password */}

            <div className="form-group">

              <label htmlFor="confirm-password">
                Confirm password
              </label>

              <div className="input-wrapper">

                <LockKeyhole size={17} />

                <input
                  id="confirm-password"
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />

              </div>

            </div>


            {/* Terms */}

            <div className="terms-row">

              <input
                id="terms"
                name="terms"
                type="checkbox"
                checked={formData.terms}
                onChange={handleChange}
              />

              <label htmlFor="terms">
                I agree to the terms and privacy policy.
              </label>

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
              Create account
              <ArrowRight size={17} />
            </button>

          </form>


          <div className="auth-divider">
            <span>or</span>
          </div>


          <p className="auth-switch">
            Already have an account?

            <a href="/login">
              Sign in
            </a>
          </p>


          <div className="auth-security">

            <Check size={15} />

            <span>
              Your information is kept private and secure.
            </span>

          </div>

        </div>

      </section>

    </div>
  );
}

export default RegisterPage;
import { ArrowRight, ShieldCheck } from "lucide-react";

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-inner">

        <a href="/" className="brand">
          <span className="brand-icon">
            <ShieldCheck size={20} strokeWidth={2.2} />
          </span>

          <span className="brand-name">Silent SOS</span>
        </a>

        <nav className="nav-links">
          <a href="how-it-works">How it works</a>
          <a href="features">Features</a>
          <a href="login">Login</a>

          <a href="#get-started" className="nav-cta">
            Get Started
            <ArrowRight size={16} />
          </a>
        </nav>

      </div>
    </header>
  );
}

export default Navbar;
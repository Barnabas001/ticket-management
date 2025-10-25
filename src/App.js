import { useEffect, useState } from "react";

const HERO_WAVE = `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'><path fill='%231440A0' fill-opacity='1' d='M0,64L48,85.3C96,107,192,149,288,176C384,203,480,213,576,224C672,235,768,245,864,218.7C960,192,1056,128,1152,117.3C1248,107,1344,149,1392,170.7L1440,192L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z'></path></svg>`;

const TICKETS_KEY = "tm_tickets";

export default function App() {
  const [view, setView] = useState("landing");
  const [auth, setAuth] = useState(Boolean(localStorage.getItem("tm_token")));
  const [tickets, setTickets] = useState([]);

  useEffect(function () {
    const raw = localStorage.getItem(TICKETS_KEY);
    if (raw) {
      try {
        setTickets(JSON.parse(raw));
      } catch (e) {
        console.error("Failed to parse tickets from localStorage", e);
        setTickets([]);
      }
    }
  }, []);

  useEffect(
    function () {
      localStorage.setItem(TICKETS_KEY, JSON.stringify(tickets));
    },
    [tickets]
  );

  useEffect(
    function () {
      if (auth) setView("dashboard");
    },
    [auth]
  );

  function handleLogOut() {
    localStorage.removeItem("tm_token");
    setAuth(false);
    setView("landing");
  }

  function seedDemoTickets() {
    const demoTicket = [
      {
        id: "t1",
        title: "Cannot login",
        description: "User reports login failure.",
        status: "open",
        createdAt: Date.now(),
      },
      {
        id: "t2",
        title: "UI bug on dashboard",
        description: "Chart not rendering.",
        status: "resolved",
        createdAt: Date.now() - 1000 * 60 * 60,
      },
      {
        id: "t3",
        title: "Feature request: export",
        description: "Add CSV export.",
        status: "open",
        createdAt: Date.now() - 1000 * 60 * 60 * 24,
      },
    ];
    setTickets(demoTicket);
    localStorage.setItem(TICKETS_KEY, JSON.stringify(demoTicket));
  }
  return (
    <div className="main-container">
      <Header onNav={(v) => setView(v)} auth={auth} onLogOut={handleLogOut} />
      <main className="sub-main">
        {view === "landing" && <LandingPage onLogin={() => setView("login")} />}

        {view === "login" && (
          <LoginForm
            onSuccess={() => {
              localStorage.setItem("tm_token", "sample_token");
              setAuth(true);
              setView("dashboard");
            }}
            onBack={() => setView("landing")}
          />
        )}
        {view === "dashboard" && auth && (
          <Dashboard
            tickets={tickets}
            onSeedDemo={seedDemoTickets}
            onOpenTickets={() => setView("tickets")}
          />
        )}

        {view === "dashboard" && !auth && (
          <div role="status">Unauthorized - redirecting to login...</div>
        )}

        {view === "tickets" && auth && (
          <TicketsPage
            tickets={tickets}
            setTickets={setTickets}
            onBack={() => setView("dashboard")}
          />
        )}

        {view === "tickets" && !auth && <div role="status">Unauthorized</div>}
      </main>

      <footer className="footer">
        <small>Barnabas Olayinka Affonshike</small>
      </footer>
    </div>
  );
}

function Header({ onNav, auth, onLogOut }) {
  return (
    <header className="header">
      <div className="logo">TicketDoc</div>
      <nav aria-label="Main Navigation">
        <button className="link" onClick={() => onNav("landing")}>
          Home
        </button>
        <button
          className="link"
          onClick={() => onNav(auth ? "dashboard" : "login")}
        >
          Dashboard
        </button>
        <button className="link" onClick={() => onNav("tickets")}>
          Tickets
        </button>
        {auth ? (
          <button onClick={onLogOut}>Logout</button>
        ) : (
          <button onClick={() => onNav("login")}>Login</button>
        )}
      </nav>
    </header>
  );
}

function LandingPage({ onLogin }) {
  return (
    <section aria-labelledby="hero-title" className="hero-section">
      <img alt="decorative wave" src={HERO_WAVE} className="hero-wave" />
      <div className="hero-content">
        <h1 id="hero-title" className="hero-title">
          My Ticket Management Platform
        </h1>
        <p className="lead">
          Easy to use ticket management starter platform. Supper User friendly.
        </p>
        <div className="hero-actions">
          <button onClick={onLogin}>Get Started</button>
          <a href="#docs">View Docs</a>
        </div>
      </div>
    </section>
  );
}

function LoginForm({ onSuccess, onBack }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(
    function () {
      setError("");
    },
    [username, password]
  );

  function handleSubmit(e) {
    e.preventDefault();
    if (!username.trim() || !password) {
      setError("Please enter both username and password.");
      return;
    }
    setLoading(true);
    setTimeout(function () {
      setLoading(false);
      if (username === "admin" && password === "1234") {
        onSuccess();
      } else {
        setError("Invalid credentials. Try username: admin and password: 1234");
      }
    }, 600);
  }

  return (
    <section aria-labelledby="login-heading" className="form-wrap">
      <h2 id="login-heading">Login</h2>
      <form
        onSubmit={handleSubmit}
        aria-describedby="login-help"
        className="form"
      >
        <label className="label">
          Username
          <input
            aria-label="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input"
            autoComplete="username"
          />
        </label>

        <label className="label">
          Password
          <input
            type="password"
            aria-label="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
            autoComplete="current-password"
          />
        </label>

        <div className="error-sub-sec" aria-live="polite">
          {error && <div className="error-sec">{error}</div>}
        </div>

        <div className="form-action">
          <button type="button" onClick={onBack} className="button">
            Back
          </button>
          <button type="submit" disabled={loading}>
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </div>

        <p id="login-help" className="help-text">
          Demo creds: <strong>admin</strong> / <strong>1234</strong>
        </p>
      </form>
    </section>
  );
}

function Dashboard({ tickets = [], onSeedDemo, onOpenTickets }) {
  const total = tickets.length;
  const open = tickets.filter((t) => t.status === "open").length;
  const resolved = tickets.filter(
    (t) => t.status === "resolved" || t.status === "closed"
  ).length;

  return (
    <section aria-labelledby="dashboard-heading" className="dashboard">
      <h2 id="dashboard-heading">Dashboard</h2>
      <p>Summary of tickets and quick actions</p>

      <div className="stats-row">
        <div className="stat-card">
          <h3>{total}</h3>
          <p>Total Tickets</p>
        </div>
        <div className="stat-card">
          <h3>{open}</h3>
          <p>Open</p>
        </div>
        <div className="stat-card">
          <h3>{resolved}</h3>
          <p>Resolved</p>
        </div>
      </div>

      <div>
        <button onClick={onOpenTickets}>Manage Tickets</button>
        <button onClick={onSeedDemo}>Seed Demo Tickets</button>
      </div>
    </section>
  );
}

function TicketsPage({ tickets, setTickets, onBack }) {
  return (
    <section className="ticket-page-section">
      <h2>Tickets</h2>
      <p>This page will contain the full Ticket Management</p>
      <div className="back-btn">
        <button className="button" onClick={onBack}>
          Back to Dashboard
        </button>

        <div className="ticket-page-table-container">
          <table className="ticket-page-table">
            <thead>
              <tr>
                <th className="ticket-page-th">ID</th>
                <th className="ticket-page-th">Title</th>
                <th className="ticket-page-th">Status</th>
              </tr>
            </thead>
            <tbody>
              {tickets.length === 0 ? (
                <tr>
                  <td colSpan={3} style={{ padding: 12 }}>
                    No tickets. Click "Seed Demo Tickets" on the dashboard to
                    add sample data.
                  </td>
                </tr>
              ) : (
                tickets.map((t) => (
                  <tr key={t.id}>
                    <td className="ticket-page-td">{t.id}</td>
                    <td className="ticket-page-td">{t.title}</td>
                    <td className="ticket-page-td">{t.status}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

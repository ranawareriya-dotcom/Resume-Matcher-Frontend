import { useState } from "react";
import "./App.css";
import { analyseResume } from "./api";
import UploadZone from "./components/UploadZone";
import SkillsPanel from "./components/SkillsPanel";
import JobMatches from "./components/JobMatches";
import GapAnalysis from "./components/GapAnalysis";
import ScoreChart from "./components/ScoreChart";

// ─────────────────────────────────────
// Tabs configuration
// ─────────────────────────────────────
const TABS = [
  { id: "overview", label: "📊 Overview" },
  { id: "jobs",     label: "💼 Job matches" },
  { id: "skills",   label: "🔧 My skills" },
  { id: "gaps",     label: "⚠️ Skill gaps" },
];

export default function App() {
  const [file, setFile]       = useState(null);
  const [result, setResult]   = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(null);
  const [activeTab, setActiveTab] = useState("overview");

  // ── Handle file selection ──
  function handleFileSelected(selectedFile) {
    setFile(selectedFile);
    setResult(null);
    setError(null);
  }

  // ── Submit to backend ──
  async function handleAnalyse() {
    if (!file) return;
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await analyseResume(file);
      setResult(data);
      setActiveTab("overview");
    } catch (err) {
      const msg =
        err?.response?.data?.detail ||
        "Something went wrong. Make sure the backend is running on port 8000.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  // ── Reset everything ──
  function handleReset() {
    setFile(null);
    setResult(null);
    setError(null);
  }

  // ── Compute summary metrics ──
  const topScore    = result ? result.matches[0]?.score ?? 0 : 0;
  const matchedJobs = result ? result.matches.filter((j) => j.score >= 50).length : 0;
  const gapsCount   = result ? result.priority_gaps.length : 0;
  const skillCount  = result ? result.resume_skills.length : 0;

  return (
    <div className="app">
      {/* ── Top bar ── */}
      <div className="topbar">
        <div className="topbar-brand">
          <span>◈</span> Resume<span>Match</span>
        </div>
        <div className="topbar-sub">AI-powered resume analyser</div>
      </div>

      <div className="page">

        {/* ══════════════════════════════════════
            STATE 1: Upload screen (no result yet)
        ══════════════════════════════════════ */}
        {!result && !loading && (
          <div className="upload-section">
            <h1 className="upload-headline">Find your best-fit jobs</h1>
            <p className="upload-sub">
              Upload your resume and instantly see how well you match open roles,
              which skills you have, and what to learn next.
            </p>

            <UploadZone
              onFileSelected={handleFileSelected}
              selectedFile={file}
            />

            {error && <div className="error-box">❌ {error}</div>}

            {file && (
              <button
                className="btn-analyse"
                onClick={handleAnalyse}
                disabled={loading}
              >
                Analyse my resume →
              </button>
            )}
          </div>
        )}

        {/* ══════════════════════════════════════
            STATE 2: Loading
        ══════════════════════════════════════ */}
        {loading && (
          <div className="loading">
            <div className="spinner" />
            <p>Analysing your resume with spaCy NLP…</p>
            <p style={{ fontSize: 13, marginTop: 8, color: "#aeaeb2" }}>
              Extracting skills · Computing match scores · Identifying gaps
            </p>
          </div>
        )}

        {/* ══════════════════════════════════════
            STATE 3: Results dashboard
        ══════════════════════════════════════ */}
        {result && !loading && (
          <>
            {/* Reset button */}
            <button className="btn-reset" onClick={handleReset}>
              ← Analyse another resume
            </button>

            {/* Metrics row */}
            <div className="metrics">
              <div className="metric-card">
                <div className="metric-label">Top match</div>
                <div className="metric-value green">{topScore}%</div>
                <div className="metric-sub">{result.matches[0]?.title}</div>
              </div>
              <div className="metric-card">
                <div className="metric-label">Skills found</div>
                <div className="metric-value purple">{skillCount}</div>
                <div className="metric-sub">in your resume</div>
              </div>
              <div className="metric-card">
                <div className="metric-label">Jobs matched</div>
                <div className="metric-value">{matchedJobs}</div>
                <div className="metric-sub">above 50% score</div>
              </div>
              <div className="metric-card">
                <div className="metric-label">Skill gaps</div>
                <div className="metric-value red">{gapsCount}</div>
                <div className="metric-sub">to address</div>
              </div>
            </div>

            {/* Tabs */}
            <div className="tabs">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  className={`tab-btn ${activeTab === tab.id ? "active" : ""}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* ── Tab: Overview ── */}
            {activeTab === "overview" && (
              <div className="two-col">
                <div className="card">
                  <div className="card-title">📈 Match scores by role</div>
                  <ScoreChart matches={result.matches} />
                </div>
                <div className="card">
                  <div className="card-title">💼 Top 4 matches</div>
                  <JobMatches matches={result.matches.slice(0, 4)} />
                </div>
              </div>
            )}

            {/* ── Tab: All Job Matches ── */}
            {activeTab === "jobs" && (
              <div className="card">
                <div className="card-title">💼 All matched roles</div>
                <JobMatches matches={result.matches} />
              </div>
            )}

            {/* ── Tab: My Skills ── */}
            {activeTab === "skills" && (
              <div className="card">
                <div className="card-title">🔧 Skills detected in your resume</div>
                <SkillsPanel skills={result.resume_skills} />
              </div>
            )}

            {/* ── Tab: Skill Gaps ── */}
            {activeTab === "gaps" && (
              <div className="card">
                <div className="card-title">⚠️ Skills to add to your profile</div>
                <GapAnalysis gaps={result.priority_gaps} />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

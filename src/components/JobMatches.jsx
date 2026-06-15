function getScoreClass(score) {
  if (score >= 70) return "score-high";
  if (score >= 50) return "score-mid";
  return "score-low";
}

export default function JobMatches({ matches }) {
  if (!matches || matches.length === 0) {
    return <p style={{ color: "#6e6e73", fontSize: 14 }}>No matches found.</p>;
  }

  return (
    <div>
      {matches.map((job) => (
        <div key={job.job_id} className="job-item">
          {/* Score badge */}
          <div className={`job-score-badge ${getScoreClass(job.score)}`}>
            {job.score}%
          </div>

          {/* Job info */}
          <div className="job-info">
            <div className="job-title-text">{job.title}</div>
            <div className="job-meta">
              {job.company} · {job.location} ·{" "}
              <span className="job-salary">{job.salary}</span>
            </div>

            <div className="job-pills">
              {/* Matched skills — green */}
              {job.matched.map((s) => (
                <span key={s} className="pill match">
                  ✓ {s}
                </span>
              ))}
              {/* Missing skills — red */}
              {job.missing.map((s) => (
                <span key={s} className="pill gap">
                  ✗ {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

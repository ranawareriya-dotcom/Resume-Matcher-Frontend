function getImportance(frequency) {
  if (frequency >= 3) return { label: "High", cls: "imp-high" };
  if (frequency === 2) return { label: "Medium", cls: "imp-medium" };
  return { label: "Low", cls: "imp-low" };
}

export default function GapAnalysis({ gaps }) {
  if (!gaps || gaps.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "32px 0" }}>
        <p style={{ fontSize: 32, marginBottom: 8 }}>🎉</p>
        <p style={{ fontWeight: 600, color: "#1a7f3e" }}>No skill gaps found!</p>
        <p style={{ color: "#6e6e73", fontSize: 13, marginTop: 4 }}>
          Your resume matches all required skills in the top job listings.
        </p>
      </div>
    );
  }

  return (
    <div>
      <p style={{ fontSize: 13, color: "#6e6e73", marginBottom: 16 }}>
        Skills missing from your resume that appear most frequently in top-matching jobs.
      </p>

      {gaps.map((gap) => {
        const imp = getImportance(gap.frequency);
        return (
          <div key={gap.skill} className="gap-row">
            <div>
              <div className="gap-name">{gap.skill}</div>
              <div className="gap-freq">
                Missing in {gap.frequency} top job{gap.frequency > 1 ? "s" : ""}
              </div>
            </div>
            <span className={`importance-badge ${imp.cls}`}>{imp.label}</span>
          </div>
        );
      })}

      {/* Learning resources hint */}
      <div
        style={{
          marginTop: 20,
          padding: "14px 16px",
          background: "#f5f3ff",
          borderRadius: 12,
          fontSize: 13,
          color: "#534AB7",
          border: "1px solid #c7bff8",
        }}
      >
        💡 Focus on <strong>High</strong> importance gaps first — they appear in multiple job postings
        and will give you the best return on learning time.
      </div>
    </div>
  );
}

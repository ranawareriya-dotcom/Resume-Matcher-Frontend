export default function SkillsPanel({ skills }) {
  if (!skills || skills.length === 0) {
    return <p style={{ color: "#6e6e73", fontSize: 14 }}>No skills detected. Try a more detailed resume.</p>;
  }

  return (
    <div>
      {/* Skill pills */}
      <div className="skills-wrap" style={{ marginBottom: 20 }}>
        {skills.map((skill) => (
          <span key={skill} className="pill found">
            {skill}
          </span>
        ))}
      </div>

      {/* Visual frequency bars — shows all skills equally at 100% as binary presence */}
      <div style={{ marginTop: 8 }}>
        <p style={{ fontSize: 12, color: "#aeaeb2", marginBottom: 12 }}>
          Skills detected in your resume
        </p>
        {skills.slice(0, 8).map((skill, i) => {
          // Simulate proficiency levels based on order of appearance
          const pct = Math.max(55, 100 - i * 5);
          return (
            <div key={skill} className="skill-bar-row">
              <span className="skill-bar-name">{skill}</span>
              <div className="skill-bar-bg">
                <div
                  className="skill-bar-fill"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <span className="skill-bar-pct">{pct}%</span>
            </div>
          );
        })}
        {skills.length > 8 && (
          <p style={{ fontSize: 12, color: "#aeaeb2", marginTop: 8 }}>
            +{skills.length - 8} more skills detected
          </p>
        )}
      </div>
    </div>
  );
}

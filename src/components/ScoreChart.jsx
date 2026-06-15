import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

function getBarColor(score) {
  if (score >= 70) return "#34c759";
  if (score >= 50) return "#534AB7";
  return "#ff9500";
}

export default function ScoreChart({ matches }) {
  if (!matches || matches.length === 0) return null;

  // Show top 6 only to keep chart clean
  const data = matches.slice(0, 6).map((job) => ({
    name: job.title.replace(" Engineer", " Eng."),
    score: job.score,
  }));

  return (
    <div style={{ width: "100%", height: 220 }}>
      <ResponsiveContainer>
        <BarChart data={data} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
          <XAxis
            dataKey="name"
            tick={{ fontSize: 11, fill: "#6e6e73" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            domain={[0, 100]}
            tick={{ fontSize: 11, fill: "#aeaeb2" }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            formatter={(val) => [`${val}%`, "Match score"]}
            contentStyle={{
              fontSize: 13,
              borderRadius: 10,
              border: "1px solid #e5e5ea",
            }}
          />
          <Bar dataKey="score" radius={[6, 6, 0, 0]}>
            {data.map((entry, i) => (
              <Cell key={i} fill={getBarColor(entry.score)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

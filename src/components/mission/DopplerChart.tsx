"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

type Series = { name: string; points: { t: number; hz: number }[] };

export function DopplerChart({ series }: { series: Series[] }) {
  const merged = series[0]?.points.map((p, i) => {
    const row: Record<string, number> = { t: p.t };
    series.forEach((s) => {
      row[s.name] = s.points[i]?.hz ?? 0;
    });
    return row;
  });

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={merged}>
          <CartesianGrid stroke="rgba(148,163,184,0.1)" />
          <XAxis dataKey="t" stroke="#64748b" fontSize={10} />
          <YAxis stroke="#64748b" fontSize={10} />
          <Tooltip
            contentStyle={{
              background: "#0a0e1a",
              border: "1px solid rgba(34,211,238,0.2)",
              fontSize: 12,
            }}
          />
          {series.map((s, i) => (
            <Line
              key={s.name}
              type="monotone"
              dataKey={s.name}
              stroke={i === 0 ? "#22d3ee" : "#8b5cf6"}
              strokeWidth={1.5}
              dot={false}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

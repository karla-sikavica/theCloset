// src/components/ui/WardrobePieCharts.tsx
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface PieChartsProps {
  items: any[];
}

const COLORS = [
  "#FF6384",
  "#36A2EB",
  "#FFCE56",
  "#8AFFC1",
  "#FF8A5C",
  "#B28DFF",
  "#69D2E7",
  "#E1FF00",
  "#FFB2EF",
  "#96FF33",
  "#FFD700",
  "#D17BFF",
];

export const WardrobePieCharts = ({ items }: PieChartsProps) => {
  // ----- BOJE -----
  const colorCount: { [key: string]: number } = {};

  items.forEach((item) => {
    item.colors.forEach((color: any) => {
      const colorName = color.name;
      colorCount[colorName] = (colorCount[colorName] || 0) + 1;
    });
  });

  const colorData = Object.entries(colorCount).map(([name, value]) => ({
    name,
    value,
  }));

  // ----- GIFTOVI -----
  const giftCount = items.filter((item) => item.gift).length;
  const boughtCount = items.length - giftCount;

  const giftData = [
    { name: "Gifted", value: giftCount },
    { name: "Bought", value: boughtCount },
  ];

  return (
    <div
      style={{
        display: "flex",
        gap: "4rem",
        justifyContent: "center",
        flexWrap: "wrap",
      }}
    >
      {/* Pie chart boja */}
      <div style={{ width: "300px", height: "300px" }}>
        <h4 style={{ textAlign: "center" }}>Wardrobe by color</h4>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={colorData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {colorData.map((_, index) => (
                <Cell
                  key={`color-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Pie chart gift/kupovina */}
      <div style={{ width: "300px", height: "300px" }}>
        <h4 style={{ textAlign: "center" }}>Gifted vs Bought</h4>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={giftData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              <Cell fill="#FFA69E" />
              <Cell fill="#87CEEB" />
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

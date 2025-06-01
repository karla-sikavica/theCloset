import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#8dd1e1"];

export const WardrobePieCharts = ({ items }: { items: any[] }) => {
  // Gift data
  const giftCount = items.filter((item) => item.gift === true).length;
  const purchasedCount = items.length - giftCount;
  const giftData = [
    { name: "Gift", value: giftCount },
    { name: "Purchased", value: purchasedCount },
  ];

  // Color data
  const colorMap = new Map<string, number>();
  items.forEach((item) => {
    const color = item.color || "Unknown";
    colorMap.set(color, (colorMap.get(color) || 0) + 1);
  });
  const colorData = Array.from(colorMap.entries()).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <div style={{ display: "flex", gap: "2rem", justifyContent: "center" }}>
      <div>
        <h4>Gift vs Purchased</h4>
        <ResponsiveContainer width={250} height={250}>
          <PieChart>
            <Pie
              data={giftData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
            >
              {giftData.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div>
        <h4>Colors in Wardrobe</h4>
        <ResponsiveContainer width={250} height={250}>
          <PieChart>
            <Pie
              data={colorData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
            >
              {colorData.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

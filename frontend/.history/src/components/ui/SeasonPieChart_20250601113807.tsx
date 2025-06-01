import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useFetchItems } from "../../hooks/useFetchItems";
import { useCurrentUser } from "../../hooks/useCurrentUser";

const seasonColors: { [key: string]: string } = {
  spring: "#a2d5c6",
  summer: "#f9c74f",
  fall: "#f9844a",
  winter: "#90be6d",
  unknown: "#cccccc",
};

const SeasonPieChart = () => {
  const user = useCurrentUser();
  const userId = user?.id;
  const items = useFetchItems(userId);

  if (!userId || !items) return null;
  if (items.length === 0) return <div>No items to show 🌱</div>;

  // 1. Count items per season
  const seasonCountMap: { [season: string]: number } = {};
  items.forEach((item) => {
    const season = item.season?.toLowerCase().trim() || "unknown";
    seasonCountMap[season] = (seasonCountMap[season] || 0) + 1;
  });

  // 2. Convert to data array with percentages
  const total = items.length;
  const data = Object.entries(seasonCountMap).map(([season, count]) => ({
    name: season.charAt(0).toUpperCase() + season.slice(1),
    value: parseFloat(((count / total) * 100).toFixed(1)),
    color: seasonColors[season] || "#888888",
  }));
  console.log("season data:", data);

  return (
    <div style={{ width: "300px", height: "300px" }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label={({ name, value }) => `${name}: ${value}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number, name: string) => [`${value}%`, name]}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SeasonPieChart;

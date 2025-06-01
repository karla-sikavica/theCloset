import { useCurrentUser } from "../../hooks/useCurrentUser";
import { useFetchItems } from "../../hooks/useFetchItems";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const colorReference = [
  { name: "Red", hex: "#E60548" },
  { name: "Blue", hex: "#3498db" },
  { name: "Black", hex: "#110b11" },
  { name: "White", hex: "#ecf0f1" },
  { name: "Green", hex: "#27ae60" },
  { name: "Pink", hex: "#ff69b4" },
  { name: "Purple", hex: "#9b59b6" },
  { name: "Beige", hex: "#d5c5a3" },
  { name: "Cream", hex: "#fffdd0" },
  { name: "Yellow", hex: "#f1c40f" },
  { name: "Teal", hex: "#1abc9c" },
  { name: "Orange", hex: "#e67e22" },
  { name: "Brown", hex: "#8b4513" },
  { name: "Grey", hex: "#95a5a6" },
  { name: "Gold", hex: "#ffd700" },
  { name: "Silver", hex: "#c0c0c0" },
];

const ColorPieChart = () => {
  const user = useCurrentUser();
  const userId = user?.id;
  const items = useFetchItems(userId);

  if (!userId || !items) return null;
  if (items.length === 0) return <div>No items to show 🌱</div>;

  // 1. Flatten all colors from all items into one big array
  const allColors = items.flatMap((item) => item.colors);

  // 2. Count frequency of each color name (case-insensitive just to be safe)
  const colorCountMap: { [colorName: string]: number } = {};
  allColors.forEach((color) => {
    const normalizedColor = color.trim().toLowerCase();
    colorCountMap[normalizedColor] = (colorCountMap[normalizedColor] || 0) + 1;
  });

  // 3. Prepare data array for recharts pie with matching hex colors
  const data = Object.entries(colorCountMap).map(([colorName, count]) => {
    // Try to find hex code for this color (case-insensitive)
    const ref = colorReference.find((c) => c.name.toLowerCase() === colorName);
    return {
      name: colorName.charAt(0).toUpperCase() + colorName.slice(1), // Capitalize first letter
      value: count,
      color: ref ? ref.hex : "#888888", // fallback grey if no match
    };
  });

  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label={(entry) => entry.name}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number, name: string) => [
              `${value} items`,
              name,
            ]}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ColorPieChart;

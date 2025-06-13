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
  console.log("Current user:", user);

  const userId = user?.id;
  console.log("User ID:", userId);

  const items = useFetchItems(userId);
  //console.log("Fetched items:", items);

  if (!userId || !items) {
    console.log("No user ID or items yet, returning null");
    return null;
  }
  if (items.length === 0) {
    console.log("No items found");
    return <div>No items to show 🌱</div>;
  }
  // 1. Flatten all color *names* from all items:
  const allColorNames = items.flatMap((item) =>
    (item.colors ?? [])
      .map((color) => color.trim().toLowerCase())
      .filter(Boolean)
  );

  console.log("All color names:", allColorNames);

  items.forEach((item, i) => {
    item.colors.forEach((color, j) => {
      if (!color || typeof color !== "string") {
        console.warn(`Invalid color at item[${i}].colors[${j}]`, color);
      }
    });
  });

  // 2. Count frequency of each color name (case-insensitive):
  const colorCountMap: { [colorName: string]: number } = {};
  allColorNames.forEach((colorName) => {
    const normalized = colorName.trim().toLowerCase();
    colorCountMap[normalized] = (colorCountMap[normalized] || 0) + 1;
  });
  //console.log("Color frequency map:", colorCountMap);
  const total = Object.values(colorCountMap).reduce(
    (sum, count) => sum + count,
    0
  );

  // 3. Prepare data array for recharts pie with matching hex colors
  const data = Object.entries(colorCountMap).map(([colorName, count]) => {
    // Try to find hex code for this color (case-insensitive)
    const ref = colorReference.find((c) => c.name.toLowerCase() === colorName);
    const entry = {
      name: colorName.charAt(0).toUpperCase() + colorName.slice(1), // Capitalize first letter
      value: count,
      color: ref ? ref.hex : "#888888", // fallback grey if no match
      percentage: ((count / total) * 100).toFixed(1), // zadržavamo 1 decimalu
    };
    //console.log("Pie data entry:", entry);
    return entry;
  });
  //console.log("Pie chart data:", data);
  console.log(
    "All items colors:",
    items.map((item) => item.colors)
  );

  return (
    <div style={{ width: "100%", height: "320px" }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label={(entry) => entry.percentage}
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

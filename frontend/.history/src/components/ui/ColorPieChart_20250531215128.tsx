import { useCurrentUser } from "../../hooks/useCurrentUser";
import { useFetchItems } from "../../hooks/useFetchItems";

const ColorPieChart = () => {
  const user = useCurrentUser();
  const userId = user?.id;
  const items = useFetchItems(userId);

  const data = [
    { name: "Red", value: "#E60548" },
    { name: "Blue", value: "#3498db" },
    { name: "Black", value: "#110b11" },
    { name: "White", value: "#ecf0f1" },
    { name: "Green", value: "#27ae60" },
    { name: "Pink", value: "#ff69b4" },
    { name: "Purple", value: "#9b59b6" },
    { name: "Beige", value: "#d5c5a3" },
    { name: "Cream", value: "#fffdd0" },
    { name: "Yellow", value: "#f1c40f" },
    { name: "Teal", value: "#1abc9c" },
    { name: "Orange", value: "#e67e22" },
    { name: "Brown", value: "#8b4513" },
    { name: "Grey", value: "#95a5a6" },
    { name: "Gold", value: "#ffd700" },
    { name: "Silver", value: "#c0c0c0" },
  ];

  const colorCount: { [key: string]: number } = {};

  items.forEach((item) => {
    item.colors.forEach((color: any) => {
      const colorName = color.name;
      colorCount[colorName] = (colorCount[colorName] || 0) + 1;
    });
  });

  console.log("color count", colorCount);
  return <div>ColorPieChart</div>;
};

export default ColorPieChart;

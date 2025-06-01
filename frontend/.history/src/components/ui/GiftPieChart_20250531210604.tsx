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

const GiftPieChart = () => {
  const user = useCurrentUser();
  const userId = user?.id;
  const items = useFetchItems(userId);
  console.log("gift items", items);

  if (!items || items.length === 0) {
    return <div>No data yet... 🍵</div>;
  }

  const giftCount = items.filter((item) => item.gift).length;
  const purchasedCount = items.length - giftCount;

  const data = [
    { name: "gift", value: giftCount },
    { name: "purchased", value: purchasedCount },
  ];

  const COLORS = ["#ff1493", "#f0ebd8"];

  return (
    <div className="gift-chart-div">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
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

export default GiftPieChart;

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

  const giftCount = items.filter((item) => item.gift).length;
  const purchasedCount = items.length - giftCount;

  console.log("gift count", giftCount);
  console.log("purchased count", purchasedCount);

  const data = [
    { name: "gift", value: giftCount },
    { name: "purchased", value: purchasedCount },
  ];

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
            <Cell fill="#ff1493" />
            <Cell fill="#f0ebd8" />
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GiftPieChart;

import { useCurrentUser } from "../../hooks/useCurrentUser";
import { useFetchItems } from "../../hooks/useFetchItems";

const data = [
  { name: "gift", value: giftCount },
  { name: "purchased", value: purchasedCount },
];

const GiftPieChart = () => {
  const user = useCurrentUser();
  const userId = user?.id;
  const items = useFetchItems(userId);
  return <div>GiftPieChart</div>;
};

export default GiftPieChart;

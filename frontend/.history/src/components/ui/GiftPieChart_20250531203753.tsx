import { useCurrentUser } from "../../hooks/useCurrentUser";
import { useFetchItems } from "../../hooks/useFetchItems";

const GiftPieChart = () => {
  const user = useCurrentUser();
  const userId = user?.id;
  const items = useFetchItems(userId);

  const giftCount = items.filter((item) => item.gift).length;
  const purchasedCount = items.length - giftCount;

  const data = [
    { name: "gift", value: giftCount },
    { name: "purchased", value: purchasedCount },
  ];

  return <div>GiftPieChart</div>;
};

export default GiftPieChart;

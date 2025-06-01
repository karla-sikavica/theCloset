import Decimal from "decimal.js";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { useFetchItems } from "../hooks/useFetchItems";

const Profile = () => {
  const user = useCurrentUser();
  const userId = user?.id;
  const items = useFetchItems(userId);
  console.log(user);
  console.log("items:", items);

  const mostWorn = [...items]
    .sort((a, b) => b.noOfWears - a.noOfWears)
    .slice(0, 5);

  // Top 5 least worn
  const leastWorn = [...items]
    .sort((a, b) => a.noOfWears - b.noOfWears)
    .slice(0, 5);

  // Calculate cost per wear (handle noOfWears === 0 to avoid division by zero)
  const itemsWithCPW = items.map((item) => ({
    ...item,
    costPerWear:
      item.noOfWears > 0
        ? new Decimal(item.price).div(item.noOfWears).toNumber()
        : Infinity,
  }));

  // Best cost per wear
  const bestValue = [...itemsWithCPW]
    .filter((item) => item.costPerWear !== Infinity)
    .sort((a, b) => a.costPerWear - b.costPerWear)
    .slice(0, 5);

  // Worst cost per wear
  const worstValue = [...itemsWithCPW]
    .filter((item) => item.costPerWear !== Infinity)
    .sort((a, b) => b.costPerWear - a.costPerWear)
    .slice(0, 5);
  const renderCards = (
    entries: any[],
    statKey: "noOfWears" | "costPerWear"
  ) => (
    <div className="card-container">
      <div className="card-div">
        {entries.map((entry) => (
          <div key={entry.id} className="card">
            <div className="image-div">
              <img
                className="img"
                src={entry.imageUrl}
                alt={entry.name || "item"}
              />
            </div>
            <div className="card-body">
              <div className="body-div">{entry.brand}</div>
              {statKey === "noOfWears" && (
                <div className="body-div">{entry.noOfWears} wears</div>
              )}
              {statKey === "costPerWear" && (
                <div className="body-div">
                  €{entry.costPerWear.toFixed(2)} per wear
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div>
      <div className="profile-title">{user?.name}'s analytics</div>

      <div className="most-least-div">
        <div className="most-least-title">top 5 most worn pieces</div>
        {renderCards(mostWorn, "noOfWears")}
      </div>

      <div className="most-least-div">
        <div className="most-least-title">top 5 least worn pieces</div>
        {renderCards(leastWorn, "noOfWears")}
      </div>

      <div className="most-least-div">
        <div className="most-least-title">smartest wardrobe investments</div>
        {renderCards(bestValue, "costPerWear")}
      </div>

      <div className="most-least-div">
        <div className="most-least-title">least cost-effective pieces</div>
        {renderCards(worstValue, "costPerWear")}
      </div>
    </div>
  );
};

export default Profile;

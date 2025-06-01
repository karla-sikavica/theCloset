import Decimal from "decimal.js";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { useFetchItems } from "../hooks/useFetchItems";
import "./css/Profile.css";

const allCategories = [
  "Top",
  "Bottom",
  "One piece",
  "Shoes",
  "Accessories",
  "Outerwear",
  "Jewelry",
  "Bag",
  "Swimwear",
];

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
    <div className="card-container-profile">
      <div className="card-div">
        {entries.map((entry) => (
          <div key={entry.id} className="card-profile">
            <div className="image-div-profile">
              <img
                className="img-profile"
                src={entry.imageUrl}
                alt={entry.name || "item"}
              />
            </div>
            <div className="card-body-profile">
              <div className="body-div-profile">{entry.name}</div>
              {statKey === "noOfWears" && (
                <div className="body-div-profile">{entry.noOfWears} wears</div>
              )}
              {statKey === "costPerWear" && (
                <div className="body-div-profile">
                  €{entry.costPerWear.toFixed(2)} per wear
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const categoryCounts: { [key: string]: number } = {};

  // Inicijalno postavi sve na 0
  allCategories.forEach((cat) => {
    categoryCounts[cat] = 0;
  });

  // Broji iteme po kategoriji
  items.forEach((item) => {
    const categoryName = item.category;
    if (categoryName && categoryCounts.hasOwnProperty(categoryName)) {
      categoryCounts[categoryName]++;
    }
  });

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
      {items.length > 0 && (
        <div className="categories-section-profile">
          <div className="categories-title-profile">
            your wardrobe by category
          </div>
          <div className="categories-grid-profile">
            {Object.entries(categoryCounts).map(([category, count]) => {
              const displayCategory =
                category === "One piece" ? "oneepiece" : category.toLowerCase(); // možeš dodati još prilagodbi ovdje

              return (
                <div key={category} className="category-box-profile">
                  <div className="category-name-profile">{displayCategory}</div>
                  <div className="category-count-profile">{count}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;

import Decimal from "decimal.js";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { useFetchItems } from "../hooks/useFetchItems";
import "./css/Profile.css";
import { useFetchOutfits } from "../hooks/useFetchOutfits";

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

  const today = new Date().toISOString().split("T")[0]; // "YYYY-MM-DD"
  const outfits = useFetchOutfits(userId);

  // Pronađi današnji outfit u localStorage (outfiti imaju `item.items`)
  const todaysOutfitId = Object.keys(localStorage).find(
    (key) => key.startsWith("worn-") && localStorage.getItem(key) === today
  );

  // Nađi outfit po ID-u iz items ako postoji
  const todaysOutfit = items.find(
    (item) =>
      item.items &&
      `worn-${item.id}` === todaysOutfitId &&
      Array.isArray(item.items)
  );

  // Zadnjih 10 worn itema (na temelju lokalStorage)
  const lastWornItems = items
    .filter((item) => {
      const wornDate = localStorage.getItem(`worn-${item.id}`);
      return wornDate != null;
    })
    .sort((a, b) => {
      const aDate = localStorage.getItem(`worn-${a.id}`);
      const bDate = localStorage.getItem(`worn-${b.id}`);
      return new Date(bDate!).getTime() - new Date(aDate!).getTime();
    })
    .slice(0, 10);

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

      {/* <div className="outfit-div">
        <div className="outfit-items"></div>
        <div className="outfit-data">
          <div className="outfit-cpw"></div>
          <div className="outfit-price"></div>
        </div>
      </div> */}

      {todaysOutfit && (
        <div className="most-least-div">
          <div className="most-least-title">today's outfit</div>
          <div className="card-container-profile">
            <div className="card-div-profile">
              {todaysOutfit.items.map((item: any) => (
                <div key={item.id} className="card-profile">
                  <div className="image-div-profile">
                    <img
                      className="img-profile"
                      src={item.imageUrl}
                      alt={item.name}
                    />
                  </div>
                  <div className="card-body-profile">
                    <div className="body-div-profile">{item.name}</div>
                    <div className="body-extra-profile">
                      €{item.price} - worn {item.noOfWears}x
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="outfit-data-profile">
            <div>
              total outfit price: €
              {todaysOutfit.items
                .reduce((sum: number, i: any) => sum + parseFloat(i.price), 0)
                .toFixed(2)}
            </div>
            <div>
              average cost per wear: €
              {(() => {
                const totalWears = todaysOutfit.items.reduce(
                  (sum: number, i: any) => sum + i.noOfWears,
                  0
                );
                const totalPrice = todaysOutfit.items.reduce(
                  (sum: number, i: any) => sum + parseFloat(i.price),
                  0
                );
                return totalWears > 0
                  ? (totalPrice / totalWears).toFixed(2)
                  : "∞";
              })()}
            </div>
          </div>
        </div>
      )}

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
      {lastWornItems.length > 0 && (
        <div className="most-least-div">
          <div className="most-least-title">last 10 worn items</div>
          {renderCards(lastWornItems, "noOfWears")}
        </div>
      )}
    </div>
  );
};

export default Profile;

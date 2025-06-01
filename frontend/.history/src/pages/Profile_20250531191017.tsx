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

  const todaysOutfitKey = Object.keys(localStorage).find(
    (key) => key.startsWith("worn-") && localStorage.getItem(key) === today
  );

  const todaysOutfit = outfits.find(
    (outfit) => `worn-${outfit.id}` === todaysOutfitKey
  );

  console.log("Outfits:", outfits);
  console.log("Today's outfit:", todaysOutfit);

  const wornIndividualItems = items.filter((item) => {
    const wornDate = localStorage.getItem(`worn-${item.id}`);
    return wornDate != null;
  });

  const wornOutfitItems: any[] = [];

  outfits.forEach((outfit) => {
    const wornDate = localStorage.getItem(`worn-${outfit.id}`);
    if (wornDate) {
      outfit.items.forEach((item: any) => {
        // Dodaj i datum kao meta info da možemo sortirati
        wornOutfitItems.push({ ...item, wornDate });
      });
    }
  });

  const allWornItemsMap = new Map<number, { item: any; wornDate: string }>();

  // Dodaj pojedinačne
  wornIndividualItems.forEach((item) => {
    const wornDate = localStorage.getItem(`worn-${item.id}`);
    if (wornDate) {
      allWornItemsMap.set(item.id, { item, wornDate });
    }
  });

  wornOutfitItems.forEach((item) => {
    allWornItemsMap.set(item.id, { item, wornDate: item.wornDate });
  });

  const lastWornItems = Array.from(allWornItemsMap.values())
    .sort(
      (a, b) => new Date(b.wornDate).getTime() - new Date(a.wornDate).getTime()
    )
    .map((entry) => entry.item)
    .slice(0, 10);

  // Zadnjih 10 worn itema (na temelju lokalStorage)
  /* const lastWornItems = items
    .filter((item) => {
      const wornDate = localStorage.getItem(`worn-${item.id}`);
      return wornDate != null;
    })
    .sort((a, b) => {
      const aDate = localStorage.getItem(`worn-${a.id}`);
      const bDate = localStorage.getItem(`worn-${b.id}`);
      return new Date(bDate!).getTime() - new Date(aDate!).getTime();
    })
    .slice(0, 10); */

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
                      €{item.price} worn {item.noOfWears}x
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="outfit-data-profile">
            <div>
              <div className="total-price">
                {todaysOutfit.items
                  .reduce(
                    (sum: number, item: any) => sum + parseFloat(item.price),
                    0
                  )
                  .toFixed(2)}
                €
              </div>
              <div className="total-price-title">total outfit price</div>
            </div>
            <div>
              <div className="avg-cpw">
                {(() => {
                  const totalWears = todaysOutfit.items.reduce(
                    (sum: number, item: any) => sum + item.noOfWears,
                    0
                  );
                  const totalPrice = todaysOutfit.items.reduce(
                    (sum: number, item: any) => sum + parseFloat(item.price),
                    0
                  );
                  return totalWears > 0
                    ? (totalPrice / totalWears).toFixed(2)
                    : "∞";
                })()}
                €
              </div>
              <div className="avg-cpw-title">average outfit cost per wear</div>
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
      <div className="pie-charts">
        <div className="gift-pie-chart"></div>
        <div className="colors-pie-chart"></div>
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
